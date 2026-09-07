import type { LanguageKey, TopicLevel } from '../content/types';

export type LearningGoalId = 'web-development' | 'backend-development' | 'mobile-development' | 'systems-programming' | 'database-development' | 'general-programming';
export type ExperienceLevel = 'beginner' | 'some-basics' | 'intermediate' | 'experienced';
export type GoalStage = { id: string; title: string; topicRefs: Array<{ languageKey: LanguageKey; topicIds?: string[]; levels?: TopicLevel[] }> };
export type LearningGoal = { id: LearningGoalId; title: string; description: string; languageKeys: LanguageKey[]; stages: GoalStage[] };
const refs = (languageKey: LanguageKey, topicIds: string[]) => ({ languageKey, topicIds });
const levels = (languageKey: LanguageKey, selected: TopicLevel[]) => ({ languageKey, levels: selected });

export const LEARNING_GOALS: LearningGoal[] = [
  { id: 'web-development', title: 'Web Development', description: 'Build a strong path from page structure to modern interfaces.', languageKeys: ['html', 'css', 'javascript', 'typescript', 'react'], stages: [
    { id: 'foundation', title: 'Web Foundations', topicRefs: [levels('html', ['Beginner']), levels('css', ['Beginner']), refs('javascript', ['js-intro', 'js-variables', 'js-control-flow', 'js-functions'])] },
    { id: 'core', title: 'Core Skills', topicRefs: [levels('html', ['Intermediate']), levels('css', ['Intermediate']), levels('javascript', ['Intermediate'])] },
    { id: 'modern', title: 'Modern Frontend', topicRefs: [levels('javascript', ['Advanced']), levels('typescript', ['Beginner', 'Intermediate']), levels('react', ['Beginner', 'Intermediate'])] },
    { id: 'projects', title: 'Projects', topicRefs: [refs('react', ['react-capstone']), refs('javascript', ['js-capstone'])] },
  ] },
  { id: 'backend-development', title: 'Backend Development', description: 'Learn backend foundations, APIs, data, and production habits.', languageKeys: ['javascript', 'nodejs', 'python', 'sql'], stages: [
    { id: 'foundation', title: 'Programming Foundations', topicRefs: [levels('javascript', ['Beginner']), levels('python', ['Beginner'])] },
    { id: 'core', title: 'Backend Core', topicRefs: [levels('nodejs', ['Beginner', 'Intermediate']), refs('sql', ['sql-select', 'sql-joins', 'sql-grouping'])] },
    { id: 'advanced', title: 'APIs and Reliability', topicRefs: [levels('nodejs', ['Advanced']), levels('sql', ['Advanced']), refs('javascript', ['js-async', 'js-modules'])] },
    { id: 'projects', title: 'Projects', topicRefs: [refs('nodejs', ['node-capstone']), refs('sql', ['sql-capstone'])] },
  ] },
  { id: 'mobile-development', title: 'Mobile Development', description: 'Choose a cross-platform or native route using the existing mobile tracks.', languageKeys: ['dartflutter', 'kotlin', 'swift'], stages: [
    { id: 'foundation', title: 'Mobile Foundations', topicRefs: [levels('dartflutter', ['Beginner']), levels('kotlin', ['Beginner']), levels('swift', ['Beginner'])] },
    { id: 'core', title: 'Core App Skills', topicRefs: [levels('dartflutter', ['Intermediate']), levels('kotlin', ['Intermediate']), levels('swift', ['Intermediate'])] },
    { id: 'advanced', title: 'Advanced Apps', topicRefs: [levels('dartflutter', ['Advanced']), levels('kotlin', ['Advanced']), levels('swift', ['Advanced'])] },
  ] },
  { id: 'systems-programming', title: 'Systems Programming', description: 'Progress from C fundamentals into modern systems choices.', languageKeys: ['c', 'cpp', 'rust'], stages: [
    { id: 'foundation', title: 'Foundations', topicRefs: [levels('c', ['Beginner'])] },
    { id: 'core', title: 'Memory and Core Skills', topicRefs: [levels('c', ['Intermediate']), levels('cpp', ['Beginner', 'Intermediate'])] },
    { id: 'advanced', title: 'Advanced Systems', topicRefs: [levels('c', ['Advanced']), levels('cpp', ['Advanced']), levels('rust', ['Beginner', 'Intermediate'])] },
    { id: 'projects', title: 'Projects', topicRefs: [refs('c', ['c-address-book-capstone']), refs('cpp', ['cpp-console-capstone']), refs('rust', ['rust-cli-capstone'])] },
  ] },
  { id: 'database-development', title: 'Database Development', description: 'Build query fluency, data modeling, and reporting skills.', languageKeys: ['sql', 'python', 'nodejs'], stages: [
    { id: 'foundation', title: 'Database Foundations', topicRefs: [levels('sql', ['Beginner'])] },
    { id: 'core', title: 'Data Modeling and Queries', topicRefs: [levels('sql', ['Intermediate']), refs('python', ['python-lists-dicts', 'python-files'])] },
    { id: 'advanced', title: 'Optimization and Applied Data', topicRefs: [levels('sql', ['Advanced']), refs('nodejs', ['node-json-api', 'node-validation'])] },
    { id: 'projects', title: 'Projects', topicRefs: [refs('sql', ['sql-capstone'])] },
  ] },
  { id: 'general-programming', title: 'General Programming', description: 'Start with one approachable language, then build transferable skills.', languageKeys: ['python', 'javascript'], stages: [
    { id: 'foundation', title: 'Foundations', topicRefs: [levels('python', ['Beginner'])] },
    { id: 'core', title: 'Core Skills', topicRefs: [levels('python', ['Intermediate']), refs('python', ['python-errors', 'python-modules'])] },
    { id: 'advanced', title: 'Applied Programming', topicRefs: [levels('python', ['Advanced']), refs('javascript', ['js-arrays-objects', 'js-async'])] },
    { id: 'projects', title: 'Projects', topicRefs: [refs('python', ['python-capstone'])] },
  ] },
];

export const getLearningGoal = (id?: string) => LEARNING_GOALS.find((goal) => goal.id === id);
