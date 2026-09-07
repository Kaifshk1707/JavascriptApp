import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  EXPANDED_LANGUAGE_KEYS,
  FEATURED_LANGUAGE_KEYS,
  LANGUAGE_ORDER,
  LANGUAGE_CATEGORIES,
  LanguageCategory,
  LanguageKey,
  getLanguageByKey,
} from '../../content/languageCatalog';
import { useLearningProgress } from '../../context/LearningProgressContext';

const formatScore = (score: number) => String(score).padStart(2, '0');

const HomeScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const scrollY = React.useRef(new Animated.Value(0)).current;
  const { getLanguageStats, getResumeTopic, getLearningStreak, getRecentlyLearnedTopics, totalXp, getLevelInfo, getDailyGoalProgress, learningGoal, onboardingCompleted, dailyStudyMinutes, certificatesByTrack } = useLearningProgress();
  const streak = getLearningStreak();
  const level = getLevelInfo();
  const dailyGoal = getDailyGoalProgress();
  const recentlyLearned = getRecentlyLearnedTopics();
  const [selectedCategory, setSelectedCategory] = React.useState<LanguageCategory | 'All'>('All');

  const featuredTracks = React.useMemo(
    () =>
      FEATURED_LANGUAGE_KEYS.map((key) => {
        const roadmap = getLanguageByKey(key)!;
        const stats = getLanguageStats(key);
        const resumeTopic = getResumeTopic(key);

        return {
          ...roadmap,
          stats,
          resumeTopic,
        };
      }),
    [getLanguageStats, getResumeTopic],
  );

  const expandedTracks = React.useMemo(
    () =>
      EXPANDED_LANGUAGE_KEYS.map((key) => {
        const roadmap = getLanguageByKey(key)!;
        const stats = getLanguageStats(key);
        const resumeTopic = getResumeTopic(key);

        return {
          ...roadmap,
          stats,
          resumeTopic,
        };
      }),
    [getLanguageStats, getResumeTopic],
  );
  const visibleLanguageKeys = React.useMemo(
    () => LANGUAGE_ORDER.filter((key) => selectedCategory === 'All' || getLanguageByKey(key)?.category === selectedCategory),
    [selectedCategory],
  );
  const visibleExpandedTracks = React.useMemo(
    () => expandedTracks.filter((item) => selectedCategory === 'All' || item.category === selectedCategory),
    [expandedTracks, selectedCategory],
  );

  const totalStartedScore = Math.round(
    featuredTracks.reduce((sum, item) => sum + item.stats.startedScore, 0) /
      featuredTracks.length,
  );
  const totalCompletedTopics = featuredTracks.reduce(
    (sum, item) => sum + item.stats.completedTopics,
    0,
  );
  const totalTopics = featuredTracks.reduce(
    (sum, item) => sum + item.stats.totalTopics,
    0,
  );

  const openLanguage = (languageKey: LanguageKey) => {
    navigation.navigate('LanguageMain', { languageKey });
  };

  const heroTranslateY = scrollY.interpolate({
    inputRange: [0, 140],
    outputRange: [0, -24],
    extrapolate: 'clamp',
  });
  const heroOpacity = scrollY.interpolate({
    inputRange: [0, 120],
    outputRange: [1, 0.58],
    extrapolate: 'clamp',
  });

  return (
    <LinearGradient
      colors={['#0F1022', '#243B55', '#D35D6E']}
      style={styles.container}
    >
      <Animated.ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true },
        )}
      >
        <Animated.View
          style={[
            styles.heroWrap,
            {
              transform: [{ translateY: heroTranslateY }],
              opacity: heroOpacity,
            },
          ]}
        >
          <LinearGradient
            colors={['rgba(255,255,255,0.18)', 'rgba(255,255,255,0.06)']}
            style={styles.heroCard}
          >
            <View style={styles.heroTopRow}>
              <View>
                <Text style={styles.heroEyebrow}>Offline Learning Hub</Text>
                <Text style={styles.heroTitle}>
                  HTML, CSS, JavaScript and More
                </Text>
              </View>
              {/* <View style={styles.heroBadge}>
                <Text style={styles.heroBadgeText}>
                  {formatScore(totalStartedScore)}/100
                </Text>
              </View> */}
            </View>

            <Text style={styles.heroSubtitle}>
              Theory, practical labs, quiz, references, aur topic-wise live
              progress ek hi dashboard me ready hai.
            </Text>

            <View style={styles.heroStatsRow}>
              <View style={styles.heroStatCard}>
                <Text style={styles.heroStatValue}>
                  {LANGUAGE_ORDER.length}
                </Text>
                <Text style={styles.heroStatLabel}>Languages</Text>
              </View>
              <View style={styles.heroStatCard}>
                <Text style={styles.heroStatValue}>
                  {String(totalCompletedTopics).padStart(2, '0')}/
                  {String(totalTopics).padStart(2, '0')}
                </Text>
                <Text style={styles.heroStatLabel}>Completed</Text>
              </View>
              <View style={styles.heroStatCard}>
                <Text style={styles.heroStatValue}>
                  {100 - totalStartedScore}
                </Text>
                <Text style={styles.heroStatLabel}>Remaining</Text>
              </View>
            </View>

            <TouchableOpacity
              style={styles.heroButton}
              activeOpacity={0.9}
              onPress={() => openLanguage('html')}
            >
              <Text style={styles.heroButtonText}>Start HTML Module</Text>
              <Icon name="arrow-forward" size={16} color="#FFFFFF" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.planButton} accessibilityRole="button" accessibilityLabel={learningGoal ? 'Open your learning plan' : 'Build your learning plan'} onPress={() => navigation.navigate(learningGoal ? 'LearningPlan' : 'Onboarding')}>
              <View style={styles.planBody}><Text style={styles.planEyebrow}>{learningGoal ? 'Your Plan' : 'Personalize Learning'}</Text><Text style={styles.planTitle}>{learningGoal ? `${learningGoal.replace(/-/g, ' ')}` : 'Build My Learning Plan'}</Text><Text style={styles.planMeta}>{learningGoal ? `Next step | ${dailyStudyMinutes} min/day` : onboardingCompleted ? 'Choose a goal to get started' : '3 quick choices, fully offline'}</Text></View><Icon name="arrow-forward" size={18} color="#FFFFFF" /></TouchableOpacity>
            <View style={styles.studyToolsRow}>
              <TouchableOpacity style={styles.studyTool} onPress={() => navigation.navigate('LearningSearch')}><Icon name="search" size={16} color="#FFFFFF" /><Text style={styles.studyToolText}>Search</Text></TouchableOpacity>
              <TouchableOpacity style={styles.studyTool} onPress={() => navigation.navigate('SavedLessons')}><Icon name="bookmark-outline" size={16} color="#FFFFFF" /><Text style={styles.studyToolText}>Saved</Text></TouchableOpacity>
              <TouchableOpacity style={styles.studyTool} onPress={() => navigation.navigate('ReviewScreen')}><Icon name="refresh-outline" size={16} color="#FFFFFF" /><Text style={styles.studyToolText}>Review</Text></TouchableOpacity>
              <TouchableOpacity style={styles.studyTool} onPress={() => navigation.navigate('PracticeScreen')}><Icon name="play-outline" size={16} color="#FFFFFF" /><Text style={styles.studyToolText}>Practice</Text></TouchableOpacity>
              <Text style={styles.streakText}>Streak {streak.current}d</Text>
            </View>
            <View style={styles.gamificationRow} accessibilityLabel={`Level ${level.level}, ${totalXp} XP, today ${dailyGoal.earned} of ${dailyGoal.goal ?? 0} XP, streak ${streak.current} days`}>
              <View style={styles.gamificationItem}><Text style={styles.gamificationValue}>Lv {level.level}</Text><Text style={styles.gamificationLabel}>{totalXp} XP</Text></View>
              <View style={styles.gamificationItem}><Text style={styles.gamificationValue}>{dailyGoal.goal === null ? 'No goal' : `${dailyGoal.earned}/${dailyGoal.goal}`}</Text><Text style={styles.gamificationLabel}>Today</Text></View>
              <TouchableOpacity style={styles.gamificationAction} accessibilityRole="button" accessibilityLabel="Open learning stats" onPress={() => navigation.navigate('LearningStatsScreen')}><Icon name="stats-chart-outline" size={17} color="#FFFFFF" /><Text style={styles.gamificationActionText}>Stats</Text></TouchableOpacity>
              <TouchableOpacity style={styles.gamificationAction} accessibilityRole="button" accessibilityLabel="Open achievements" onPress={() => navigation.navigate('AchievementsScreen')}><Icon name="trophy-outline" size={17} color="#FFFFFF" /><Text style={styles.gamificationActionText}>Awards</Text></TouchableOpacity>
              <TouchableOpacity style={styles.gamificationAction} accessibilityRole="button" accessibilityLabel="Open certificates" onPress={() => navigation.navigate('CertificatesScreen')}><Icon name="ribbon-outline" size={17} color="#FFFFFF" /><Text style={styles.gamificationActionText}>{Object.keys(certificatesByTrack).length} Certs</Text></TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.searchButton}
              activeOpacity={0.88}
              onPress={() => navigation.navigate('LearningSearch')}
              accessibilityLabel="Search learning content"
            >
              <Icon name="search" size={17} color="#FFFFFF" />
              <Text style={styles.searchButtonText}>Search lessons</Text>
            </TouchableOpacity>
          </LinearGradient>
        </Animated.View>

        <Text style={styles.sectionTitle}>Browse Languages</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.languageTabs}>
          {(['All', ...LANGUAGE_CATEGORIES] as const).map((category) => (
            <TouchableOpacity key={category} style={[styles.categoryChip, selectedCategory === category && styles.categoryChipActive]} onPress={() => setSelectedCategory(category)}>
              <Text style={styles.categoryChipText}>{category}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.languageTabs}
        >
          {visibleLanguageKeys.map((languageKey) => {
            const roadmap = getLanguageByKey(languageKey);

            if (!roadmap) {
              return null;
            }

            return (
              <TouchableOpacity
                key={languageKey}
                style={styles.languageChip}
                activeOpacity={0.88}
                onPress={() => openLanguage(languageKey)}
              >
                <Icon name={roadmap.icon} size={16} color={roadmap.color} />
                <Text style={styles.languageChipText}>
                  {roadmap.shortTitle.toUpperCase()}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        <Text style={styles.sectionTitle}>Core Learning Tracks</Text>
        {featuredTracks.map((item) => {
          const progressWidth =
            `${Math.max(item.stats.startedScore, 6)}%` as const;
          return (
            <TouchableOpacity
              key={item.key}
              style={styles.trackCardWrap}
              activeOpacity={0.92}
              onPress={() => openLanguage(item.key)}
            >
              <LinearGradient
                colors={['rgba(12,20,42,0.72)', 'rgba(12,20,42,0.46)']}
                style={styles.trackCard}
              >
                <View style={styles.trackHeaderRow}>
                  <View
                    style={[
                      styles.trackIconWrap,
                      { backgroundColor: `${item.color}22` },
                    ]}
                  >
                    <Icon name={item.icon} size={22} color={item.color} />
                  </View>
                  <View style={styles.trackTextWrap}>
                    <Text style={styles.trackTitle}>{item.shortTitle}</Text>
                    <Text style={styles.trackSubtitle}>{item.subtitle}</Text>
                  </View>
                  {/* <View style={styles.scorePill}>
                    <Text style={styles.scoreText}>
                      {formatScore(item.stats.startedScore)}/100
                    </Text>
                  </View> */}
                </View>

                <View style={styles.progressBarShell}>
                  <View
                    style={[
                      styles.progressBarFill,
                      { width: progressWidth, backgroundColor: item.color },
                    ]}
                  />
                </View>

                <View style={styles.trackMetaRow}>
                  <Text style={[styles.trackMeta, { color: item.color }]}>
                    {item.stats.completedScore}% complete
                  </Text>
                  <Text style={styles.trackMeta}>
                    Done {item.stats.completedTopics}
                  </Text>
                  <Text style={styles.trackMeta}>
                    Left {item.stats.remainingScore}
                  </Text>
                </View>

                {item.resumeTopic ? (
                  <Text style={styles.continueText}>
                    Continue: {item.resumeTopic.title}
                  </Text>
                ) : null}

                <View style={styles.focusWrap}>
                  {item.focusAreas.map((focus) => (
                    <View key={focus} style={styles.focusChip}>
                      <Text style={styles.focusChipText}>{focus}</Text>
                    </View>
                  ))}
                </View>

                <Text style={styles.cardFootnote}>
                  {item.recommendedProject}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          );
        })}

        <Text style={styles.sectionTitle}>More Languages</Text>
        <View style={styles.grid}>
          {visibleExpandedTracks.map((item) => (
            <TouchableOpacity
              key={item.key}
              style={styles.gridCardWrap}
              activeOpacity={0.9}
              onPress={() => openLanguage(item.key)}
            >
              <LinearGradient
                colors={['rgba(12,20,42,0.7)', 'rgba(12,20,42,0.5)']}
                style={styles.gridCard}
              >
                <View
                  style={[
                    styles.gridIconWrap,
                    { backgroundColor: `${item.color}24` },
                  ]}
                >
                  <Icon name={item.icon} size={20} color={item.color} />
                </View>
                <Text style={styles.gridTitle}>{item.shortTitle}</Text>
                <Text style={styles.gridSubtitle}>
                  {item.focusAreas.join(' | ')}
                </Text>
                <Text style={[styles.gridMeta, { color: item.color }]}>
                  {item.stats.completedScore}% complete
                </Text>
                {item.resumeTopic ? (
                  <Text style={styles.gridContinueText}>
                    Continue: {item.resumeTopic.title}
                  </Text>
                ) : null}
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </View>

        {recentlyLearned.length ? <>
          <Text style={styles.sectionTitle}>Recently Learned</Text>
          <View style={styles.recentList}>
            {recentlyLearned.map((topic) => <TouchableOpacity key={topic.id} style={styles.recentRow} onPress={() => navigation.navigate('LearningTopicDetail', { languageKey: topic.languageKey, topicId: topic.id })}><View style={styles.recentDot} /><View style={styles.recentBody}><Text style={styles.recentTitle}>{topic.title}</Text><Text style={styles.recentMeta}>{topic.languageName}  |  {topic.level}</Text></View><Icon name="chevron-forward" size={16} color="#C9DAEE" /></TouchableOpacity>)}
          </View>
        </> : null}

        <View style={styles.infoCard}>
          <View style={styles.infoHeader}>
            <Icon name="document-text-outline" size={18} color="#8ECBFF" />
            <Text style={styles.infoTitle}>Included In Every Module</Text>
          </View>
          <Text style={styles.infoText}>
            Theory notes, practical starter code, challenge checklist, quick
            quiz, references, aur live topic completion tracking.
          </Text>
        </View>
      </Animated.ScrollView>
    </LinearGradient>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 90,
  },
  heroWrap: {
    marginBottom: 18,
  },
  heroCard: {
    borderRadius: 24,
    padding: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.18)',
  },
  heroTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  heroEyebrow: {
    color: '#B9D8FF',
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  heroTitle: {
    marginTop: 4,
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800',
    maxWidth: '82%',
  },
  heroBadge: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.14)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  heroBadgeText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 10,
  },
  heroSubtitle: {
    color: '#E8F2FF',
    fontSize: 11,
    lineHeight: 20,
    marginTop: 12,
  },
  heroStatsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  heroStatCard: {
    width: '31%',
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 8,
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.09)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.14)',
  },
  heroStatValue: {
    color: '#F2F8FF',
    fontSize: 13,
    fontWeight: '800',
  },
  heroStatLabel: {
    marginTop: 3,
    color: '#BFD2E8',
    fontSize: 11,
  },
  heroButton: {
    marginTop: 16,
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 14,
    backgroundColor: 'rgba(255,255,255,0.16)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.22)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14,
    marginRight: 8,
  },
  searchButton: { marginTop: 9, borderRadius: 14, paddingVertical: 11, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255,255,255,0.1)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)' },
  searchButtonText: { color: '#FFFFFF', fontWeight: '700', fontSize: 13, marginLeft: 7 },
  planButton: { flexDirection: 'row', alignItems: 'center', marginTop: 10, padding: 12, borderRadius: 13, backgroundColor: 'rgba(255,255,255,0.12)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)' },
  planBody: { flex: 1 },
  planEyebrow: { color: '#FFD27A', fontSize: 10, fontWeight: '800', textTransform: 'uppercase' },
  planTitle: { color: '#FFFFFF', fontSize: 14, fontWeight: '800', marginTop: 3, textTransform: 'capitalize' },
  planMeta: { color: '#C9DAEE', fontSize: 11, marginTop: 3 },
  studyToolsRow: { flexDirection: 'row', alignItems: 'center', marginTop: 10, gap: 7 },
  studyTool: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 9, paddingVertical: 8, borderRadius: 11, backgroundColor: 'rgba(255,255,255,0.09)' },
  studyToolText: { color: '#FFFFFF', fontSize: 11, fontWeight: '700', marginLeft: 5 },
  streakText: { flex: 1, textAlign: 'right', color: '#FFD59A', fontSize: 11, fontWeight: '800' },
  gamificationRow: { flexDirection: 'row', alignItems: 'center', marginTop: 10, padding: 9, borderRadius: 13, backgroundColor: 'rgba(12,20,42,0.34)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.13)' },
  gamificationItem: { marginRight: 13 },
  gamificationValue: { color: '#FFFFFF', fontSize: 12, fontWeight: '800' },
  gamificationLabel: { color: '#BFD2E8', fontSize: 9, marginTop: 2 },
  gamificationAction: { marginLeft: 'auto', alignItems: 'center', paddingHorizontal: 5 },
  gamificationActionText: { color: '#FFFFFF', fontSize: 9, fontWeight: '700', marginTop: 2 },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#EEF5FF',
    marginBottom: 10,
  },
  languageTabs: {
    paddingBottom: 4,
    marginBottom: 14,
  },
  languageChip: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 18,
    paddingHorizontal: 12,
    paddingVertical: 9,
    marginRight: 8,
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.18)',
  },
  languageChipText: {
    color: '#E8F2FF',
    fontSize: 11,
    fontWeight: '700',
    marginLeft: 8,
  },
  categoryChip: { paddingHorizontal: 12, paddingVertical: 8, marginRight: 8, borderRadius: 16, backgroundColor: 'rgba(255,255,255,0.08)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.16)' },
  categoryChipActive: { backgroundColor: 'rgba(142,203,255,0.2)', borderColor: '#8ECBFF' },
  categoryChipText: { color: '#DCEBFA', fontSize: 11, fontWeight: '700' },
  trackCardWrap: {
    borderRadius: 18,
    overflow: 'hidden',
    marginBottom: 12,
  },
  trackCard: {
    borderRadius: 18,
    padding: 15,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.18)',
  },
  trackHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  trackIconWrap: {
    width: 46,
    height: 46,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  trackTextWrap: {
    flex: 1,
    paddingRight: 10,
  },
  trackTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#F2F8FF',
  },
  trackSubtitle: {
    marginTop: 2,
    fontSize: 11,
    color: '#C9DAEE',
  },
  scorePill: {
    borderRadius: 14,
    paddingHorizontal: 10,
    paddingVertical: 7,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  scoreText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },
  progressBarShell: {
    height: 10,
    borderRadius: 999,
    overflow: 'hidden',
    backgroundColor: 'rgba(255,255,255,0.08)',
    marginTop: 14,
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 999,
  },
  trackMetaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  trackMeta: {
    color: '#D0DDEE',
    fontSize: 11,
    fontWeight: '700',
  },
  focusWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 12,
  },
  focusChip: {
    borderRadius: 14,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  focusChipText: {
    color: '#E2ECFA',
    fontSize: 11,
    fontWeight: '600',
  },
  cardFootnote: {
    marginTop: 4,
    fontSize: 12,
    lineHeight: 18,
    color: '#AFBED2',
  },
  continueText: {
    marginTop: 8,
    color: '#E8F2FF',
    fontSize: 12,
    fontWeight: '700',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  gridCardWrap: {
    width: '48.5%',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 10,
  },
  gridCard: {
    borderRadius: 16,
    padding: 14,
    minHeight: 160,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.18)',
  },
  gridIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  gridTitle: {
    color: '#F3F8FF',
    fontSize: 15,
    fontWeight: '800',
  },
  gridSubtitle: {
    marginTop: 4,
    color: '#C9DAEE',
    fontSize: 12,
    lineHeight: 18,
  },
  gridMeta: {
    marginTop: 10,
    fontSize: 12,
    fontWeight: '700',
  },
  gridContinueText: {
    marginTop: 6,
    color: '#DDE9F7',
    fontSize: 11,
    lineHeight: 16,
    fontWeight: '600',
  },
  recentList: { marginBottom: 14 },
  recentRow: { flexDirection: 'row', alignItems: 'center', padding: 12, marginBottom: 7, borderRadius: 13, backgroundColor: 'rgba(12,20,42,0.54)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.14)' },
  recentDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#8ECBFF', marginRight: 10 },
  recentBody: { flex: 1 }, recentTitle: { color: '#F2F8FF', fontSize: 13, fontWeight: '700' }, recentMeta: { marginTop: 3, color: '#9FC7F1', fontSize: 10, fontWeight: '600' },
  infoCard: {
    marginTop: 6,
    borderRadius: 18,
    padding: 16,
    backgroundColor: 'rgba(12,20,42,0.58)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.18)',
  },
  infoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoTitle: {
    marginLeft: 8,
    color: '#F2F8FF',
    fontSize: 14,
    fontWeight: '700',
  },
  infoText: {
    color: '#D0DDEE',
    fontSize: 11,
    lineHeight: 19,
  },
});
