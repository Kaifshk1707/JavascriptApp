import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import { useLearningProgress } from '../../context/LearningProgressContext';

const LearningTopicDetailScreen = ({ route }: any) => {
  const { topic, languageTitle, languageColor } = route.params || {};
  const [revealedAnswers, setRevealedAnswers] = React.useState<Record<number, boolean>>({});
  const { markTopicStarted, toggleTopicCompleted, isTopicCompleted, isTopicStarted } =
    useLearningProgress();

  React.useEffect(() => {
    if (topic?.id) {
      markTopicStarted(topic.id);
    }
  }, [markTopicStarted, topic?.id]);

  if (!topic) {
    return (
      <LinearGradient colors={['#0F1022', '#243B55', '#D35D6E']} style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Topic not found.</Text>
      </LinearGradient>
    );
  }

  const completed = isTopicCompleted(topic.id);
  const started = isTopicStarted(topic.id);

  const toggleAnswer = (index: number) => {
    setRevealedAnswers((previous) => ({
      ...previous,
      [index]: !previous[index],
    }));
  };

  return (
    <LinearGradient colors={['#0F1022', '#243B55', '#D35D6E']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.heroCard}>
          <Text style={[styles.languageBadge, { color: languageColor || '#8ECBFF' }]}>
            {languageTitle}
          </Text>
          <Text style={styles.title}>{topic.title}</Text>
          <Text style={styles.summary}>{topic.summary}</Text>
          <Text style={[styles.meta, { color: languageColor || '#8ECBFF' }]}>
            {topic.level} | {topic.duration}
          </Text>

          <View style={styles.stateRow}>
            <View style={styles.statePill}>
              <Text style={styles.stateText}>{started ? 'Started' : 'Not Started'}</Text>
            </View>
            <View
              style={[
                styles.statePill,
                completed ? styles.completedPill : styles.pendingPill,
              ]}
            >
              <Text style={styles.stateText}>{completed ? 'Completed' : 'Pending'}</Text>
            </View>
          </View>

          <TouchableOpacity
            style={[
              styles.completeButton,
              {
                backgroundColor: completed
                  ? 'rgba(16,185,129,0.2)'
                  : `${languageColor || '#8ECBFF'}33`,
                borderColor: completed ? 'rgba(16,185,129,0.35)' : `${languageColor || '#8ECBFF'}55`,
              },
            ]}
            activeOpacity={0.9}
            onPress={() => toggleTopicCompleted(topic.id)}
          >
            <Icon
              name={completed ? 'checkmark-circle' : 'checkmark-circle-outline'}
              size={18}
              color="#FFFFFF"
            />
            <Text style={styles.completeButtonText}>
              {completed ? 'Marked Complete' : 'Mark Topic Complete'}
            </Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>Learning Outcomes</Text>
        {topic.points.map((point: string, index: number) => (
          <View key={`${topic.id}-point-${index}`} style={styles.pointCard}>
            <View style={[styles.pointBullet, { backgroundColor: languageColor || '#8ECBFF' }]} />
            <Text style={styles.pointText}>{point}</Text>
          </View>
        ))}

        <Text style={styles.sectionTitle}>Theory Notes</Text>
        {topic.theory.map((item: string, index: number) => (
          <View key={`${topic.id}-theory-${index}`} style={styles.blockCard}>
            <Text style={styles.blockLabel}>Theory {index + 1}</Text>
            <Text style={styles.blockText}>{item}</Text>
          </View>
        ))}

        <Text style={styles.sectionTitle}>Practical Lab</Text>
        <View style={styles.blockCard}>
          <Text style={styles.labTitle}>{topic.practical.title}</Text>
          <Text style={styles.blockText}>{topic.practical.goal}</Text>

          <Text style={styles.innerHeading}>Steps</Text>
          {topic.practical.steps.map((step: string, index: number) => (
            <View key={`${topic.id}-step-${index}`} style={styles.inlineRow}>
              <View style={[styles.stepPill, { backgroundColor: `${languageColor || '#8ECBFF'}22` }]}>
                <Text style={[styles.stepText, { color: languageColor || '#8ECBFF' }]}>
                  {index + 1}
                </Text>
              </View>
              <Text style={styles.inlineText}>{step}</Text>
            </View>
          ))}

          <Text style={styles.innerHeading}>Starter Code</Text>
          <View style={styles.codeBlock}>
            <Text style={styles.codeText}>{topic.practical.starterCode}</Text>
          </View>

          <Text style={styles.innerHeading}>Expected Result</Text>
          {topic.practical.expectedResult.map((result: string, index: number) => (
            <View key={`${topic.id}-result-${index}`} style={styles.inlineRow}>
              <Icon name="checkmark-outline" size={16} color={languageColor || '#8ECBFF'} />
              <Text style={styles.inlineText}>{result}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Practice Challenge</Text>
        {topic.challenge.map((item: string, index: number) => (
          <View key={`${topic.id}-challenge-${index}`} style={styles.pointCard}>
            <Icon name="flash-outline" size={16} color={languageColor || '#8ECBFF'} />
            <Text style={styles.challengeText}>{item}</Text>
          </View>
        ))}

        <Text style={styles.sectionTitle}>Quick Quiz</Text>
        {topic.quiz.map((quizItem: any, index: number) => {
          const isVisible = revealedAnswers[index];
          return (
            <TouchableOpacity
              key={`${topic.id}-quiz-${index}`}
              style={styles.quizCard}
              activeOpacity={0.88}
              onPress={() => toggleAnswer(index)}
            >
              <Text style={styles.quizQuestion}>
                Q{index + 1}. {quizItem.question}
              </Text>
              <Text style={styles.quizAction}>{isVisible ? 'Hide Answer' : 'Tap To Reveal Answer'}</Text>
              {isVisible ? <Text style={styles.quizAnswer}>{quizItem.answer}</Text> : null}
            </TouchableOpacity>
          );
        })}

        <Text style={styles.sectionTitle}>References</Text>
        {topic.references.map((reference: string, index: number) => (
          <View key={`${topic.id}-reference-${index}`} style={styles.referenceCard}>
            <Icon name="bookmark-outline" size={16} color={languageColor || '#8ECBFF'} />
            <Text style={styles.referenceText}>{reference}</Text>
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
  heroCard: {
    borderRadius: 20,
    padding: 16,
    marginBottom: 14,
    backgroundColor: 'rgba(12, 20, 42, 0.56)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.18)',
  },
  languageBadge: {
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  title: { fontSize: 24, fontWeight: '800', color: '#F2F8FF' },
  summary: { marginTop: 6, fontSize: 13, lineHeight: 20, color: '#D0DDEE' },
  meta: { marginTop: 8, fontSize: 12, fontWeight: '700' },
  stateRow: {
    flexDirection: 'row',
    marginTop: 14,
  },
  statePill: {
    marginRight: 8,
    borderRadius: 14,
    paddingHorizontal: 10,
    paddingVertical: 7,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  completedPill: {
    backgroundColor: 'rgba(16,185,129,0.18)',
  },
  pendingPill: {
    backgroundColor: 'rgba(245,158,11,0.18)',
  },
  stateText: {
    color: '#F8FAFC',
    fontSize: 11,
    fontWeight: '700',
  },
  completeButton: {
    marginTop: 14,
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  completeButtonText: {
    marginLeft: 8,
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  sectionTitle: { marginBottom: 10, fontSize: 17, fontWeight: '700', color: '#EEF5FF' },
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
  challengeText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 13,
    lineHeight: 20,
    color: '#D0DDEE',
  },
  blockCard: {
    borderRadius: 16,
    padding: 14,
    marginBottom: 10,
    backgroundColor: 'rgba(12,20,42,0.62)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.18)',
  },
  blockLabel: {
    color: '#8ECBFF',
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    marginBottom: 6,
  },
  blockText: {
    color: '#D0DDEE',
    fontSize: 13,
    lineHeight: 20,
  },
  labTitle: {
    color: '#F2F8FF',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 6,
  },
  innerHeading: {
    marginTop: 12,
    marginBottom: 8,
    color: '#F2F8FF',
    fontSize: 14,
    fontWeight: '700',
  },
  inlineRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  stepPill: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  stepText: {
    fontSize: 11,
    fontWeight: '700',
  },
  inlineText: {
    flex: 1,
    color: '#D0DDEE',
    fontSize: 13,
    lineHeight: 20,
    marginLeft: 8,
  },
  codeBlock: {
    borderRadius: 14,
    padding: 12,
    backgroundColor: 'rgba(5,10,25,0.85)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  codeText: {
    color: '#D7E9FF',
    fontSize: 12,
    lineHeight: 18,
    fontFamily: 'monospace',
  },
  quizCard: {
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
    backgroundColor: 'rgba(12,20,42,0.62)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.18)',
  },
  quizQuestion: {
    color: '#F2F8FF',
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 20,
  },
  quizAction: {
    marginTop: 8,
    color: '#8ECBFF',
    fontSize: 12,
    fontWeight: '700',
  },
  quizAnswer: {
    marginTop: 8,
    color: '#D0DDEE',
    fontSize: 13,
    lineHeight: 20,
  },
  referenceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
    backgroundColor: 'rgba(12,20,42,0.62)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.18)',
  },
  referenceText: {
    marginLeft: 10,
    flex: 1,
    color: '#D0DDEE',
    fontSize: 13,
    lineHeight: 19,
  },
});
