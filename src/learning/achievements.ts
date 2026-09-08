import type { LearningProgressState } from '../store/learningProgressSlice';

export type AchievementDefinition = { id: string; title: string; description: string; target: number; metric: string };
export const ACHIEVEMENTS: AchievementDefinition[] = [
  { id: 'first-lesson', title: 'First Steps', description: 'Complete your first lesson.', target: 1, metric: 'completed' },
  { id: 'five-lessons', title: 'Building Momentum', description: 'Complete five lessons.', target: 5, metric: 'completed' },
  { id: 'twenty-five-lessons', title: 'Steady Learner', description: 'Complete 25 lessons.', target: 25, metric: 'completed' },
  { id: 'first-quiz', title: 'Quiz Ready', description: 'Pass your first lesson quiz.', target: 1, metric: 'quiz' },
  { id: 'ten-quizzes', title: 'Recall Practice', description: 'Pass ten lesson quizzes.', target: 10, metric: 'quiz' },
  { id: 'first-practice', title: 'Active Recall', description: 'Finish a practice session.', target: 1, metric: 'practiceSessions' },
  { id: 'ten-practice', title: 'Practice Habit', description: 'Finish ten practice sessions.', target: 10, metric: 'practiceSessions' },
  { id: 'first-review', title: 'Review Complete', description: 'Complete a queued review.', target: 1, metric: 'reviews' },
  { id: 'ten-reviews', title: 'Memory Builder', description: 'Complete ten queued reviews.', target: 10, metric: 'reviews' },
  { id: 'first-flashcard', title: 'Flashcard Start', description: 'Review your first flashcard.', target: 1, metric: 'flashcards' },
  { id: 'three-day-streak', title: 'Three-Day Streak', description: 'Learn on three consecutive days.', target: 3, metric: 'streak' },
  { id: 'level-five', title: 'Level Five', description: 'Reach level five.', target: 5, metric: 'level' },
  { id: 'first-code-exercise', title: 'First Code Exercise', description: 'Complete your first coding exercise.', target: 1, metric: 'code' },
  { id: 'ten-code-exercises', title: 'Code Practice Habit', description: 'Complete ten coding exercises.', target: 10, metric: 'code' },
  { id: 'advanced-code-exercise', title: 'Advanced Builder', description: 'Complete an advanced coding exercise.', target: 1, metric: 'advancedCode' },
  { id: 'first-basic-track', title: 'Foundation Complete', description: 'Complete the Basic level of a learning track.', target: 1, metric: 'basicTracks' },
  { id: 'first-capstone', title: 'Project Finisher', description: 'Complete a track capstone project.', target: 1, metric: 'capstones' },
  { id: 'first-track', title: 'Track Completed', description: 'Complete every required lesson in a learning track.', target: 1, metric: 'tracks' },
  { id: 'three-tracks', title: 'Multi-Track Learner', description: 'Complete three learning tracks.', target: 3, metric: 'tracks' },
];

export const getAchievementMetric = (definition: AchievementDefinition, state: LearningProgressState, streak: number, level: number, completedExerciseIds: string[] = [], completionValues: Record<string, number> = {}) => {
  if (definition.metric === 'completed') return state.completedTopicIds.length;
  if (definition.metric === 'quiz') return state.quizPassedTopicIds.length;
  if (definition.metric === 'practiceSessions') return state.practiceSessionCount;
  if (definition.metric === 'reviews') return Object.values(state.reviewCountByTopicId).reduce((sum, count) => sum + count, 0);
  if (definition.metric === 'flashcards') return Object.values(state.flashcardStatsByTopicId).reduce((sum, stats) => sum + stats.attempts, 0);
  if (definition.metric === 'code') return completedExerciseIds.length;
  if (definition.metric === 'advancedCode') return completedExerciseIds.some((id) => id.includes('capstone') || id.includes('async') || id.includes('scope')) ? 1 : 0;
  if (definition.metric in completionValues) return completionValues[definition.metric];
  if (definition.metric === 'streak') return streak;
  return level;
};
