import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTheme } from '../../context/ThemeContext';
import { LEARNING_ROADMAPS, TopicItem } from '../../data/learningRoadmaps';

const CssMainScreen = ({ navigation }: any) => {
  const { colors } = useTheme();
  const roadmap = LEARNING_ROADMAPS.css;

  const openTopic = (topic: TopicItem) => {
    navigation.navigate('LearningTopicDetail', {
      languageTitle: roadmap.title,
      languageColor: roadmap.color,
      topic,
    });
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <Text style={[styles.title, { color: colors.textPrimary || '#111827' }]}>{roadmap.title}</Text>
      <Text style={[styles.subtitle, { color: colors.textSecondary || '#4B5563' }]}>
        {roadmap.subtitle}
      </Text>

      {roadmap.topics.map((topic, index) => (
        <TouchableOpacity
          key={topic.id}
          style={[styles.topicCard, { backgroundColor: colors.card }]}
          activeOpacity={0.9}
          onPress={() => openTopic(topic)}
        >
          <View style={[styles.indexPill, { backgroundColor: `${roadmap.color}22` }]}>
            <Text style={[styles.indexText, { color: roadmap.color }]}>{index + 1}</Text>
          </View>
          <View style={styles.topicInfo}>
            <Text style={[styles.topicTitle, { color: colors.textPrimary || '#111827' }]}>
              {topic.title}
            </Text>
            <Text style={[styles.topicSummary, { color: colors.textSecondary || '#4B5563' }]}>
              {topic.summary}
            </Text>
            <Text style={[styles.meta, { color: roadmap.color }]}>
              {topic.level} • {topic.duration}
            </Text>
          </View>
          <Icon name="chevron-forward" size={18} color={colors.textSecondary || '#6B7280'} />
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default CssMainScreen;

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 16, paddingBottom: 24 },
  title: { fontSize: 26, fontWeight: '800' },
  subtitle: { marginTop: 4, marginBottom: 14, fontSize: 13 },
  topicCard: {
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  indexPill: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  indexText: { fontWeight: '700' },
  topicInfo: { flex: 1 },
  topicTitle: { fontSize: 15, fontWeight: '700' },
  topicSummary: { fontSize: 12, marginTop: 2 },
  meta: { fontSize: 12, marginTop: 4, fontWeight: '600' },
});



