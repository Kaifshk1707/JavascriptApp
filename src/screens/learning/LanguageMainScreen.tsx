import React from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  LEVEL_FILTERS,
  getLanguageRoadmap,
  LanguageKey,
  TopicItem,
  TopicMetadata,
  TopicLevel,
} from '../../content';
import { useLearningProgress } from '../../context/LearningProgressContext';

type Props = {
  navigation: any;
  route?: any;
  languageKey?: LanguageKey;
};

const formatScore = (score: number) => String(score).padStart(2, '0');

const LanguageMainScreen: React.FC<Props> = ({ navigation, route, languageKey }) => {
  const resolvedLanguageKey = (languageKey || route?.params?.languageKey || 'html') as LanguageKey;
  const roadmap = getLanguageRoadmap(resolvedLanguageKey);
  const scrollY = React.useRef(new Animated.Value(0)).current;
  const { getLanguageStats, getRecommendedTopic, getTrackCompletion, isTopicCompleted, isTopicStarted } =
    useLearningProgress();
  const [selectedLevel, setSelectedLevel] = React.useState<TopicLevel | 'All'>('All');
  const stats = getLanguageStats(resolvedLanguageKey);
  const completion = getTrackCompletion(resolvedLanguageKey);
  const recommendedTopic = getRecommendedTopic(resolvedLanguageKey);

  const openTopic = (topic: TopicItem | TopicMetadata) => {
    navigation.navigate('LearningTopicDetail', {
      languageKey: resolvedLanguageKey,
      topicId: topic.id,
    });
  };

  if (!roadmap) {
    return (
      <LinearGradient colors={['#0F1022', '#243B55', '#D35D6E']} style={styles.container}>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Language not found.</Text>
        </View>
      </LinearGradient>
    );
  }

  const filteredSections = React.useMemo(
    () =>
      roadmap.sections
        .map((section) => ({
          ...section,
          topics:
            selectedLevel === 'All'
              ? section.topics
              : section.topics.filter((topic) => topic.level === selectedLevel),
        }))
        .filter((section) => section.topics.length > 0),
    [roadmap.sections, selectedLevel],
  );

  const heroTranslateY = scrollY.interpolate({
    inputRange: [0, 120],
    outputRange: [0, -20],
    extrapolate: 'clamp',
  });
  const heroOpacity = scrollY.interpolate({
    inputRange: [0, 110],
    outputRange: [1, 0.62],
    extrapolate: 'clamp',
  });

  return (
    <LinearGradient colors={['#0F1022', '#243B55', '#D35D6E']} style={styles.container}>
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
            styles.heroCard,
            { opacity: heroOpacity, transform: [{ translateY: heroTranslateY }] },
          ]}
        >
          <View style={styles.heroHeader}>
            <View style={[styles.heroIcon, { backgroundColor: `${roadmap.color}26` }]}>
              <Icon name={roadmap.icon} size={24} color={roadmap.color} />
            </View>
            <View style={styles.scoreWrap}>
              <Text style={styles.scoreValue}>{formatScore(stats.startedScore)}/100</Text>
              <Text style={styles.scoreLabel}>Learning Score</Text>
            </View>
          </View>

          <Text style={styles.heroTitle}>{roadmap.title}</Text>
          <Text style={styles.heroSubtitle}>{roadmap.description}</Text>

          <View style={styles.heroMetaRow}>
            <View style={styles.heroMetaCard}>
              <Text style={[styles.heroMetaValue, { color: roadmap.color }]}>
                {stats.completedTopics}/{stats.totalTopics}
              </Text>
              <Text style={styles.heroMetaLabel}>Completed</Text>
            </View>
            <View style={styles.heroMetaCard}>
              <Text style={[styles.heroMetaValue, { color: roadmap.color }]}>{roadmap.totalHours}</Text>
              <Text style={styles.heroMetaLabel}>Duration</Text>
            </View>
            <View style={styles.heroMetaCard}>
              <Text style={[styles.heroMetaValue, { color: roadmap.color }]}>{stats.remainingScore}</Text>
              <Text style={styles.heroMetaLabel}>Remaining</Text>
            </View>
          </View>

          <View style={styles.levelProgressRow}>
            {(['Beginner', 'Intermediate', 'Advanced'] as TopicLevel[]).map((level) => {
              const levelStat = stats.levelStats[level];

              return (
                <View key={level} style={styles.levelProgressItem}>
                  <Text style={[styles.levelProgressValue, { color: roadmap.color }]}>
                    {levelStat.completed}/{levelStat.total}
                  </Text>
                  <Text style={styles.levelProgressLabel}>{level}</Text>
                </View>
              );
            })}
          </View>

          <View style={styles.completionSummary} accessibilityLabel={`${completion.state}, ${completion.percent}% track progress`}>
            <View style={styles.completionSummaryTop}>
              <Text style={styles.completionState}>{completion.state}</Text>
              <Text style={styles.completionPercent}>{completion.percent}%</Text>
            </View>
            <View style={styles.completionBar}><View style={[styles.completionFill, { width: `${completion.percent}%`, backgroundColor: roadmap.color }]} /></View>
          </View>

          {recommendedTopic ? (
            <TouchableOpacity
              style={styles.resumeButton}
              activeOpacity={0.9}
              onPress={() => openTopic(recommendedTopic)}
            >
              <View style={styles.resumeTextWrap}>
                <Text style={styles.resumeLabel}>
                  {stats.startedTopics === 0 ? 'Start Here' : 'Recommended Next'}
                </Text>
                <Text style={styles.resumeTitle}>{recommendedTopic.title}</Text>
              </View>
              <Icon name="arrow-forward" size={17} color="#FFFFFF" />
            </TouchableOpacity>
          ) : (
            <View style={styles.resumeButton}>
              <View style={styles.resumeTextWrap}>
                <Text style={styles.resumeLabel}>Roadmap Complete</Text>
                <Text style={styles.resumeTitle}>All lessons are marked complete.</Text>
              </View>
              <Icon name="checkmark-circle" size={17} color="#FFFFFF" />
            </View>
          )}

          <View style={styles.focusWrap}>
            {roadmap.focusAreas.map((focus) => (
              <View key={focus} style={styles.focusChip}>
                <Text style={styles.focusChipText}>{focus}</Text>
              </View>
            ))}
          </View>

          <Text style={styles.projectText}>{roadmap.recommendedProject}</Text>
        </Animated.View>

        <Text style={styles.sectionTitle}>Learning Sections</Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.levelTabs}
        >
          {LEVEL_FILTERS.map((level) => {
            const active = selectedLevel === level;

            return (
              <TouchableOpacity
                key={level}
                style={[
                  styles.levelTab,
                  active && { borderColor: roadmap.color, backgroundColor: `${roadmap.color}22` },
                ]}
                activeOpacity={0.86}
                onPress={() => setSelectedLevel(level)}
              >
                <Text style={[styles.levelTabText, active && { color: roadmap.color }]}>
                  {level === 'Beginner' ? 'Basic' : level}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {filteredSections.length === 0 ? (
          <View style={styles.emptyLevelCard}>
            <Text style={styles.emptyLevelText}>No topics for this level yet.</Text>
          </View>
        ) : null}

        {filteredSections.map((section) => {
          const sectionCompleted = section.topics.filter((topic) => isTopicCompleted(topic.id)).length;

          return (
            <View key={section.id} style={styles.sectionCard}>
              <View style={styles.sectionHeader}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.sectionCardTitle}>{section.title}</Text>
                  <Text style={styles.sectionCardSubtitle}>{section.subtitle}</Text>
                </View>
                <View style={styles.sectionPill}>
                  <Text style={styles.sectionPillText}>
                    {sectionCompleted}/{section.topics.length}
                  </Text>
                </View>
              </View>

              {section.topics.map((topic, index) => {
                const started = isTopicStarted(topic.id);
                const completed = isTopicCompleted(topic.id);
                const recommended = recommendedTopic?.id === topic.id;

                return (
                  <TouchableOpacity
                    key={topic.id}
                    style={styles.topicCard}
                    activeOpacity={0.92}
                    onPress={() => openTopic(topic)}
                  >
                    <LinearGradient
                      colors={['rgba(12,20,42,0.74)', 'rgba(12,20,42,0.48)']}
                      style={styles.topicCardInner}
                    >
                      <View style={[styles.indexPill, { backgroundColor: `${roadmap.color}24` }]}>
                        <Text style={[styles.indexText, { color: roadmap.color }]}>
                          {index + 1}
                        </Text>
                      </View>

                      <View style={styles.topicInfo}>
                        <View style={styles.topicTitleRow}>
                          <Text style={styles.topicTitle}>{topic.title}</Text>
                          {completed ? (
                            <View style={[styles.stateBadge, styles.completedBadge]}>
                              <Text style={styles.stateBadgeText}>Done</Text>
                            </View>
                          ) : started ? (
                            <View style={[styles.stateBadge, styles.startedBadge]}>
                              <Text style={styles.stateBadgeText}>Started</Text>
                            </View>
                          ) : null}
                        </View>
                        <Text style={styles.topicSummary}>{topic.summary}</Text>
                        <Text style={[styles.meta, { color: roadmap.color }]}>
                          {topic.level === 'Beginner' ? 'Basic' : topic.level} | {topic.duration}
                        </Text>
                        {recommended ? (
                          <Text style={[styles.recommendedText, { color: roadmap.color }]}>
                            {stats.startedTopics === 0 ? 'Start here' : 'Recommended next'}
                          </Text>
                        ) : null}
                        <Text style={styles.docMeta}>
                          Theory {topic.theory.length} | Practical {topic.practical.steps.length} | Quiz{' '}
                          {topic.quiz.length}
                        </Text>
                      </View>
                      <Icon name="chevron-forward" size={18} color="#C9DAEE" />
                    </LinearGradient>
                  </TouchableOpacity>
                );
              })}
            </View>
          );
        })}
      </Animated.ScrollView>
    </LinearGradient>
  );
};

export default LanguageMainScreen;

const styles = StyleSheet.create({
  container: { flex: 1 },
  emptyContainer: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  emptyText: { fontSize: 16, fontWeight: '600', color: '#F2F8FF' },
  content: { padding: 16, paddingBottom: 28 },
  heroCard: {
    borderRadius: 20,
    padding: 16,
    marginBottom: 14,
    backgroundColor: 'rgba(12, 20, 42, 0.56)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.18)',
  },
  heroHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  heroIcon: {
    width: 50,
    height: 50,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scoreWrap: {
    alignItems: 'flex-end',
  },
  scoreValue: {
    color: '#F2F8FF',
    fontSize: 15,
    fontWeight: '800',
  },
  scoreLabel: {
    color: '#C9DAEE',
    fontSize: 11,
    marginTop: 2,
  },
  heroTitle: {
    marginTop: 12,
    fontSize: 24,
    fontWeight: '800',
    color: '#F2F8FF',
  },
  heroSubtitle: {
    marginTop: 6,
    fontSize: 13,
    lineHeight: 20,
    color: '#D0DDEE',
  },
  heroMetaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 14,
  },
  heroMetaCard: {
    width: '31%',
    borderRadius: 14,
    paddingVertical: 11,
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
  },
  heroMetaValue: {
    fontSize: 15,
    fontWeight: '800',
  },
  heroMetaLabel: {
    marginTop: 3,
    color: '#C9DAEE',
    fontSize: 11,
  },
  levelProgressRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  levelProgressItem: {
    width: '31%',
    borderRadius: 12,
    paddingVertical: 9,
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.07)',
  },
  levelProgressValue: {
    fontSize: 13,
    fontWeight: '800',
  },
  levelProgressLabel: {
    marginTop: 2,
    color: '#C9DAEE',
    fontSize: 10,
    fontWeight: '700',
  },
  completionSummary: {
    marginTop: 12,
    padding: 11,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.07)',
  },
  completionSummaryTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  completionState: {
    color: '#F2F8FF',
    fontSize: 12,
    fontWeight: '800',
  },
  completionPercent: {
    color: '#FFD27A',
    fontSize: 12,
    fontWeight: '800',
  },
  completionBar: {
    height: 5,
    marginTop: 8,
    borderRadius: 3,
    overflow: 'hidden',
    backgroundColor: 'rgba(255,255,255,0.12)',
  },
  completionFill: {
    height: '100%',
    borderRadius: 3,
  },
  resumeButton: {
    marginTop: 12,
    borderRadius: 14,
    paddingHorizontal: 13,
    paddingVertical: 12,
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.16)',
    flexDirection: 'row',
    alignItems: 'center',
  },
  resumeTextWrap: {
    flex: 1,
    paddingRight: 10,
  },
  resumeLabel: {
    color: '#B9CBDF',
    fontSize: 10,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  resumeTitle: {
    marginTop: 3,
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
  focusWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 14,
  },
  focusChip: {
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.08)',
    marginRight: 8,
    marginBottom: 8,
  },
  focusChipText: {
    color: '#EEF5FF',
    fontSize: 11,
    fontWeight: '600',
  },
  projectText: {
    marginTop: 6,
    color: '#B9CBDF',
    fontSize: 12,
    lineHeight: 18,
  },
  sectionTitle: {
    marginBottom: 10,
    fontSize: 18,
    fontWeight: '700',
    color: '#EEF5FF',
  },
  levelTabs: {
    paddingBottom: 8,
    marginBottom: 8,
  },
  levelTab: {
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.14)',
  },
  levelTabText: {
    color: '#DDE9F7',
    fontSize: 11,
    fontWeight: '700',
  },
  emptyLevelCard: {
    borderRadius: 14,
    padding: 14,
    backgroundColor: 'rgba(12,20,42,0.5)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.14)',
  },
  emptyLevelText: {
    color: '#C9DAEE',
    fontSize: 13,
    fontWeight: '600',
  },
  sectionCard: {
    marginBottom: 14,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionCardTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#F2F8FF',
  },
  sectionCardSubtitle: {
    marginTop: 3,
    fontSize: 12,
    color: '#BFD2E8',
  },
  sectionPill: {
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  sectionPillText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },
  topicCard: {
    borderRadius: 14,
    overflow: 'hidden',
    marginBottom: 10,
  },
  topicCardInner: {
    borderRadius: 14,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.18)',
  },
  indexPill: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  indexText: {
    fontWeight: '700',
    fontSize: 13,
  },
  topicInfo: { flex: 1, paddingRight: 10 },
  topicTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  topicTitle: {
    flex: 1,
    fontSize: 15,
    fontWeight: '700',
    color: '#F2F8FF',
    marginRight: 8,
  },
  topicSummary: {
    marginTop: 2,
    fontSize: 12,
    lineHeight: 18,
    color: '#C9DAEE',
  },
  meta: {
    marginTop: 4,
    fontSize: 12,
    fontWeight: '700',
  },
  docMeta: {
    marginTop: 4,
    fontSize: 11,
    color: '#9DB2C8',
  },
  recommendedText: {
    marginTop: 3,
    fontSize: 11,
    fontWeight: '800',
  },
  stateBadge: {
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  startedBadge: {
    backgroundColor: 'rgba(245, 158, 11, 0.18)',
  },
  completedBadge: {
    backgroundColor: 'rgba(16, 185, 129, 0.18)',
  },
  stateBadgeText: {
    color: '#F8FAFC',
    fontSize: 10,
    fontWeight: '700',
  },
});
