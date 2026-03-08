import React from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import { LEARNING_ROADMAPS, TopicItem } from '../../data/learningRoadmaps';

type LanguageKey = 'html' | 'css' | 'javascript';

type Props = {
  navigation: any;
  languageKey: LanguageKey;
};

const LanguageMainScreen: React.FC<Props> = ({ navigation, languageKey }) => {
  const roadmap = LEARNING_ROADMAPS[languageKey];
  const scrollY = React.useRef(new Animated.Value(0)).current;

  const openTopic = (topic: TopicItem) => {
    navigation.navigate('LearningTopicDetail', {
      languageTitle: roadmap.title,
      languageColor: roadmap.color,
      topic,
    });
  };

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
          <View style={[styles.heroIcon, { backgroundColor: `${roadmap.color}26` }]}>
            <Icon name={roadmap.icon} size={24} color={roadmap.color} />
          </View>
          <Text style={styles.heroTitle}>{roadmap.title}</Text>
          <Text style={styles.heroSubtitle}>{roadmap.subtitle}</Text>
          <Text style={[styles.heroMeta, { color: roadmap.color }]}>
            {roadmap.topics.length} Modules Available
          </Text>
        </Animated.View>

        <Text style={styles.sectionTitle}>Learning Modules</Text>

        {roadmap.topics.map((topic, index) => (
          <TouchableOpacity
            key={topic.id}
            style={styles.topicCard}
            activeOpacity={0.9}
            onPress={() => openTopic(topic)}
          >
            <LinearGradient colors={['rgba(12,20,42,0.72)', 'rgba(12,20,42,0.48)']} style={styles.topicCardInner}>
              <View style={[styles.indexPill, { backgroundColor: `${roadmap.color}24` }]}>
                <Text style={[styles.indexText, { color: roadmap.color }]}>{index + 1}</Text>
              </View>
              <View style={styles.topicInfo}>
                <Text style={styles.topicTitle}>{topic.title}</Text>
                <Text style={styles.topicSummary}>{topic.summary}</Text>
                <Text style={[styles.meta, { color: roadmap.color }]}>
                  {topic.level} | {topic.duration}
                </Text>
              </View>
              <Icon name="chevron-forward" size={18} color="#C9DAEE" />
            </LinearGradient>
          </TouchableOpacity>
        ))}
      </Animated.ScrollView>
    </LinearGradient>
  );
};

export default LanguageMainScreen;

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 16, paddingBottom: 24 },
  heroCard: {
    borderRadius: 18,
    padding: 16,
    marginBottom: 14,
    backgroundColor: 'rgba(12, 20, 42, 0.56)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.18)',
  },
  heroIcon: {
    width: 46,
    height: 46,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#F2F8FF',
  },
  heroSubtitle: {
    marginTop: 4,
    marginBottom: 8,
    fontSize: 13,
    color: '#D0DDEE',
  },
  heroMeta: {
    fontSize: 12,
    fontWeight: '700',
  },
  sectionTitle: {
    marginBottom: 10,
    fontSize: 18,
    fontWeight: '700',
    color: '#EEF5FF',
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
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  indexText: {
    fontWeight: '700',
    fontSize: 13,
  },
  topicInfo: { flex: 1 },
  topicTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#F2F8FF',
  },
  topicSummary: {
    marginTop: 2,
    fontSize: 12,
    color: '#C9DAEE',
  },
  meta: {
    marginTop: 4,
    fontSize: 12,
    fontWeight: '700',
  },
});
