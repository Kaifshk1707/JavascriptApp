export type LevelInfo = { level: number; currentLevelXp: number; nextLevelXp: number; progress: number; needed: number };

export const xpForLevel = (level: number) => level <= 1 ? 0 : 100 * (level - 1) * level / 2;

export const getLevelInfo = (totalXp: number): LevelInfo => {
  const xp = Math.max(0, Number.isFinite(totalXp) ? totalXp : 0);
  let level = 1;
  while (xp >= xpForLevel(level + 1)) level += 1;
  const currentLevelXp = xpForLevel(level);
  const nextLevelXp = xpForLevel(level + 1);
  const span = nextLevelXp - currentLevelXp;
  return { level, currentLevelXp, nextLevelXp, progress: span ? (xp - currentLevelXp) / span : 0, needed: Math.max(0, nextLevelXp - xp) };
};

export const localDateKey = (date = new Date()) => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

export const getDailyGoalProgress = (dailyXpByDate: Record<string, number>, goal: number | null, date = new Date()) => {
  const earned = dailyXpByDate[localDateKey(date)] ?? 0;
  return { earned, goal, complete: goal !== null && earned >= goal, progress: goal ? Math.min(1, earned / goal) : 0 };
};

export const getWeeklyXp = (dailyXpByDate: Record<string, number>, date = new Date()) => Array.from({ length: 7 }, (_, index) => {
  const day = new Date(date.getFullYear(), date.getMonth(), date.getDate() - (6 - index));
  return { date: localDateKey(day), xp: dailyXpByDate[localDateKey(day)] ?? 0 };
});

export const getStreakFromDates = (activityDates: string[], today = new Date()) => {
  const dates = new Set(activityDates);
  let current = 0;
  for (let offset = 0; dates.has(localDateKey(new Date(today.getFullYear(), today.getMonth(), today.getDate() - offset))); offset += 1) current += 1;
  const ordered = [...dates].sort();
  let longest = 0;
  let run = 0;
  ordered.forEach((date, index) => {
    const previous = index ? new Date(`${ordered[index - 1]}T00:00:00`) : undefined;
    const currentDate = new Date(`${date}T00:00:00`);
    run = previous && currentDate.getTime() - previous.getTime() === 86400000 ? run + 1 : 1;
    longest = Math.max(longest, run);
  });
  return { current, longest };
};
