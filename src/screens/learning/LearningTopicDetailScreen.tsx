import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '../../context/ThemeContext';

const LearningTopicDetailScreen = ({ route }: any) => {
  const { colors } = useTheme();
  const { topic, languageTitle, languageColor } = route.params || {};

  if (!topic) {
    return (
      <View style={[styles.emptyContainer, { backgroundColor: colors.background }]}>
        <Text style={[styles.emptyText, { color: colors.textPrimary || '#111827' }]}>
          Topic not found.
        </Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <Text style={[styles.languageBadge, { color: languageColor || colors.primary }]}>
        {languageTitle}
      </Text>
      <Text style={[styles.title, { color: colors.textPrimary || '#111827' }]}>{topic.title}</Text>
      <Text style={[styles.summary, { color: colors.textSecondary || '#4B5563' }]}>
        {topic.summary}
      </Text>
      <Text style={[styles.meta, { color: languageColor || colors.primary }]}>
        {topic.level} | {topic.duration}
      </Text>

      <Text style={[styles.pointsHeading, { color: colors.textPrimary || '#111827' }]}>
        Learning Points
      </Text>

      {topic.points.map((point: string, index: number) => (
        <View key={`${topic.id}-${index}`} style={[styles.pointCard, { backgroundColor: colors.card }]}>
          <View style={[styles.pointBullet, { backgroundColor: languageColor || colors.primary }]} />
          <Text style={[styles.pointText, { color: colors.textSecondary || '#4B5563' }]}>{point}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

export default LearningTopicDetailScreen;

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 16, paddingBottom: 28 },
  emptyContainer: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  emptyText: { fontSize: 16, fontWeight: '600' },
  languageBadge: {
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  title: { fontSize: 24, fontWeight: '800' },
  summary: { marginTop: 6, fontSize: 13, lineHeight: 20 },
  meta: { marginTop: 8, fontSize: 12, fontWeight: '700' },
  pointsHeading: { marginTop: 20, marginBottom: 10, fontSize: 16, fontWeight: '700' },
  pointCard: {
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  pointBullet: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 10,
    marginTop: 6,
  },
  pointText: {
    flex: 1,
    fontSize: 13,
    lineHeight: 20,
  },
});




