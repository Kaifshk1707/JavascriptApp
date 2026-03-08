import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const LearningTopicDetailScreen = ({ route }: any) => {
  const { topic, languageTitle, languageColor } = route.params || {};

  if (!topic) {
    return (
      <LinearGradient colors={['#0F1022', '#243B55', '#D35D6E']} style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Topic not found.</Text>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient colors={['#0F1022', '#243B55', '#D35D6E']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.heroCard}>
          <Text style={[styles.languageBadge, { color: languageColor || '#8ECBFF' }]}>{languageTitle}</Text>
          <Text style={styles.title}>{topic.title}</Text>
          <Text style={styles.summary}>{topic.summary}</Text>
          <Text style={[styles.meta, { color: languageColor || '#8ECBFF' }]}>
            {topic.level} | {topic.duration}
          </Text>
        </View>

        <Text style={styles.pointsHeading}>Learning Points</Text>

        {topic.points.map((point: string, index: number) => (
          <View key={`${topic.id}-${index}`} style={styles.pointCard}>
            <View style={[styles.pointBullet, { backgroundColor: languageColor || '#8ECBFF' }]} />
            <Text style={styles.pointText}>{point}</Text>
          </View>
        ))}
      </ScrollView>
    </LinearGradient>
  );
};

export default LearningTopicDetailScreen;

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 16, paddingBottom: 28 },
  emptyContainer: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  emptyText: { fontSize: 16, fontWeight: '600', color: '#F2F8FF' },
  languageBadge: {
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  heroCard: {
    borderRadius: 18,
    padding: 16,
    marginBottom: 14,
    backgroundColor: 'rgba(12, 20, 42, 0.56)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.18)',
  },
  title: { fontSize: 24, fontWeight: '800', color: '#F2F8FF' },
  summary: { marginTop: 6, fontSize: 13, lineHeight: 20, color: '#D0DDEE' },
  meta: { marginTop: 8, fontSize: 12, fontWeight: '700' },
  pointsHeading: { marginBottom: 10, fontSize: 16, fontWeight: '700', color: '#EEF5FF' },
  pointCard: {
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: 'rgba(12,20,42,0.62)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.18)',
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
    color: '#D0DDEE',
  },
});




