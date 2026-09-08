import { getTopicById } from './index';
import { FlashcardItem, QuizItem, LanguageKey } from './types';

export const getPracticeQuestionsForTopic = (languageKey: LanguageKey, topicId: string): QuizItem[] =>
  getTopicById(languageKey, topicId)?.quiz ?? [];

export const getFlashcardsForTopic = (languageKey: LanguageKey, topicId: string): FlashcardItem[] => {
  const topic = getTopicById(languageKey, topicId);
  if (!topic) return [];
  const firstQuiz = topic.quiz[0];
  return [{ front: topic.title, back: topic.summary, tag: topic.level }, ...(firstQuiz ? [{ front: firstQuiz.question, back: firstQuiz.explanation || firstQuiz.answer, tag: 'Quiz revision' }] : [])];
};
