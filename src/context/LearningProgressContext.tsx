import React, { createContext, useCallback, useContext, useMemo } from 'react';
import {
  getTopicCountForLanguage,
  getTopicsForLanguage,
  LanguageKey,
} from '../data/learningRoadmaps';
import {
  markTopicStarted as markTopicStartedAction,
  toggleTopicCompleted as toggleTopicCompletedAction,
} from '../store/learningProgressSlice';
import { useAppDispatch, useAppSelector } from '../store/store';

type LearningProgressContextValue = {
  startedTopicIds: string[];
  completedTopicIds: string[];
  markTopicStarted: (topicId: string) => void;
  toggleTopicCompleted: (topicId: string) => void;
  isTopicStarted: (topicId: string) => boolean;
  isTopicCompleted: (topicId: string) => boolean;
  getLanguageStats: (languageKey: LanguageKey) => {
    startedTopics: number;
    completedTopics: number;
    totalTopics: number;
    startedScore: number;
    completedScore: number;
    remainingScore: number;
  };
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

  const markTopicStarted = useCallback((topicId: string) => {
    dispatch(markTopicStartedAction(topicId));
  }, [dispatch]);

  const toggleTopicCompleted = useCallback((topicId: string) => {
    dispatch(toggleTopicCompletedAction(topicId));
  }, [dispatch]);

  const isTopicStarted = useCallback(
    (topicId: string) => startedTopicIds.includes(topicId),
    [startedTopicIds],
  );

  const isTopicCompleted = useCallback(
    (topicId: string) => completedTopicIds.includes(topicId),
    [completedTopicIds],
  );

  const getLanguageStats = useCallback(
    (languageKey: LanguageKey) => {
      const topicIds = getTopicsForLanguage(languageKey).map((topic) => topic.id);
      const totalTopics = getTopicCountForLanguage(languageKey);
      const startedTopics = topicIds.filter((topicId) =>
        startedTopicIds.includes(topicId),
      ).length;
      const completedTopics = topicIds.filter((topicId) =>
        completedTopicIds.includes(topicId),
      ).length;
      const startedScore = Math.round((startedTopics / totalTopics) * 100);
      const completedScore = Math.round((completedTopics / totalTopics) * 100);

      return {
        startedTopics,
        completedTopics,
        totalTopics,
        startedScore,
        completedScore,
        remainingScore: Math.max(0, 100 - startedScore),
      };
    },
    [completedTopicIds, startedTopicIds],
  );

  const value = useMemo<LearningProgressContextValue>(
    () => ({
      startedTopicIds,
      completedTopicIds,
      markTopicStarted,
      toggleTopicCompleted,
      isTopicStarted,
      isTopicCompleted,
      getLanguageStats,
    }),
    [
      completedTopicIds,
      getLanguageStats,
      isTopicCompleted,
      isTopicStarted,
      markTopicStarted,
      startedTopicIds,
      toggleTopicCompleted,
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
