import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type LearningProgressState = {
  startedTopicIds: string[];
  completedTopicIds: string[];
};

const initialState: LearningProgressState = {
  startedTopicIds: [],
  completedTopicIds: [],
};

const uniqueIds = (ids: string[]) => Array.from(new Set(ids.filter(Boolean)));

const learningProgressSlice = createSlice({
  name: 'learningProgress',
  initialState,
  reducers: {
    hydrateLearningProgress: (
      state,
      action: PayloadAction<Partial<LearningProgressState> | undefined>,
    ) => {
      state.startedTopicIds = uniqueIds(action.payload?.startedTopicIds ?? []);
      state.completedTopicIds = uniqueIds(action.payload?.completedTopicIds ?? []);
    },
    markTopicStarted: (state, action: PayloadAction<string>) => {
      const topicId = action.payload;

      if (topicId && !state.startedTopicIds.includes(topicId)) {
        state.startedTopicIds.push(topicId);
      }
    },
    toggleTopicCompleted: (state, action: PayloadAction<string>) => {
      const topicId = action.payload;

      if (!topicId) {
        return;
      }

      if (!state.startedTopicIds.includes(topicId)) {
        state.startedTopicIds.push(topicId);
      }

      if (state.completedTopicIds.includes(topicId)) {
        state.completedTopicIds = state.completedTopicIds.filter(
          (currentId) => currentId !== topicId,
        );
        return;
      }

      state.completedTopicIds.push(topicId);
    },
  },
});

export const {
  hydrateLearningProgress,
  markTopicStarted,
  toggleTopicCompleted,
} = learningProgressSlice.actions;

export const learningProgressReducer = learningProgressSlice.reducer;
