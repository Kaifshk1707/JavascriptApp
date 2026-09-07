import { LanguageKey, LanguageMetadata, LanguageRoadmap, TopicItem, TopicLevel } from './types';
import { LANGUAGE_CATALOG_BY_KEY as METADATA_CATALOG_BY_KEY } from './languageCatalog';
import { addExpansionHours, LEVELS, PRACTICE_EXPANSION_SECTIONS } from './utils';
export { LEVEL_FILTERS } from './languageCatalog';
import { htmlRoadmap } from './languages/html/roadmap';
import { cssRoadmap } from './languages/css/roadmap';
import { javascriptRoadmap } from './languages/javascript/roadmap';
import { pythonRoadmap } from './languages/python/roadmap';
import { reactRoadmap } from './languages/react/roadmap';
import { sqlRoadmap } from './languages/sql/roadmap';
import { nodejsRoadmap } from './languages/nodejs/roadmap';
import { bootstrapRoadmap } from './languages/bootstrap/roadmap';
import { typescriptRoadmap } from './languages/typescript/roadmap';
import { javaRoadmap } from './languages/java/roadmap';
import { cRoadmap } from './languages/c/roadmap';
import { cppRoadmap } from './languages/cpp/roadmap';
import { csharpRoadmap } from './languages/csharp/roadmap';
import { phpRoadmap } from './languages/php/roadmap';
import { goRoadmap } from './languages/go/roadmap';
import { rustRoadmap } from './languages/rust/roadmap';
import { kotlinRoadmap } from './languages/kotlin/roadmap';
import { swiftRoadmap } from './languages/swift/roadmap';
import { dartflutterRoadmap } from './languages/dartflutter/roadmap';
import { rubyRoadmap } from './languages/ruby/roadmap';
import { CODE_EXERCISES_BY_TOPIC } from './codeExercises';

export * from './types';

export const LANGUAGE_ORDER: LanguageKey[] = [
  'html',
  'css',
  'javascript',
  'typescript',
  'react',
  'bootstrap',
  'python',
  'nodejs',
  'php',
  'ruby',
  'go',
  'sql',
  'c',
  'cpp',
  'rust',
  'java',
  'csharp',
  'kotlin',
  'swift',
  'dartflutter',
];

export const FEATURED_LANGUAGE_KEYS: LanguageKey[] = ['html', 'css', 'javascript'];

export const EXPANDED_LANGUAGE_KEYS: LanguageKey[] = [
  'python',
  'nodejs',
  'php',
  'ruby',
  'go',
  'sql',
  'c',
  'cpp',
  'rust',
  'java',
  'csharp',
  'kotlin',
  'swift',
  'dartflutter',
];

const BASE_ROADMAPS: Record<LanguageKey, LanguageRoadmap> = {
  html: htmlRoadmap,
  css: cssRoadmap,
  javascript: javascriptRoadmap,
  python: pythonRoadmap,
  react: reactRoadmap,
  sql: sqlRoadmap,
  nodejs: nodejsRoadmap,
  bootstrap: bootstrapRoadmap,
  typescript: typescriptRoadmap,
  java: javaRoadmap,
  c: cRoadmap,
  cpp: cppRoadmap,
  csharp: csharpRoadmap,
  php: phpRoadmap,
  go: goRoadmap,
  rust: rustRoadmap,
  kotlin: kotlinRoadmap,
  swift: swiftRoadmap,
  dartflutter: dartflutterRoadmap,
  ruby: rubyRoadmap,
};

export const LEARNING_ROADMAPS: Record<LanguageKey, LanguageRoadmap> =
  LANGUAGE_ORDER.reduce((roadmaps, key) => {
    const roadmap = BASE_ROADMAPS[key];

    roadmaps[key] = {
      ...roadmap,
      totalHours: addExpansionHours(roadmap.totalHours),
      sections: [...roadmap.sections, PRACTICE_EXPANSION_SECTIONS[key]].map((section) => ({ ...section, topics: section.topics.map((topic) => ({ ...topic, codeExercises: [...(CODE_EXERCISES_BY_TOPIC[topic.id] ?? []), ...(topic.id === 'js-arrays-objects' ? CODE_EXERCISES_BY_TOPIC['js-arrays-objects-2'] ?? [] : [])].map((exercise, index) => ({ ...exercise, order: exercise.order ?? index + 1, difficulty: exercise.difficulty ?? (index === 0 ? 'Beginner' : topic.level) })) })) })),
    };

    return roadmaps;
  }, {} as Record<LanguageKey, LanguageRoadmap>);

export const TOPICS_BY_LANGUAGE: Record<LanguageKey, TopicItem[]> =
  LANGUAGE_ORDER.reduce((topicsByLanguage, key) => {
    topicsByLanguage[key] = LEARNING_ROADMAPS[key].sections.flatMap(
      (section) => section.topics,
    );
    return topicsByLanguage;
  }, {} as Record<LanguageKey, TopicItem[]>);

export const TOPIC_INDEX_BY_LANGUAGE: Record<LanguageKey, Map<string, TopicItem>> =
  LANGUAGE_ORDER.reduce((indexByLanguage, key) => {
    indexByLanguage[key] = new Map(
      TOPICS_BY_LANGUAGE[key].map((topic) => [topic.id, topic]),
    );
    return indexByLanguage;
  }, {} as Record<LanguageKey, Map<string, TopicItem>>);

const TOPIC_POSITION_BY_LANGUAGE: Record<LanguageKey, Map<string, number>> =
  LANGUAGE_ORDER.reduce((positionByLanguage, key) => {
    positionByLanguage[key] = new Map(
      TOPICS_BY_LANGUAGE[key].map((topic, index) => [topic.id, index]),
    );
    return positionByLanguage;
  }, {} as Record<LanguageKey, Map<string, number>>);

export const getLanguageByKey = (languageKey: LanguageKey): LanguageMetadata | undefined =>
  METADATA_CATALOG_BY_KEY[languageKey];

export const getLanguageRoadmap = (languageKey: LanguageKey): LanguageRoadmap | undefined =>
  LEARNING_ROADMAPS[languageKey];

export const getTopicsForLanguage = (languageKey: LanguageKey): TopicItem[] =>
  TOPICS_BY_LANGUAGE[languageKey] ?? [];

export const getTopicById = (languageKey: LanguageKey, topicId: string): TopicItem | undefined =>
  TOPIC_INDEX_BY_LANGUAGE[languageKey]?.get(topicId);

export const getTopicCountForLanguage = (languageKey: LanguageKey): number =>
  TOPICS_BY_LANGUAGE[languageKey]?.length ?? 0;

export const getTotalTopicCount = (): number =>
  LANGUAGE_ORDER.reduce((total, key) => total + getTopicCountForLanguage(key), 0);

export const getLanguageStats = (
  languageKey: LanguageKey,
  startedTopicIds: ReadonlySet<string>,
  completedTopicIds: ReadonlySet<string>,
) => {
  const topics = getTopicsForLanguage(languageKey);
  const totalTopics = topics.length;
  let startedTopics = 0;
  let completedTopics = 0;
  for (const topic of topics) {
    if (startedTopicIds.has(topic.id)) startedTopics += 1;
    if (completedTopicIds.has(topic.id)) completedTopics += 1;
  }
  const startedScore = totalTopics > 0 ? Math.round((startedTopics / totalTopics) * 100) : 0;
  const completedScore = totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 100) : 0;

  return {
    startedTopics,
    completedTopics,
    totalTopics,
    startedScore,
    completedScore,
    remainingScore: Math.max(0, 100 - startedScore),
  };
};

const getTopicPosition = (languageKey: LanguageKey, topicId: string) =>
  TOPIC_POSITION_BY_LANGUAGE[languageKey]?.get(topicId) ?? -1;

export const getNextTopic = (languageKey: LanguageKey, topicId: string): TopicItem | undefined => {
  const topics = getTopicsForLanguage(languageKey);
  const currentIndex = getTopicPosition(languageKey, topicId);
  return currentIndex >= 0 ? topics[currentIndex + 1] : undefined;
};

export const getPreviousTopic = (languageKey: LanguageKey, topicId: string): TopicItem | undefined => {
  const topics = getTopicsForLanguage(languageKey);
  const currentIndex = getTopicPosition(languageKey, topicId);
  return currentIndex > 0 ? topics[currentIndex - 1] : undefined;
};

const countLevels = (topics: TopicItem[]): Record<TopicLevel, number> =>
  LEVELS.reduce((counts, level) => {
    counts[level] = topics.filter((topic) => topic.level === level).length;
    return counts;
  }, {} as Record<TopicLevel, number>);

export const LANGUAGE_CATALOG: LanguageMetadata[] = LANGUAGE_ORDER.map((key) => {
  const { sections, ...roadmap } = LEARNING_ROADMAPS[key];
  const topics = TOPICS_BY_LANGUAGE[key];

  return {
    ...roadmap,
    topicCount: topics.length,
    topicIds: topics.map((topic) => topic.id),
    topics: topics.map(({ id, title, summary, level, duration }) => ({
      id,
      title,
      summary,
      level,
      duration,
    })),
    levelCounts: countLevels(topics),
  };
});

export const LANGUAGE_CATALOG_BY_KEY: Record<LanguageKey, LanguageMetadata> =
  LANGUAGE_CATALOG.reduce((catalog, language) => {
    catalog[language.key] = language;
    return catalog;
  }, {} as Record<LanguageKey, LanguageMetadata>);
