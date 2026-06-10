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
  LEARNING_ROADMAPS,
  LanguageKey,
} from '../../data/learningRoadmaps';
import { useLearningProgress } from '../../context/LearningProgressContext';

const formatScore = (score: number) => String(score).padStart(2, '0');

const HomeScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const scrollY = React.useRef(new Animated.Value(0)).current;
  const { getLanguageStats } = useLearningProgress();

  const featuredTracks = React.useMemo(
    () =>
      FEATURED_LANGUAGE_KEYS.map((key) => {
        const roadmap = LEARNING_ROADMAPS[key];
        const stats = getLanguageStats(key);

        return {
          ...roadmap,
          stats,
        };
      }),
    [getLanguageStats],
  );

  const expandedTracks = React.useMemo(
    () =>
      EXPANDED_LANGUAGE_KEYS.map((key) => {
        const roadmap = LEARNING_ROADMAPS[key];
        const stats = getLanguageStats(key);

        return {
          ...roadmap,
          stats,
        };
      }),
    [getLanguageStats],
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
          </LinearGradient>
        </Animated.View>

        <Text style={styles.sectionTitle}>Browse Languages</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.languageTabs}
        >
          {LANGUAGE_ORDER.map((languageKey) => {
            const roadmap = LEARNING_ROADMAPS[languageKey];
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
                    Started {item.stats.startedTopics}/{item.stats.totalTopics}
                  </Text>
                  <Text style={styles.trackMeta}>
                    Done {item.stats.completedTopics}
                  </Text>
                  <Text style={styles.trackMeta}>
                    Left {item.stats.remainingScore}
                  </Text>
                </View>

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
          {expandedTracks.map((item) => (
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
                  {item.stats.completedTopics}/{item.stats.totalTopics}{' '}
                  completed
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </View>

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
