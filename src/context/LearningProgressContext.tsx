import React, { createContext, useCallback, useContext, useMemo, useEffect } from 'react';
import {
  getLanguageStats as getLanguageProgressStats,
  getRecommendedTopicMetadata,
  getTopicMetadataById,
  LanguageKey,
} from '../content/languageCatalog';
import { getTopicMetadata, getTopicMetadataByGlobalId, IndexedTopicMetadata } from '../content/topicIndex';
import {
  markQuizPassed as markQuizPassedAction,
  markTopicOpened as markTopicOpenedAction,
  markTopicStarted as markTopicStartedAction,
  toggleTopicCompleted as toggleTopicCompletedAction,
  toggleTopicBookmarked as toggleTopicBookmarkedAction,
  saveTopicNote as saveTopicNoteAction,
  toggleTopicReview as toggleTopicReviewAction,
  markTopicReviewed as markTopicReviewedAction,
  recordQuizAttempt as recordQuizAttemptAction,
  recordPracticeAttempt as recordPracticeAttemptAction,
  recordFlashcardReview as recordFlashcardReviewAction,
  completePracticeSession as completePracticeSessionAction,
  setDailyGoal as setDailyGoalAction,
  unlockAchievements as unlockAchievementsAction,
  saveLearningPreferences as saveLearningPreferencesAction,
  recordCodeExerciseAttempt as recordCodeExerciseAttemptAction,
  completeCodeExercise as completeCodeExerciseAction,
  saveCertificateDisplayName as saveCertificateDisplayNameAction,
  issueCertificate as issueCertificateAction,
  type AttemptStats,
} from '../store/learningProgressSlice';
import { useAppDispatch, useAppSelector } from '../store/store';
import { getLevelInfo, getDailyGoalProgress, getStreakFromDates, getWeeklyXp } from '../store/learningMetrics';
import { ACHIEVEMENTS, getAchievementMetric } from '../learning/achievements';
import type { ExperienceLevel } from '../learning/learningGoals';
import { LANGUAGE_ORDER } from '../content/languageCatalog';
import { createLocalCertificateId, getTrackCompletion } from '../learning/completion';

type LearningProgressContextValue = {
  startedTopicIds: string[];
  completedTopicIds: string[];
  quizPassedTopicIds: string[];
  lastOpenedTopicByLanguage: Partial<Record<LanguageKey, string>>;
  bookmarkedTopicIds: string[];
  notesByTopicId: Record<string, string>;
  reviewTopicIds: string[];
  completedAtByTopicId: Record<string, string>;
  lastReviewedAtByTopicId: Record<string, string>;
  reviewCountByTopicId: Record<string, number>;
  learningActivityDates: string[];
  quizStatsByTopicId: Record<string, AttemptStats>;
  practiceStatsByTopicId: Record<string, AttemptStats>;
  flashcardStatsByTopicId: Record<string, AttemptStats>;
  totalXp: number;
  practiceSessionCount: number;
  dailyGoalXp: number | null;
  dailyXpByDate: Record<string, number>;
  dailyGoalBonusDates: string[];
  unlockedAchievementIds: string[];
  achievementUnlockedAt: Record<string, string>;
  onboardingCompleted: boolean;
  experienceLevel?: ExperienceLevel;
  learningGoal?: string;
  dailyStudyMinutes: number;
  preferredLanguageKeys: string[];
  completedExerciseIds: string[];
  rewardedExerciseIds: string[];
  certificateDisplayName: string;
  certificatesByTrack: Record<string, { issuedAt: string; certificateId: string; displayName: string }>;
  markTopicOpened: (languageKey: LanguageKey, topicId: string) => void;
  markTopicStarted: (topicId: string) => void;
  markQuizPassed: (topicId: string) => void;
  toggleTopicCompleted: (topicId: string) => void;
  toggleTopicBookmarked: (topicId: string) => void;
  saveTopicNote: (topicId: string, note: string) => void;
  toggleTopicReview: (topicId: string) => void;
  markTopicReviewed: (topicId: string) => void;
  recordQuizAttempt: (topicId: string, correct: boolean) => void;
  recordPracticeAttempt: (topicId: string, correct: boolean) => void;
  recordFlashcardReview: (topicId: string, correct: boolean) => void;
  completePracticeSession: () => void;
  setDailyGoal: (goal: number | null) => void;
  saveLearningPreferences: (preferences: { onboardingCompleted?: boolean; experienceLevel?: ExperienceLevel; learningGoal?: string; dailyStudyMinutes?: number; preferredLanguageKeys?: string[] }) => void;
  recordCodeExerciseAttempt: (exerciseId: string, completed?: boolean) => void;
  completeCodeExercise: (exerciseId: string) => void;
  saveCertificateDisplayName: (name: string) => void;
  isTopicStarted: (topicId: string) => boolean;
  isTopicCompleted: (topicId: string) => boolean;
  isQuizPassed: (topicId: string) => boolean;
  getResumeTopic: (languageKey: LanguageKey) =>
    | ReturnType<typeof getTopicMetadataById>
    | undefined;
  getRecommendedTopic: (languageKey: LanguageKey) =>
    | ReturnType<typeof getRecommendedTopicMetadata>
    | undefined;
  getLanguageStats: (languageKey: LanguageKey) => {
    startedTopics: number;
    completedTopics: number;
    totalTopics: number;
    startedScore: number;
    completedScore: number;
    remainingScore: number;
    levelStats: Record<
      'Beginner' | 'Intermediate' | 'Advanced',
      { completed: number; total: number }
    >;
  };
  getLearningStreak: () => { current: number; longest: number };
  getWeakTopicIds: () => string[];
  getRecentlyLearnedTopics: () => IndexedTopicMetadata[];
  getLevelInfo: () => ReturnType<typeof getLevelInfo>;
  getDailyGoalProgress: () => ReturnType<typeof getDailyGoalProgress>;
  getWeeklyXp: () => ReturnType<typeof getWeeklyXp>;
  getAchievementProgress: () => Array<(typeof ACHIEVEMENTS)[number] & { value: number; unlocked: boolean; unlockedAt?: string }>;
  getTrackCompletion: (languageKey: LanguageKey) => ReturnType<typeof getTrackCompletion>;
};

const LearningProgressContext = createContext<LearningProgressContextValue | undefined>(undefined);

export const LearningProgressProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const dispatch = useAppDispatch();
  const startedTopicIds = useAppSelector(
    (state) => state.learningProgress.startedTopicIds,
  );
  const completedTopicIds = useAppSelector(
    (state) => state.learningProgress.completedTopicIds,
  );
  const quizPassedTopicIds = useAppSelector(
    (state) => state.learningProgress.quizPassedTopicIds,
  );
  const lastOpenedTopicByLanguage = useAppSelector(
    (state) => state.learningProgress.lastOpenedTopicByLanguage,
  );
  const bookmarkedTopicIds = useAppSelector((state) => state.learningProgress.bookmarkedTopicIds);
  const notesByTopicId = useAppSelector((state) => state.learningProgress.notesByTopicId);
  const reviewTopicIds = useAppSelector((state) => state.learningProgress.reviewTopicIds);
  const completedAtByTopicId = useAppSelector((state) => state.learningProgress.completedAtByTopicId);
  const lastReviewedAtByTopicId = useAppSelector((state) => state.learningProgress.lastReviewedAtByTopicId);
  const reviewCountByTopicId = useAppSelector((state) => state.learningProgress.reviewCountByTopicId);
  const learningActivityDates = useAppSelector((state) => state.learningProgress.learningActivityDates);
  const quizStatsByTopicId = useAppSelector((state) => state.learningProgress.quizStatsByTopicId);
  const practiceStatsByTopicId = useAppSelector((state) => state.learningProgress.practiceStatsByTopicId);
  const flashcardStatsByTopicId = useAppSelector((state) => state.learningProgress.flashcardStatsByTopicId);
  const totalXp = useAppSelector((state) => state.learningProgress.totalXp);
  const practiceSessionCount = useAppSelector((state) => state.learningProgress.practiceSessionCount);
  const dailyGoalXp = useAppSelector((state) => state.learningProgress.dailyGoalXp);
  const dailyXpByDate = useAppSelector((state) => state.learningProgress.dailyXpByDate);
  const dailyGoalBonusDates = useAppSelector((state) => state.learningProgress.dailyGoalBonusDates);
  const unlockedAchievementIds = useAppSelector((state) => state.learningProgress.unlockedAchievementIds);
  const achievementUnlockedAt = useAppSelector((state) => state.learningProgress.achievementUnlockedAt);
  const onboardingCompleted = useAppSelector((state) => state.learningProgress.onboardingCompleted);
  const experienceLevel = useAppSelector((state) => state.learningProgress.experienceLevel);
  const learningGoal = useAppSelector((state) => state.learningProgress.learningGoal);
  const dailyStudyMinutes = useAppSelector((state) => state.learningProgress.dailyStudyMinutes);
  const preferredLanguageKeys = useAppSelector((state) => state.learningProgress.preferredLanguageKeys);
  const completedExerciseIds = useAppSelector((state) => state.learningProgress.completedExerciseIds);
  const rewardedExerciseIds = useAppSelector((state) => state.learningProgress.rewardedExerciseIds);
  const certificateDisplayName = useAppSelector((state) => state.learningProgress.certificateDisplayName);
  const certificatesByTrack = useAppSelector((state) => state.learningProgress.certificatesByTrack);
  const startedTopicIdSet = useMemo(
    () => new Set(startedTopicIds),
    [startedTopicIds],
  );
  const completedTopicIdSet = useMemo(
    () => new Set(completedTopicIds),
    [completedTopicIds],
  );
  const quizPassedTopicIdSet = useMemo(
    () => new Set(quizPassedTopicIds),
    [quizPassedTopicIds],
  );

  const markTopicOpened = useCallback((languageKey: LanguageKey, topicId: string) => {
    dispatch(markTopicOpenedAction({ languageKey, topicId }));
  }, [dispatch]);

  const markTopicStarted = useCallback((topicId: string) => {
    dispatch(markTopicStartedAction(topicId));
  }, [dispatch]);

  const toggleTopicCompleted = useCallback((topicId: string) => {
    dispatch(toggleTopicCompletedAction(topicId));
  }, [dispatch]);

  const markQuizPassed = useCallback((topicId: string) => {
    dispatch(markQuizPassedAction(topicId));
  }, [dispatch]);
  const toggleTopicBookmarked = useCallback((topicId: string) => dispatch(toggleTopicBookmarkedAction(topicId)), [dispatch]);
  const saveTopicNote = useCallback((topicId: string, note: string) => dispatch(saveTopicNoteAction({ topicId, note })), [dispatch]);
  const toggleTopicReview = useCallback((topicId: string) => dispatch(toggleTopicReviewAction(topicId)), [dispatch]);
  const markTopicReviewed = useCallback((topicId: string) => dispatch(markTopicReviewedAction(topicId)), [dispatch]);
  const recordQuizAttempt = useCallback((topicId: string, correct: boolean) => dispatch(recordQuizAttemptAction({ topicId, correct })), [dispatch]);
  const recordPracticeAttempt = useCallback((topicId: string, correct: boolean) => dispatch(recordPracticeAttemptAction({ topicId, correct })), [dispatch]);
  const recordFlashcardReview = useCallback((topicId: string, correct: boolean) => dispatch(recordFlashcardReviewAction({ topicId, correct })), [dispatch]);
  const completePracticeSession = useCallback(() => dispatch(completePracticeSessionAction()), [dispatch]);
  const setDailyGoal = useCallback((goal: number | null) => dispatch(setDailyGoalAction(goal)), [dispatch]);
  const saveLearningPreferences = useCallback((preferences: { onboardingCompleted?: boolean; experienceLevel?: ExperienceLevel; learningGoal?: string; dailyStudyMinutes?: number; preferredLanguageKeys?: string[] }) => dispatch(saveLearningPreferencesAction(preferences)), [dispatch]);
  const recordCodeExerciseAttempt = useCallback((exerciseId: string, completed?: boolean) => dispatch(recordCodeExerciseAttemptAction({ exerciseId, completed })), [dispatch]);
  const completeCodeExercise = useCallback((exerciseId: string) => dispatch(completeCodeExerciseAction(exerciseId)), [dispatch]);
  const saveCertificateDisplayName = useCallback((name: string) => dispatch(saveCertificateDisplayNameAction(name)), [dispatch]);

  const isTopicStarted = useCallback(
    (topicId: string) => startedTopicIdSet.has(topicId),
    [startedTopicIdSet],
  );

  const isTopicCompleted = useCallback(
    (topicId: string) => completedTopicIdSet.has(topicId),
    [completedTopicIdSet],
  );

  const isQuizPassed = useCallback(
    (topicId: string) => quizPassedTopicIdSet.has(topicId),
    [quizPassedTopicIdSet],
  );

  const getResumeTopic = useCallback(
    (languageKey: LanguageKey) => {
      const lastOpenedTopicId = lastOpenedTopicByLanguage[languageKey];

      if (lastOpenedTopicId) {
        return getTopicMetadata(languageKey, lastOpenedTopicId);
      }

      return getRecommendedTopicMetadata(languageKey, completedTopicIdSet);
    },
    [completedTopicIdSet, lastOpenedTopicByLanguage],
  );

  const getRecommendedTopic = useCallback(
    (languageKey: LanguageKey) =>
      getRecommendedTopicMetadata(languageKey, completedTopicIdSet),
    [completedTopicIdSet],
  );

  const getLanguageStats = useCallback(
    (languageKey: LanguageKey) => {
      return getLanguageProgressStats(
        languageKey,
        startedTopicIdSet,
        completedTopicIdSet,
      );
    },
    [completedTopicIdSet, startedTopicIdSet],
  );
  const getLearningStreak = useCallback(() => getStreakFromDates(learningActivityDates), [learningActivityDates]);
  const getLevel = useCallback(() => getLevelInfo(totalXp), [totalXp]);
  const getGoal = useCallback(() => getDailyGoalProgress(dailyXpByDate, dailyGoalXp), [dailyGoalXp, dailyXpByDate]);
  const getWeek = useCallback(() => getWeeklyXp(dailyXpByDate), [dailyXpByDate]);
  const getAchievementProgress = useCallback(() => {
    const level = getLevel().level;
    const streak = getLearningStreak().current;
    const completed = new Set(completedTopicIds);
    const trackCompletions = LANGUAGE_ORDER.map((key) => getTrackCompletion(key, completed));
    const completionValues = {
      tracks: trackCompletions.filter((item) => item.state === 'Track Completed').length,
      basicTracks: trackCompletions.filter((item) => item.levels.Beginner.complete).length,
      capstones: trackCompletions.reduce((sum, item) => sum + item.capstones.filter((topic) => completed.has(topic.id)).length, 0),
    };
    return ACHIEVEMENTS.map((definition) => ({ ...definition, value: getAchievementMetric(definition, { completedTopicIds, quizPassedTopicIds, practiceSessionCount, reviewCountByTopicId, flashcardStatsByTopicId } as any, streak, level, completedExerciseIds, completionValues), unlocked: unlockedAchievementIds.includes(definition.id), unlockedAt: achievementUnlockedAt[definition.id] }));
  }, [achievementUnlockedAt, completedExerciseIds, completedTopicIds, flashcardStatsByTopicId, getLearningStreak, getLevel, practiceSessionCount, quizPassedTopicIds, reviewCountByTopicId, unlockedAchievementIds]);
  useEffect(() => {
    const now = new Date().toISOString();
    const newlyUnlocked = getAchievementProgress().filter((item) => item.value >= item.target && !item.unlocked).map((item) => ({ id: item.id, unlockedAt: now }));
    if (newlyUnlocked.length) dispatch(unlockAchievementsAction(newlyUnlocked));
  }, [dispatch, getAchievementProgress]);
  useEffect(() => {
    const completed = new Set(completedTopicIds);
    LANGUAGE_ORDER.forEach((languageKey) => { if (getTrackCompletion(languageKey, completed).state === 'Track Completed' && !certificatesByTrack[languageKey]) { const issuedAt = new Date().toISOString(); dispatch(issueCertificateAction({ trackKey: languageKey, issuedAt, certificateId: createLocalCertificateId(languageKey, issuedAt) })); } });
  }, [certificatesByTrack, completedTopicIds, dispatch]);
  const getTrackCompletionForLanguage = useCallback((languageKey: LanguageKey) => getTrackCompletion(languageKey, completedTopicIdSet), [completedTopicIdSet]);
  const getWeakTopicIds = useCallback(() => {
    const weakIds: string[] = [];
    const ids = new Set([...Object.keys(quizStatsByTopicId), ...Object.keys(practiceStatsByTopicId)]);
    ids.forEach((topicId) => {
      const quiz = quizStatsByTopicId[topicId];
      const practice = practiceStatsByTopicId[topicId];
      const attempts = (quiz?.attempts ?? 0) + (practice?.attempts ?? 0);
      const correct = (quiz?.correct ?? 0) + (practice?.correct ?? 0);
      if (attempts >= 2 && correct / attempts < 0.7) weakIds.push(topicId);
    });
    return weakIds;
  }, [practiceStatsByTopicId, quizStatsByTopicId]);
  const getRecentlyLearnedTopics = useCallback(() => Object.entries(completedAtByTopicId)
    .sort(([, left], [, right]) => right.localeCompare(left))
    .slice(0, 5)
    .map(([topicId]) => getTopicMetadataByGlobalId(topicId))
    .filter(Boolean) as IndexedTopicMetadata[], [completedAtByTopicId]);

  const value = useMemo<LearningProgressContextValue>(
    () => ({
      startedTopicIds,
      completedTopicIds,
      quizPassedTopicIds,
      lastOpenedTopicByLanguage,
      bookmarkedTopicIds, notesByTopicId, reviewTopicIds, completedAtByTopicId, lastReviewedAtByTopicId, reviewCountByTopicId, learningActivityDates,
      quizStatsByTopicId, practiceStatsByTopicId, flashcardStatsByTopicId,
      totalXp, practiceSessionCount, dailyGoalXp, dailyXpByDate, dailyGoalBonusDates, unlockedAchievementIds, achievementUnlockedAt,
      onboardingCompleted, experienceLevel, learningGoal, dailyStudyMinutes, preferredLanguageKeys,
      completedExerciseIds, rewardedExerciseIds,
      certificateDisplayName, certificatesByTrack,
      markTopicOpened,
      markTopicStarted,
      markQuizPassed,
      toggleTopicCompleted,
      toggleTopicBookmarked, saveTopicNote, toggleTopicReview, markTopicReviewed,
      recordQuizAttempt, recordPracticeAttempt, recordFlashcardReview,
      completePracticeSession, setDailyGoal,
      saveLearningPreferences,
      recordCodeExerciseAttempt, completeCodeExercise,
      saveCertificateDisplayName,
      isTopicStarted,
      isTopicCompleted,
      isQuizPassed,
      getResumeTopic,
      getRecommendedTopic,
      getLanguageStats,
      getLearningStreak,
      getWeakTopicIds,
      getRecentlyLearnedTopics,
      getLevelInfo: getLevel,
      getDailyGoalProgress: getGoal,
      getWeeklyXp: getWeek,
      getAchievementProgress,
      getTrackCompletion: getTrackCompletionForLanguage,
    }),
    [
      completedTopicIds,
      bookmarkedTopicIds, completedAtByTopicId, getLearningStreak, lastReviewedAtByTopicId, learningActivityDates, markTopicReviewed, notesByTopicId, reviewCountByTopicId, reviewTopicIds, saveTopicNote, toggleTopicBookmarked, toggleTopicReview,
      flashcardStatsByTopicId, getWeakTopicIds, getRecentlyLearnedTopics, markTopicReviewed, practiceStatsByTopicId, quizStatsByTopicId, recordFlashcardReview, recordPracticeAttempt, recordQuizAttempt,
      getLanguageStats,
      getRecommendedTopic,
      getResumeTopic,
      isTopicCompleted,
      isQuizPassed,
      isTopicStarted,
      lastOpenedTopicByLanguage,
      markQuizPassed,
      markTopicOpened,
      markTopicStarted,
      quizPassedTopicIds,
      startedTopicIds,
      toggleTopicCompleted,
      totalXp, practiceSessionCount, dailyGoalXp, dailyXpByDate, dailyGoalBonusDates, unlockedAchievementIds, achievementUnlockedAt,
      completePracticeSession, setDailyGoal, getLevel, getGoal, getWeek, getAchievementProgress,
      onboardingCompleted, experienceLevel, learningGoal, dailyStudyMinutes, preferredLanguageKeys, saveLearningPreferences,
      completedExerciseIds, rewardedExerciseIds, recordCodeExerciseAttempt, completeCodeExercise,
      certificateDisplayName, certificatesByTrack, saveCertificateDisplayName, getTrackCompletionForLanguage,
    ],
  );

  return (
    <LearningProgressContext.Provider value={value}>
      {children}
    </LearningProgressContext.Provider>
  );
};

export const useLearningProgress = () => {
  const context = useContext(LearningProgressContext);

  if (!context) {
    throw new Error('useLearningProgress must be used within LearningProgressProvider');
  }

  return context;
};
