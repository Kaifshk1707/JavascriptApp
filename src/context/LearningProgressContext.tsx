import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import {
  getTopicCountForLanguage,
  getTopicsForLanguage,
  LanguageKey,
} from '../data/learningRoadmaps';

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
  const [startedTopicIds, setStartedTopicIds] = useState<string[]>([]);
  const [completedTopicIds, setCompletedTopicIds] = useState<string[]>([]);

  const markTopicStarted = useCallback((topicId: string) => {
    setStartedTopicIds((previous) =>
      previous.includes(topicId) ? previous : [...previous, topicId],
    );
  }, []);

  const toggleTopicCompleted = useCallback((topicId: string) => {
    markTopicStarted(topicId);
    setCompletedTopicIds((previous) =>
      previous.includes(topicId)
        ? previous.filter((currentId) => currentId !== topicId)
        : [...previous, topicId],
    );
  }, [markTopicStarted]);

  const value = useMemo<LearningProgressContextValue>(
    () => ({
      startedTopicIds,
      completedTopicIds,
      markTopicStarted,
      toggleTopicCompleted,
      isTopicStarted: (topicId: string) => startedTopicIds.includes(topicId),
      isTopicCompleted: (topicId: string) => completedTopicIds.includes(topicId),
      getLanguageStats: (languageKey: LanguageKey) => {
        const topicIds = getTopicsForLanguage(languageKey).map((topic) => topic.id);
        const totalTopics = getTopicCountForLanguage(languageKey);
        const startedTopics = topicIds.filter((topicId) => startedTopicIds.includes(topicId)).length;
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
    }),
    [completedTopicIds, markTopicStarted, startedTopicIds, toggleTopicCompleted],
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
