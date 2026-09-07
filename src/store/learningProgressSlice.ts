import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { LanguageKey } from '../content/languageCatalog';

export type LearningProgressState = {
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
  awardedLessonXpTopicIds: string[];
  firstQuizBonusTopicIds: string[];
  flashcardXpAwardedTopicIds: string[];
  practiceSessionCount: number;
  dailyGoalXp: number | null;
  dailyXpByDate: Record<string, number>;
  dailyGoalBonusDates: string[];
  unlockedAchievementIds: string[];
  achievementUnlockedAt: Record<string, string>;
  gamificationMigrationVersion: number;
  onboardingCompleted: boolean;
  experienceLevel?: 'beginner' | 'some-basics' | 'intermediate' | 'experienced';
  learningGoal?: string;
  dailyStudyMinutes: number;
  preferredLanguageKeys: string[];
  completedExerciseIds: string[];
  rewardedExerciseIds: string[];
  codeAttemptStatsByExerciseId: Record<string, AttemptStats>;
  certificateDisplayName: string;
  certificatesByTrack: Record<string, { issuedAt: string; certificateId: string; displayName: string }>;
  trackCompletionRewardedIds: string[];
};

export type AttemptStats = { attempts: number; correct: number; incorrect: number; lastAttemptedAt?: string };

const initialState: LearningProgressState = {
  startedTopicIds: [],
  completedTopicIds: [],
  quizPassedTopicIds: [],
  lastOpenedTopicByLanguage: {},
  bookmarkedTopicIds: [], notesByTopicId: {}, reviewTopicIds: [],
  completedAtByTopicId: {}, lastReviewedAtByTopicId: {}, reviewCountByTopicId: {},
  learningActivityDates: [],
  quizStatsByTopicId: {}, practiceStatsByTopicId: {}, flashcardStatsByTopicId: {},
  totalXp: 0, awardedLessonXpTopicIds: [], firstQuizBonusTopicIds: [],
  flashcardXpAwardedTopicIds: [], dailyGoalXp: 30, dailyXpByDate: {},
  practiceSessionCount: 0,
  dailyGoalBonusDates: [], unlockedAchievementIds: [], achievementUnlockedAt: {},
  gamificationMigrationVersion: 1,
  onboardingCompleted: false, dailyStudyMinutes: 30, preferredLanguageKeys: [],
  completedExerciseIds: [], rewardedExerciseIds: [], codeAttemptStatsByExerciseId: {},
  certificateDisplayName: 'Learner', certificatesByTrack: {}, trackCompletionRewardedIds: [],
};

const uniqueIds = (ids: unknown) => Array.from(new Set(Array.isArray(ids) ? ids.filter((id): id is string => typeof id === 'string' && Boolean(id)) : []));
const safeStringMap = (value: unknown, maxLength?: number): Record<string, string> => {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return {};
  return Object.entries(value).reduce<Record<string, string>>((result, [key, item]) => {
    if (typeof item === 'string' && item.trim()) result[key] = maxLength ? item.trim().slice(0, maxLength) : item;
    return result;
  }, {});
};
const safeStatsMap = (value: unknown): Record<string, AttemptStats> => {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return {};
  return Object.entries(value).reduce<Record<string, AttemptStats>>((result, [key, item]) => {
    if (!item || typeof item !== 'object' || Array.isArray(item)) return result;
    const candidate = item as Record<string, unknown>;
    const attempts = Number(candidate.attempts); const correct = Number(candidate.correct); const incorrect = Number(candidate.incorrect);
    if (Number.isFinite(attempts) && Number.isFinite(correct) && Number.isFinite(incorrect) && attempts >= 0 && correct >= 0 && incorrect >= 0) result[key] = { attempts, correct, incorrect, lastAttemptedAt: typeof candidate.lastAttemptedAt === 'string' ? candidate.lastAttemptedAt : undefined };
    return result;
  }, {});
};
const localDateKey = (date = new Date()) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};
const recordLearningDay = (state: LearningProgressState) => {
  const today = localDateKey();
  if (!state.learningActivityDates.includes(today)) {
    state.learningActivityDates = [...state.learningActivityDates, today].slice(-366);
  }
};
const awardXp = (state: LearningProgressState, amount: number) => {
  if (!Number.isFinite(amount) || amount <= 0) return;
  state.totalXp += amount;
  const today = localDateKey();
  state.dailyXpByDate[today] = (state.dailyXpByDate[today] ?? 0) + amount;
  const dates = Object.keys(state.dailyXpByDate).sort().slice(-366);
  state.dailyXpByDate = dates.reduce<Record<string, number>>((result, date) => {
    result[date] = state.dailyXpByDate[date];
    return result;
  }, {});
};
const maybeAwardDailyGoalBonus = (state: LearningProgressState) => {
  const today = localDateKey();
  if (state.dailyGoalXp && (state.dailyXpByDate[today] ?? 0) >= state.dailyGoalXp && !state.dailyGoalBonusDates.includes(today)) {
    state.dailyGoalBonusDates.push(today);
    state.dailyGoalBonusDates = state.dailyGoalBonusDates.slice(-366);
    awardXp(state, 10);
  }
};

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
      state.quizPassedTopicIds = uniqueIds(action.payload?.quizPassedTopicIds ?? []);
      state.lastOpenedTopicByLanguage = safeStringMap(action.payload?.lastOpenedTopicByLanguage);
      state.bookmarkedTopicIds = uniqueIds(action.payload?.bookmarkedTopicIds ?? []);
      state.notesByTopicId = safeStringMap(action.payload?.notesByTopicId, 4000);
      state.reviewTopicIds = uniqueIds(action.payload?.reviewTopicIds ?? []);
      state.completedAtByTopicId = safeStringMap(action.payload?.completedAtByTopicId);
      state.lastReviewedAtByTopicId = safeStringMap(action.payload?.lastReviewedAtByTopicId);
      state.reviewCountByTopicId = Object.entries(action.payload?.reviewCountByTopicId && typeof action.payload.reviewCountByTopicId === 'object' ? action.payload.reviewCountByTopicId : {}).reduce<Record<string, number>>((result, [key, count]) => { if (typeof count === 'number' && Number.isFinite(count) && count >= 0) result[key] = count; return result; }, {});
      state.learningActivityDates = uniqueIds(action.payload?.learningActivityDates ?? []).slice(-366);
      state.quizStatsByTopicId = safeStatsMap(action.payload?.quizStatsByTopicId);
      state.practiceStatsByTopicId = safeStatsMap(action.payload?.practiceStatsByTopicId);
      state.flashcardStatsByTopicId = safeStatsMap(action.payload?.flashcardStatsByTopicId);
      const payload = action.payload as Partial<LearningProgressState> | undefined;
      const oldCompleted = uniqueIds(payload?.completedTopicIds ?? []);
      const oldQuizPassed = uniqueIds(payload?.quizPassedTopicIds ?? []);
      const migrationVersion = typeof payload?.gamificationMigrationVersion === 'number' ? payload.gamificationMigrationVersion : 0;
      state.totalXp = migrationVersion >= 1 && typeof payload?.totalXp === 'number' ? Math.max(0, payload.totalXp) : oldCompleted.length * 20 + oldQuizPassed.length * 10;
      state.awardedLessonXpTopicIds = uniqueIds(payload?.awardedLessonXpTopicIds ?? (migrationVersion ? [] : oldCompleted));
      state.firstQuizBonusTopicIds = uniqueIds(payload?.firstQuizBonusTopicIds ?? (migrationVersion ? [] : oldQuizPassed));
      state.flashcardXpAwardedTopicIds = uniqueIds(payload?.flashcardXpAwardedTopicIds ?? []);
      state.practiceSessionCount = typeof payload?.practiceSessionCount === 'number' && payload.practiceSessionCount >= 0 ? payload.practiceSessionCount : 0;
      state.dailyGoalXp = payload?.dailyGoalXp === null ? null : (typeof payload?.dailyGoalXp === 'number' && [10, 20, 30, 50].includes(payload.dailyGoalXp) ? payload.dailyGoalXp : 30);
      state.dailyXpByDate = Object.entries(payload?.dailyXpByDate && typeof payload.dailyXpByDate === 'object' ? payload.dailyXpByDate : {}).reduce<Record<string, number>>((result, [date, xp]) => { if (/^\d{4}-\d{2}-\d{2}$/.test(date) && typeof xp === 'number' && Number.isFinite(xp) && xp >= 0) result[date] = xp; return result; }, {});
      const dailyDates = Object.keys(state.dailyXpByDate).sort().slice(-366);
      state.dailyXpByDate = dailyDates.reduce<Record<string, number>>((result, date) => { result[date] = state.dailyXpByDate[date]; return result; }, {});
      state.dailyGoalBonusDates = uniqueIds(payload?.dailyGoalBonusDates ?? []).slice(-366);
      state.unlockedAchievementIds = uniqueIds(payload?.unlockedAchievementIds ?? []);
      state.achievementUnlockedAt = safeStringMap(payload?.achievementUnlockedAt);
      state.gamificationMigrationVersion = 1;
      state.onboardingCompleted = payload?.onboardingCompleted === true;
      state.experienceLevel = ['beginner', 'some-basics', 'intermediate', 'experienced'].includes(payload?.experienceLevel ?? '') ? payload?.experienceLevel as LearningProgressState['experienceLevel'] : undefined;
      state.learningGoal = typeof payload?.learningGoal === 'string' ? payload.learningGoal : undefined;
      state.dailyStudyMinutes = typeof payload?.dailyStudyMinutes === 'number' && [10, 20, 30, 45, 60].includes(payload.dailyStudyMinutes) ? payload.dailyStudyMinutes : 30;
      state.preferredLanguageKeys = uniqueIds(payload?.preferredLanguageKeys ?? []).slice(0, 2);
      state.completedExerciseIds = uniqueIds(payload?.completedExerciseIds ?? []);
      state.rewardedExerciseIds = uniqueIds(payload?.rewardedExerciseIds ?? []);
      state.codeAttemptStatsByExerciseId = safeStatsMap(payload?.codeAttemptStatsByExerciseId);
      state.certificateDisplayName = typeof payload?.certificateDisplayName === 'string' && payload.certificateDisplayName.trim() ? payload.certificateDisplayName.trim().slice(0, 80) : 'Learner';
      state.certificatesByTrack = payload?.certificatesByTrack && typeof payload.certificatesByTrack === 'object' ? Object.entries(payload.certificatesByTrack).reduce<Record<string, { issuedAt: string; certificateId: string; displayName: string }>>((result, [key, value]) => { if (value && typeof value === 'object' && typeof value.issuedAt === 'string' && typeof value.certificateId === 'string' && typeof value.displayName === 'string') result[key] = { issuedAt: value.issuedAt, certificateId: value.certificateId, displayName: value.displayName.slice(0, 80) }; return result; }, {}) : {};
      state.trackCompletionRewardedIds = uniqueIds(payload?.trackCompletionRewardedIds ?? []);
    },
    markTopicOpened: (
      state,
      action: PayloadAction<{ languageKey: LanguageKey; topicId: string }>,
    ) => {
      const { languageKey, topicId } = action.payload;

      if (!topicId) {
        return;
      }

      if (!state.startedTopicIds.includes(topicId)) {
        state.startedTopicIds.push(topicId);
      }

      state.lastOpenedTopicByLanguage[languageKey] = topicId;
    },
    markTopicStarted: (state, action: PayloadAction<string>) => {
      const topicId = action.payload;

      if (topicId && !state.startedTopicIds.includes(topicId)) {
        state.startedTopicIds.push(topicId);
      }
    },
    markQuizPassed: (state, action: PayloadAction<string>) => {
      const topicId = action.payload;

      if (topicId && !state.quizPassedTopicIds.includes(topicId)) {
        state.quizPassedTopicIds.push(topicId);
        if (!state.firstQuizBonusTopicIds.includes(topicId)) { state.firstQuizBonusTopicIds.push(topicId); awardXp(state, 10); maybeAwardDailyGoalBonus(state); }
        recordLearningDay(state);
      }
    },
    recordQuizAttempt: (state, action: PayloadAction<{ topicId: string; correct: boolean }>) => {
      const { topicId, correct } = action.payload;
      if (!topicId) return;
      const previous = state.quizStatsByTopicId[topicId] ?? { attempts: 0, correct: 0, incorrect: 0 };
      state.quizStatsByTopicId[topicId] = { attempts: previous.attempts + 1, correct: previous.correct + (correct ? 1 : 0), incorrect: previous.incorrect + (correct ? 0 : 1), lastAttemptedAt: new Date().toISOString() };
      if (correct) recordLearningDay(state);
    },
    recordPracticeAttempt: (state, action: PayloadAction<{ topicId: string; correct: boolean }>) => {
      const { topicId, correct } = action.payload;
      if (!topicId) return;
      const previous = state.practiceStatsByTopicId[topicId] ?? { attempts: 0, correct: 0, incorrect: 0 };
      state.practiceStatsByTopicId[topicId] = { attempts: previous.attempts + 1, correct: previous.correct + (correct ? 1 : 0), incorrect: previous.incorrect + (correct ? 0 : 1), lastAttemptedAt: new Date().toISOString() };
      if (!correct && !state.reviewTopicIds.includes(topicId)) state.reviewTopicIds.push(topicId);
      if (correct) recordLearningDay(state);
    },
    recordFlashcardReview: (state, action: PayloadAction<{ topicId: string; correct: boolean }>) => {
      const { topicId, correct } = action.payload;
      if (!topicId) return;
      const previous = state.flashcardStatsByTopicId[topicId] ?? { attempts: 0, correct: 0, incorrect: 0 };
      state.flashcardStatsByTopicId[topicId] = { attempts: previous.attempts + 1, correct: previous.correct + (correct ? 1 : 0), incorrect: previous.incorrect + (correct ? 0 : 1), lastAttemptedAt: new Date().toISOString() };
      if (!state.flashcardXpAwardedTopicIds.includes(topicId)) { state.flashcardXpAwardedTopicIds.push(topicId); awardXp(state, 2); maybeAwardDailyGoalBonus(state); }
      recordLearningDay(state);
    },
    completePracticeSession: (state) => { state.practiceSessionCount += 1; awardXp(state, 10); maybeAwardDailyGoalBonus(state); recordLearningDay(state); },
    setDailyGoal: (state, action: PayloadAction<number | null>) => { state.dailyGoalXp = action.payload === null || [10, 20, 30, 50].includes(action.payload) ? action.payload : state.dailyGoalXp; },
    unlockAchievements: (state, action: PayloadAction<Array<{ id: string; unlockedAt: string }>>) => {
      action.payload.forEach(({ id, unlockedAt }) => { if (id && !state.unlockedAchievementIds.includes(id)) { state.unlockedAchievementIds.push(id); state.achievementUnlockedAt[id] = unlockedAt; } });
    },
    saveLearningPreferences: (state, action: PayloadAction<Partial<Pick<LearningProgressState, 'onboardingCompleted' | 'experienceLevel' | 'learningGoal' | 'dailyStudyMinutes' | 'preferredLanguageKeys'>>>) => {
      const value = action.payload;
      if (typeof value.onboardingCompleted === 'boolean') state.onboardingCompleted = value.onboardingCompleted;
      if (value.experienceLevel) state.experienceLevel = value.experienceLevel;
      if (typeof value.learningGoal === 'string') state.learningGoal = value.learningGoal;
      if (typeof value.dailyStudyMinutes === 'number' && [10, 20, 30, 45, 60].includes(value.dailyStudyMinutes)) state.dailyStudyMinutes = value.dailyStudyMinutes;
      if (value.preferredLanguageKeys) state.preferredLanguageKeys = uniqueIds(value.preferredLanguageKeys).slice(0, 2);
    },
    recordCodeExerciseAttempt: (state, action: PayloadAction<{ exerciseId: string; completed?: boolean }>) => {
      if (!action.payload.exerciseId) return;
      const id = action.payload.exerciseId;
      const previous = state.codeAttemptStatsByExerciseId[id] ?? { attempts: 0, correct: 0, incorrect: 0 };
      state.codeAttemptStatsByExerciseId[id] = { attempts: previous.attempts + 1, correct: previous.correct + (action.payload.completed ? 1 : 0), incorrect: previous.incorrect + (action.payload.completed ? 0 : 1), lastAttemptedAt: new Date().toISOString() };
    },
    completeCodeExercise: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      if (!id || state.completedExerciseIds.includes(id)) return;
      state.completedExerciseIds.push(id);
      if (!state.rewardedExerciseIds.includes(id)) { state.rewardedExerciseIds.push(id); awardXp(state, 5); maybeAwardDailyGoalBonus(state); }
      recordLearningDay(state);
    },
    saveCertificateDisplayName: (state, action: PayloadAction<string>) => { const name = action.payload.trim().slice(0, 80); state.certificateDisplayName = name || 'Learner'; },
    issueCertificate: (state, action: PayloadAction<{ trackKey: string; issuedAt: string; certificateId: string }>) => { const { trackKey, issuedAt, certificateId } = action.payload; if (trackKey && !state.certificatesByTrack[trackKey]) state.certificatesByTrack[trackKey] = { issuedAt, certificateId, displayName: state.certificateDisplayName }; },
    toggleTopicBookmarked: (state, action: PayloadAction<string>) => {
      const topicId = action.payload;
      if (!topicId) return;
      if (state.bookmarkedTopicIds.includes(topicId)) {
        state.bookmarkedTopicIds = state.bookmarkedTopicIds.filter((id) => id !== topicId);
      } else {
        state.bookmarkedTopicIds.push(topicId);
      }
    },
    saveTopicNote: (state, action: PayloadAction<{ topicId: string; note: string }>) => {
      const { topicId, note } = action.payload;
      if (!topicId) return;
      const trimmedNote = note.trim().slice(0, 4000);
      if (trimmedNote) state.notesByTopicId[topicId] = trimmedNote;
      else delete state.notesByTopicId[topicId];
    },
    toggleTopicReview: (state, action: PayloadAction<string>) => {
      const topicId = action.payload;
      if (!topicId) return;
      if (state.reviewTopicIds.includes(topicId)) {
        state.reviewTopicIds = state.reviewTopicIds.filter((id) => id !== topicId);
      } else {
        state.reviewTopicIds.push(topicId);
      }
    },
    markTopicReviewed: (state, action: PayloadAction<string>) => {
      const topicId = action.payload;
      if (!topicId) return;
      const wasQueued = state.reviewTopicIds.includes(topicId);
      state.reviewTopicIds = state.reviewTopicIds.filter((id) => id !== topicId);
      state.lastReviewedAtByTopicId[topicId] = new Date().toISOString();
      state.reviewCountByTopicId[topicId] = (state.reviewCountByTopicId[topicId] ?? 0) + 1;
      if (wasQueued) { awardXp(state, 5); maybeAwardDailyGoalBonus(state); }
      recordLearningDay(state);
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
      if (!state.awardedLessonXpTopicIds.includes(topicId)) { state.awardedLessonXpTopicIds.push(topicId); awardXp(state, 20); maybeAwardDailyGoalBonus(state); }
      state.completedAtByTopicId[topicId] = new Date().toISOString();
      if (!state.reviewTopicIds.includes(topicId)) state.reviewTopicIds.push(topicId);
      recordLearningDay(state);
    },
  },
});

export const {
  hydrateLearningProgress,
  markQuizPassed,
  recordQuizAttempt,
  recordPracticeAttempt,
  recordFlashcardReview,
  completePracticeSession,
  setDailyGoal,
  unlockAchievements,
  saveLearningPreferences,
  recordCodeExerciseAttempt,
  completeCodeExercise,
  saveCertificateDisplayName,
  issueCertificate,
  toggleTopicBookmarked,
  saveTopicNote,
  toggleTopicReview,
  markTopicReviewed,
  markTopicOpened,
  markTopicStarted,
  toggleTopicCompleted,
} = learningProgressSlice.actions;

export const learningProgressReducer = learningProgressSlice.reducer;
