import { LanguageCategory, LanguageKey, TopicMetadata, TopicLevel } from './types';
import { LANGUAGE_CATALOG_BY_KEY, LANGUAGE_ORDER } from './languageCatalog';
import { getCodeExerciseAvailability } from './codeExerciseIndex';

export type IndexedTopicMetadata = TopicMetadata & {
  languageKey: LanguageKey;
  languageName: string;
  category?: LanguageCategory;
  keywords: string[];
  order: number;
  hasCodeExercise: boolean;
  codeExerciseCount: number;
};

export type LearningSearchResult = {
  kind: 'language' | 'topic';
  languageKey: LanguageKey;
  topicId?: string;
  title: string;
  summary?: string;
  level?: TopicLevel;
  duration?: string;
  category?: LanguageCategory;
  score: number;
};

export type PracticeCandidateFilter = 'all' | 'completed' | 'review' | 'bookmarked' | 'in-progress' | 'weak';

const normalize = (value: string) => value.toLowerCase().replace(/[./_-]+/g, ' ').replace(/[^a-z0-9+ #]+/g, ' ').replace(/\s+/g, ' ').trim();
const LANGUAGE_ALIASES: Partial<Record<LanguageKey, string[]>> = {
  javascript: ['js'], typescript: ['ts'], csharp: ['csharp', 'dotnet', '.net'], cpp: ['cpp'],
  nodejs: ['node', 'nodejs'], dartflutter: ['dart', 'flutter'], sql: ['database', 'db'],
};

const keywordTokens = (value: string) => normalize(value).split(' ').filter((token) => token.length > 1);

// This index contains only fields used by list, progress, and future search surfaces.
export const TOPIC_METADATA_INDEX: Record<LanguageKey, Map<string, IndexedTopicMetadata>> =
  LANGUAGE_ORDER.reduce((index, languageKey) => {
    const topics = LANGUAGE_CATALOG_BY_KEY[languageKey]?.topics ?? [];
    const language = LANGUAGE_CATALOG_BY_KEY[languageKey];
    const aliases = LANGUAGE_ALIASES[languageKey] ?? [];
    index[languageKey] = new Map(
      topics.map((topic, order) => [topic.id, {
        ...topic, languageKey, languageName: language?.shortTitle ?? languageKey,
        category: language?.category, keywords: [...keywordTokens(topic.title), ...aliases.map(normalize)], order, hasCodeExercise: Boolean(getCodeExerciseAvailability(topic.id)), codeExerciseCount: getCodeExerciseAvailability(topic.id)?.count ?? 0,
      }]),
    );
    return index;
  }, {} as Record<LanguageKey, Map<string, IndexedTopicMetadata>>);

export const getTopicMetadata = (languageKey: LanguageKey, topicId: string) =>
  TOPIC_METADATA_INDEX[languageKey]?.get(topicId);

export const getLanguageTopicsMetadata = (languageKey: LanguageKey) =>
  Array.from(TOPIC_METADATA_INDEX[languageKey]?.values() ?? []);

export const TOPIC_METADATA_BY_ID = new Map(
  LANGUAGE_ORDER.flatMap((languageKey) => getLanguageTopicsMetadata(languageKey).map((topic) => [topic.id, topic] as const)),
);

export const getTopicMetadataByGlobalId = (topicId: string) => TOPIC_METADATA_BY_ID.get(topicId);

export const getPracticeCandidates = (topicIds?: ReadonlySet<string>) =>
  Array.from(TOPIC_METADATA_BY_ID.values()).filter((topic) => !topicIds || topicIds.has(topic.id));

export const getLanguageAliases = (languageKey: LanguageKey) => LANGUAGE_ALIASES[languageKey] ?? [];

export const searchLearning = (query: string): LearningSearchResult[] => {
  const normalizedQuery = normalize(query);
  if (!normalizedQuery) return [];
  const terms = normalizedQuery.split(' ');
  const results: LearningSearchResult[] = [];

  for (const languageKey of LANGUAGE_ORDER) {
    const language = LANGUAGE_CATALOG_BY_KEY[languageKey];
    if (!language) continue;
    const aliases = (LANGUAGE_ALIASES[languageKey] ?? []).map(normalize);
    const languageText = normalize(`${language.shortTitle} ${language.title} ${language.category ?? ''} ${aliases.join(' ')}`);
    const exactLanguage = languageText === normalizedQuery || aliases.includes(normalizedQuery);
    const languageMatches = terms.every((term) => languageText.includes(term));
    if (languageMatches) {
      results.push({ kind: 'language', languageKey, title: language.shortTitle, summary: language.description, category: language.category, score: exactLanguage ? 100 : 65 });
    }
  }

  for (const languageKey of LANGUAGE_ORDER) {
    for (const topic of TOPIC_METADATA_INDEX[languageKey]?.values() ?? []) {
      const title = normalize(topic.title);
      const summary = normalize(topic.summary);
      const keywords = topic.keywords.map(normalize);
      const searchable = `${title} ${summary} ${keywords.join(' ')} ${normalize(topic.languageName)} ${normalize(topic.category ?? '')}`;
      if (!terms.every((term) => searchable.includes(term))) continue;
      let score = 20;
      if (title === normalizedQuery) score += 80;
      else if (title.startsWith(normalizedQuery)) score += 60;
      else if (title.includes(normalizedQuery)) score += 45;
      else if (keywords.some((keyword) => terms.every((term) => keyword.includes(term)))) score += 30;
      else if (summary.includes(normalizedQuery)) score += 15;
      results.push({ kind: 'topic', languageKey, topicId: topic.id, title: topic.title, summary: topic.summary, level: topic.level, duration: topic.duration, category: topic.category, score });
    }
  }

  return results.sort((left, right) => right.score - left.score || left.title.localeCompare(right.title));
};
