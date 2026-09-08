export type TopicLevel = 'Beginner' | 'Intermediate' | 'Advanced';
export type LanguageCategory = 'Web' | 'Backend' | 'Database' | 'Systems' | 'Enterprise' | 'Mobile';

export type QuizItem = {
  question: string;
  answer: string;
  options?: string[];
  explanation?: string;
};

export type FlashcardItem = { front: string; back: string; hint?: string; tag?: string };

export type PracticeLab = {
  title: string;
  goal: string;
  steps: string[];
  starterCode: string;
  expectedResult: string[];
};

export type TopicItem = {
  id: string;
  title: string;
  summary: string;
  level: TopicLevel;
  duration: string;
  points: string[];
  theory: string[];
  practical: PracticeLab;
  challenge: string[];
  references: string[];
  quiz: QuizItem[];
  prerequisites?: string[];
  codeExercises?: CodeExercise[];
};

export type CodeExerciseLanguage = 'html' | 'css' | 'javascript' | 'python';
export type CodeExerciseValidationType = 'manual' | 'output-match' | 'dom-check' | 'required-token';
export type CodeExerciseTestCase = { name: string; input?: unknown; expected: unknown };
export type CodeExercise = {
  id: string;
  title: string;
  description: string;
  language: CodeExerciseLanguage;
  starterCode: string;
  solutionCode?: string;
  baseHtml?: string;
  expectedOutput?: string;
  hints?: string[];
  validationType: CodeExerciseValidationType;
  requiredTokens?: string[];
  difficulty?: TopicLevel;
  order?: number;
  testCases?: CodeExerciseTestCase[];
};

export type TopicSection = {
  id: string;
  title: string;
  subtitle: string;
  topics: TopicItem[];
};

export type LanguageKey =
  | 'html'
  | 'css'
  | 'javascript'
  | 'python'
  | 'react'
  | 'sql'
  | 'nodejs'
  | 'bootstrap'
  | 'typescript'
  | 'java'
  | 'c'
  | 'cpp'
  | 'csharp'
  | 'php'
  | 'go'
  | 'rust'
  | 'kotlin'
  | 'swift'
  | 'dartflutter'
  | 'ruby';

export type LanguageRoadmap = {
  key: LanguageKey;
  title: string;
  shortTitle: string;
  subtitle: string;
  description: string;
  icon: string;
  color: string;
  totalHours: string;
  focusAreas: string[];
  recommendedProject: string;
  sections: TopicSection[];
};

export type LanguageLevelCounts = Record<TopicLevel, number>;

export type TopicMetadata = Pick<TopicItem, 'id' | 'title' | 'summary' | 'level' | 'duration'>;

export type LanguageMetadata = Omit<LanguageRoadmap, 'sections'> & {
  topicCount: number;
  topicIds: string[];
  topics: TopicMetadata[];
  levelCounts: LanguageLevelCounts;
  category?: LanguageCategory;
  aliases?: string[];
};
