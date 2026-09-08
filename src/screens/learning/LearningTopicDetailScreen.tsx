import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import { useLearningProgress } from '../../context/LearningProgressContext';
import { getLanguageByKey } from '../../content/languageCatalog';
import {
  getNextTopic,
  getPreviousTopic,
  getTopicById,
  LanguageKey,
  TopicItem,
  CodeExercise,
} from '../../content';

const LearningTopicDetailScreen = ({ navigation, route }: any) => {
  const { languageKey, topicId, topic: legacyTopic } = route.params || {};
  const resolvedLanguageKey = languageKey as LanguageKey | undefined;
  const topic =
    resolvedLanguageKey && topicId
      ? getTopicById(resolvedLanguageKey, topicId)
      : legacyTopic;
  const language = resolvedLanguageKey ? getLanguageByKey(resolvedLanguageKey) : undefined;
  const languageTitle = language?.shortTitle || route.params?.languageTitle;
  const languageColor = language?.color || route.params?.languageColor;
  const [selectedAnswers, setSelectedAnswers] = React.useState<Record<number, string>>({});
  const [revealedAnswers, setRevealedAnswers] = React.useState<Record<number, boolean>>({});
  const [noteEditorVisible, setNoteEditorVisible] = React.useState(false);
  const [noteDraft, setNoteDraft] = React.useState('');
  const {
    markQuizPassed,
    markTopicOpened,
    markTopicStarted,
    toggleTopicCompleted,
    isQuizPassed,
    isTopicCompleted,
    isTopicStarted,
    bookmarkedTopicIds,
    notesByTopicId,
    reviewTopicIds,
    toggleTopicBookmarked,
    saveTopicNote,
    toggleTopicReview,
    markTopicReviewed,
    recordQuizAttempt,
    quizStatsByTopicId,
    completedExerciseIds,
  } = useLearningProgress();

  React.useEffect(() => {
    if (resolvedLanguageKey && topic?.id) {
      markTopicOpened(resolvedLanguageKey, topic.id);
      return;
    }

    if (topic?.id) {
      markTopicStarted(topic.id);
    }
  }, [markTopicOpened, markTopicStarted, resolvedLanguageKey, topic?.id]);

  if (!topic) {
    return (
      <LinearGradient colors={['#0F1022', '#243B55', '#D35D6E']} style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Topic not found.</Text>
      </LinearGradient>
    );
  }

  const completed = isTopicCompleted(topic.id);
  const started = isTopicStarted(topic.id);
  const quizPassed = isQuizPassed(topic.id);
  const bookmarked = bookmarkedTopicIds.includes(topic.id);
  const reviewLater = reviewTopicIds.includes(topic.id);
  const previousTopic = React.useMemo(
    () => resolvedLanguageKey && topic.id
      ? getPreviousTopic(resolvedLanguageKey, topic.id)
      : undefined,
    [resolvedLanguageKey, topic.id],
  );
  const nextTopic = React.useMemo(
    () => resolvedLanguageKey && topic.id
      ? getNextTopic(resolvedLanguageKey, topic.id)
      : undefined,
    [resolvedLanguageKey, topic.id],
  );
  const prerequisiteTopics = React.useMemo(
    () => (topic.prerequisites ?? [])
      .map((prerequisiteId: string) =>
        resolvedLanguageKey ? getTopicById(resolvedLanguageKey, prerequisiteId) : undefined,
      )
      .filter(Boolean) as TopicItem[],
    [resolvedLanguageKey, topic.prerequisites],
  );

  const toggleAnswer = (index: number) => {
    setRevealedAnswers((previous) => ({
      ...previous,
      [index]: !previous[index],
    }));
  };

  const openTopic = (nextTopicToOpen?: TopicItem) => {
    if (!resolvedLanguageKey || !nextTopicToOpen) {
      return;
    }

    setSelectedAnswers({});
    setRevealedAnswers({});
    navigation.navigate('LearningTopicDetail', {
      languageKey: resolvedLanguageKey,
      topicId: nextTopicToOpen.id,
    });
  };

  const selectQuizAnswer = (index: number, answer: string, correctAnswer: string) => {
    setSelectedAnswers((previous) => ({
      ...previous,
      [index]: answer,
    }));

    if (answer === correctAnswer) {
      markQuizPassed(topic.id);
    }
    recordQuizAttempt(topic.id, answer === correctAnswer);
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
          {quizStatsByTopicId[topic.id]?.attempts ? <Text style={styles.attemptMeta}>Quiz attempts: {quizStatsByTopicId[topic.id].attempts}</Text> : null}

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
            <View
              style={[
                styles.statePill,
                quizPassed ? styles.completedPill : styles.pendingPill,
              ]}
            >
              <Text style={styles.stateText}>{quizPassed ? 'Quiz Passed' : 'Quiz Open'}</Text>
            </View>
          </View>

          {prerequisiteTopics.length > 0 ? (
            <View style={styles.prerequisiteCard}>
              <Text style={styles.prerequisiteTitle}>Recommended before this lesson</Text>
              {prerequisiteTopics.map((prerequisite) => (
                <Text key={prerequisite.id} style={styles.prerequisiteText}>
                  {prerequisite.title}
                </Text>
              ))}
            </View>
          ) : null}

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
            accessibilityRole="button"
            accessibilityLabel={completed ? 'Mark topic incomplete' : 'Mark topic complete'}
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
          <View style={styles.toolRow}>
            <TouchableOpacity style={styles.toolButton} accessibilityRole="button" accessibilityLabel={bookmarked ? 'Remove saved lesson' : 'Save lesson'} onPress={() => toggleTopicBookmarked(topic.id)}>
              <Icon name={bookmarked ? 'bookmark' : 'bookmark-outline'} size={17} color="#FFFFFF" />
              <Text style={styles.toolText}>{bookmarked ? 'Saved' : 'Save Lesson'}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.toolButton} accessibilityRole="button" accessibilityLabel={reviewLater ? 'Remove review later flag' : 'Review lesson later'} onPress={() => toggleTopicReview(topic.id)}>
              <Icon name={reviewLater ? 'refresh' : 'refresh-outline'} size={17} color="#FFFFFF" />
              <Text style={styles.toolText}>{reviewLater ? 'In Review' : 'Review Later'}</Text>
            </TouchableOpacity>
            {completed ? (
              <TouchableOpacity style={styles.toolButton} accessibilityRole="button" accessibilityLabel="Mark lesson reviewed" onPress={() => markTopicReviewed(topic.id)}>
                <Icon name="checkmark-done-outline" size={17} color="#FFFFFF" />
                <Text style={styles.toolText}>Reviewed</Text>
              </TouchableOpacity>
            ) : null}
            <TouchableOpacity style={styles.toolButton} accessibilityRole="button" accessibilityLabel="Practice this topic" onPress={() => navigation.navigate('PracticeScreen', { languageKey: resolvedLanguageKey, topicId: topic.id })}>
              <Icon name="play-outline" size={17} color="#FFFFFF" />
              <Text style={styles.toolText}>Practice</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.noteCard}>
          <View style={styles.noteHeader}>
            <Text style={styles.sectionTitle}>My Notes</Text>
            <TouchableOpacity onPress={() => { setNoteDraft(notesByTopicId[topic.id] ?? ''); setNoteEditorVisible(true); }}>
              <Text style={styles.noteAction}>{notesByTopicId[topic.id] ? 'Edit' : 'Add Note'}</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.noteText}>{notesByTopicId[topic.id] || 'Add a private note for this lesson.'}</Text>
        </View>

        <Text style={styles.pathLabel}>Learn</Text>
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

        <Text style={styles.pathLabel}>Try It</Text>
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

        {topic.codeExercises?.length ? (
          <View style={styles.codePracticeCard}>
            <Text style={styles.pathLabel}>Code Practice</Text>
            <Text style={styles.sectionTitle}>Code Exercises</Text>
            <Text style={styles.blockText}>Edit and run these offline {topic.codeExercises[0].language} exercises in a local preview.</Text>
            {topic.codeExercises.slice().sort((left: CodeExercise, right: CodeExercise) => (left.order ?? 0) - (right.order ?? 0)).map((exercise: CodeExercise) => {
              const isComplete = completedExerciseIds.includes(exercise.id);
              return <TouchableOpacity key={exercise.id} style={styles.exerciseRow} accessibilityRole="button" accessibilityLabel={`${exercise.title}, ${isComplete ? 'completed' : 'not completed'}`} onPress={() => navigation.navigate('CodePlayground', { languageKey: resolvedLanguageKey, topicId: topic.id, exerciseId: exercise.id })}><Icon name={isComplete ? 'checkmark-circle' : 'ellipse-outline'} size={17} color={isComplete ? '#9BE7A7' : '#C9DAEE'} /><View style={styles.exerciseBody}><Text style={styles.exerciseTitle}>{exercise.order ?? 1}. {exercise.title}</Text><Text style={styles.exerciseMeta}>{exercise.difficulty ?? topic.level} | {isComplete ? 'Completed' : 'Open'}</Text></View><Icon name="chevron-forward" size={16} color="#C9DAEE" /></TouchableOpacity>;
            })}
          </View>
        ) : null}

        <Text style={styles.pathLabel}>Challenge</Text>
        <Text style={styles.sectionTitle}>Practice Challenge</Text>
        {topic.challenge.map((item: string, index: number) => (
          <View key={`${topic.id}-challenge-${index}`} style={styles.pointCard}>
            <Icon name="flash-outline" size={16} color={languageColor || '#8ECBFF'} />
            <Text style={styles.challengeText}>{item}</Text>
          </View>
        ))}

        <Text style={styles.pathLabel}>Quiz</Text>
        <Text style={styles.sectionTitle}>Quick Quiz</Text>
        {topic.quiz.map((quizItem: any, index: number) => {
          const fallbackOption = 'A different concept from this lesson.';
          const fallbackOptions =
            topic.id.length % 2 === 0
              ? [fallbackOption, quizItem.answer]
              : [quizItem.answer, fallbackOption];
          const options = quizItem.options?.length
            ? quizItem.options
            : fallbackOptions;
          const selectedAnswer = selectedAnswers[index];
          const answered = Boolean(selectedAnswer);
          const correct = selectedAnswer === quizItem.answer;
          const isVisible = revealedAnswers[index];
          return (
            <View
              key={`${topic.id}-quiz-${index}`}
              style={styles.quizCard}
            >
              <Text style={styles.quizQuestion}>
                Q{index + 1}. {quizItem.question}
              </Text>
              {options.map((option: string) => {
                const selected = selectedAnswer === option;

                return (
                  <TouchableOpacity
                    key={option}
                    style={[
                      styles.quizOption,
                      selected && (correct ? styles.quizCorrect : styles.quizIncorrect),
                    ]}
                    activeOpacity={0.86}
                    accessibilityRole="button"
                    accessibilityState={{ selected }}
                    accessibilityLabel={`Answer option: ${option}${selected ? ', selected' : ''}`}
                    onPress={() => selectQuizAnswer(index, option, quizItem.answer)}
                  >
                    <Text style={styles.quizOptionText}>{option}</Text>
                  </TouchableOpacity>
                );
              })}
              {answered ? (
                <Text style={correct ? styles.quizFeedbackCorrect : styles.quizFeedbackIncorrect}>
                  {correct ? 'Correct. Quiz passed.' : 'Not quite. Try again.'}
                </Text>
              ) : null}
              {answered || isVisible ? (
                <Text style={styles.quizAnswer}>
                  {quizItem.explanation || quizItem.answer}
                </Text>
              ) : (
                <TouchableOpacity activeOpacity={0.86} onPress={() => toggleAnswer(index)}>
                  <Text style={styles.quizAction}>Show explanation</Text>
                </TouchableOpacity>
              )}
            </View>
          );
        })}

        <Text style={styles.sectionTitle}>References</Text>
        {topic.references.map((reference: string, index: number) => (
          <View key={`${topic.id}-reference-${index}`} style={styles.referenceCard}>
            <Icon name="bookmark-outline" size={16} color={languageColor || '#8ECBFF'} />
            <Text style={styles.referenceText}>{reference}</Text>
          </View>
        ))}

        <View style={styles.lessonNavRow}>
          <TouchableOpacity
            style={[styles.lessonNavButton, !previousTopic && styles.disabledNavButton]}
            activeOpacity={0.86}
            disabled={!previousTopic}
            onPress={() => openTopic(previousTopic)}
          >
            <Icon name="chevron-back" size={16} color="#FFFFFF" />
            <Text style={styles.lessonNavText}>Previous</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.lessonNavButton, !nextTopic && styles.disabledNavButton]}
            activeOpacity={0.86}
            disabled={!nextTopic}
            onPress={() => openTopic(nextTopic)}
          >
            <Text style={styles.lessonNavText}>
              {completed ? 'Continue' : 'Next Lesson'}
            </Text>
            <Icon name="chevron-forward" size={16} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Modal visible={noteEditorVisible} transparent animationType="slide" onRequestClose={() => setNoteEditorVisible(false)}>
        <View style={styles.modalBackdrop}>
          <View style={styles.noteModal}>
            <Text style={styles.modalTitle}>My Notes</Text>
            <TextInput value={noteDraft} onChangeText={setNoteDraft} multiline autoFocus placeholder="Write a private note" placeholderTextColor="#8FA6C0" maxLength={4000} style={styles.noteInput} />
            <View style={styles.modalActions}>
              <TouchableOpacity onPress={() => setNoteEditorVisible(false)}><Text style={styles.modalCancel}>Cancel</Text></TouchableOpacity>
              {notesByTopicId[topic.id] ? <TouchableOpacity onPress={() => { saveTopicNote(topic.id, ''); setNoteEditorVisible(false); }}><Text style={styles.deleteNote}>Delete</Text></TouchableOpacity> : null}
              <TouchableOpacity onPress={() => { saveTopicNote(topic.id, noteDraft); setNoteEditorVisible(false); }}><Text style={styles.saveNote}>Save</Text></TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </LinearGradient>
  );
};

export default LearningTopicDetailScreen;

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 16, paddingBottom: 28 },
  emptyContainer: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  emptyText: { fontSize: 16, fontWeight: '600', color: '#F2F8FF' },
  attemptMeta: { marginTop: 5, color: '#A8BED7', fontSize: 11, fontWeight: '600' },
  toolRow: { flexDirection: 'row', gap: 8, marginTop: 10 },
  codePracticeCard: { marginBottom: 16, padding: 14, borderRadius: 16, backgroundColor: 'rgba(12,20,42,0.58)', borderWidth: 1, borderColor: 'rgba(142,203,255,0.28)' },
  exerciseRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10, borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.1)' },
  exerciseBody: { flex: 1, marginLeft: 9 },
  exerciseTitle: { color: '#F2F8FF', fontWeight: '700' },
  exerciseMeta: { color: '#BFD2E8', fontSize: 10, marginTop: 3 },
  toolButton: { flex: 1, minHeight: 42, borderRadius: 12, borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)', backgroundColor: 'rgba(255,255,255,0.1)', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
  toolText: { color: '#FFFFFF', fontSize: 12, fontWeight: '700', marginLeft: 6 },
  noteCard: { marginBottom: 16, padding: 14, borderRadius: 16, backgroundColor: 'rgba(12,20,42,0.58)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.16)' },
  noteHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  noteAction: { color: '#8ECBFF', fontSize: 12, fontWeight: '800' },
  noteText: { color: '#C9DAEE', fontSize: 13, lineHeight: 19 },
  modalBackdrop: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.58)' },
  noteModal: { padding: 18, paddingBottom: 28, borderTopLeftRadius: 20, borderTopRightRadius: 20, backgroundColor: '#17243B' },
  modalTitle: { color: '#F2F8FF', fontSize: 18, fontWeight: '800', marginBottom: 12 },
  noteInput: { minHeight: 150, maxHeight: 280, padding: 12, borderRadius: 12, color: '#F2F8FF', backgroundColor: 'rgba(255,255,255,0.09)', textAlignVertical: 'top', borderWidth: 1, borderColor: 'rgba(255,255,255,0.18)' },
  modalActions: { flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', gap: 20, marginTop: 14 },
  modalCancel: { color: '#C9DAEE', fontWeight: '700' }, deleteNote: { color: '#FFB4B4', fontWeight: '700' }, saveNote: { color: '#8ECBFF', fontWeight: '800' },
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
    flexWrap: 'wrap',
    marginTop: 14,
  },
  statePill: {
    marginRight: 8,
    borderRadius: 14,
    paddingHorizontal: 10,
    paddingVertical: 7,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  prerequisiteCard: {
    marginTop: 12,
    borderRadius: 14,
    padding: 12,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.14)',
  },
  prerequisiteTitle: {
    color: '#B9CBDF',
    fontSize: 11,
    fontWeight: '800',
    textTransform: 'uppercase',
    marginBottom: 6,
  },
  prerequisiteText: {
    color: '#E8F2FF',
    fontSize: 12,
    lineHeight: 18,
    fontWeight: '600',
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
  pathLabel: {
    marginTop: 6,
    marginBottom: 4,
    color: '#8ECBFF',
    fontSize: 11,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
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
  quizOption: {
    marginTop: 10,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.14)',
  },
  quizCorrect: {
    backgroundColor: 'rgba(16,185,129,0.18)',
    borderColor: 'rgba(16,185,129,0.38)',
  },
  quizIncorrect: {
    backgroundColor: 'rgba(239,68,68,0.16)',
    borderColor: 'rgba(239,68,68,0.34)',
  },
  quizOptionText: {
    color: '#E8F2FF',
    fontSize: 12,
    lineHeight: 18,
    fontWeight: '600',
  },
  quizFeedbackCorrect: {
    marginTop: 10,
    color: '#6EE7B7',
    fontSize: 12,
    fontWeight: '800',
  },
  quizFeedbackIncorrect: {
    marginTop: 10,
    color: '#FCA5A5',
    fontSize: 12,
    fontWeight: '800',
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
  lessonNavRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  lessonNavButton: {
    width: '48%',
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 12,
    backgroundColor: 'rgba(255,255,255,0.14)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.18)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabledNavButton: {
    opacity: 0.42,
  },
  lessonNavText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
    marginHorizontal: 6,
  },
});
