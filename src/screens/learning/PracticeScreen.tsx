import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import { getLanguageByKey } from '../../content/languageCatalog';
import { getPracticeCandidates, getTopicMetadata, getTopicMetadataByGlobalId, IndexedTopicMetadata } from '../../content/topicIndex';
import { getPracticeQuestionsForTopic } from '../../content/practiceContent';
import { QuizItem } from '../../content/types';
import { useLearningProgress } from '../../context/LearningProgressContext';

type Mode = 'quick' | 'review' | 'weak' | 'bookmarked' | 'completed' | 'code';
type Question = QuizItem & { topicId: string; languageKey: IndexedTopicMetadata['languageKey'] };
const MODES: Array<[Mode, string]> = [['quick', 'Quick Practice'], ['review', 'Review Due'], ['weak', 'Weak Topics'], ['bookmarked', 'Saved Topics'], ['completed', 'Random Completed'], ['code', 'Code Practice']];

const shuffle = <T,>(items: T[]) => [...items].sort(() => Math.random() - 0.5);

const PracticeScreen: React.FC<{ navigation: any; route?: any }> = ({ navigation, route }) => {
  const progress = useLearningProgress();
  const [mode, setMode] = React.useState<Mode>('quick');
  const [questions, setQuestions] = React.useState<Question[]>([]);
  const [questionIndex, setQuestionIndex] = React.useState(0);
  const [selected, setSelected] = React.useState<string>();
  const [correctCount, setCorrectCount] = React.useState(0);
  const [mistakes, setMistakes] = React.useState<Question[]>([]);
  const [started, setStarted] = React.useState(false);
  const directTopic = route?.params?.languageKey && route?.params?.topicId ? getTopicMetadata(route.params.languageKey, route.params.topicId) : undefined;

  const reviewIds = React.useMemo(() => new Set(progress.reviewTopicIds), [progress.reviewTopicIds]);
  const weakIds = React.useMemo(() => new Set(progress.getWeakTopicIds()), [progress.getWeakTopicIds]);
  const bookmarkedIds = React.useMemo(() => new Set(progress.bookmarkedTopicIds), [progress.bookmarkedTopicIds]);
  const completedIds = React.useMemo(() => new Set(progress.completedTopicIds), [progress.completedTopicIds]);
  const startedIds = React.useMemo(() => new Set(progress.startedTopicIds), [progress.startedTopicIds]);

  const candidates = React.useMemo(() => {
    const ids = mode === 'review' ? reviewIds : mode === 'weak' ? weakIds : mode === 'bookmarked' ? bookmarkedIds : mode === 'completed' ? completedIds : undefined;
    const base = directTopic ? [directTopic] : getPracticeCandidates(ids);
    const filtered = mode === 'code' ? base.filter((item) => item.hasCodeExercise) : base;
    return directTopic || mode !== 'quick' ? filtered : filtered.filter((item) => startedIds.has(item.id) || !completedIds.has(item.id));
  }, [mode, reviewIds, weakIds, bookmarkedIds, completedIds, startedIds, directTopic]);

  const startSession = () => {
    if (mode === 'code' && candidates[0]) { navigation.navigate('CodePlayground', { languageKey: candidates[0].languageKey, topicId: candidates[0].id }); return; }
    const selectedTopics = shuffle(candidates).slice(0, 5);
    const nextQuestions = shuffle(selectedTopics.flatMap((item) => getPracticeQuestionsForTopic(item.languageKey, item.id).slice(0, 1).map((quiz) => ({ ...quiz, topicId: item.id, languageKey: item.languageKey }))));
    setQuestions(nextQuestions); setQuestionIndex(0); setSelected(undefined); setCorrectCount(0); setMistakes([]); setStarted(true);
  };
  const current = questions[questionIndex];
  const answer = (value: string) => {
    if (selected || !current) return;
    const correct = value === current.answer;
    setSelected(value);
    progress.recordPracticeAttempt(current.topicId, correct);
    if (correct) setCorrectCount((count) => count + 1);
    else setMistakes((items) => [...items, current]);
  };
  const next = () => {
    if (questionIndex + 1 >= questions.length) { progress.completePracticeSession(); setQuestionIndex(questions.length); return; }
    setQuestionIndex((index) => index + 1); setSelected(undefined);
  };
  if (started && !questions.length) {
    return <LinearGradient colors={['#0F1022', '#243B55', '#D35D6E']} style={styles.container}><View style={styles.empty}><Text style={styles.emptyTitle}>No practice questions yet</Text><Text style={styles.emptyText}>Complete a lesson, save a topic, or answer a lesson quiz first.</Text><TouchableOpacity style={styles.primary} onPress={() => setStarted(false)}><Text style={styles.primaryText}>Choose another mode</Text></TouchableOpacity></View></LinearGradient>;
  }
  if (started && current) {
    const answeredCorrectly = selected === current.answer;
    return <LinearGradient colors={['#0F1022', '#243B55', '#D35D6D']} style={styles.container}><View style={styles.content}><Text style={styles.progress}>Question {questionIndex + 1} of {questions.length}</Text><Text style={styles.topicLabel}>{getLanguageByKey(current.languageKey)?.shortTitle}  |  {getTopicMetadataByGlobalId(current.topicId)?.title}</Text><Text style={styles.question}>{current.question}</Text>{(current.options ?? [current.answer]).map((option) => <TouchableOpacity key={option} disabled={Boolean(selected)} style={[styles.option, selected === option && (answeredCorrectly ? styles.correct : styles.incorrect)]} onPress={() => answer(option)}><Text style={styles.optionText}>{option}</Text></TouchableOpacity>)}{selected ? <><Text style={answeredCorrectly ? styles.feedbackGood : styles.feedbackBad}>{answeredCorrectly ? 'Correct' : 'Not quite'}</Text><Text style={styles.explanation}>{current.explanation || current.answer}</Text><TouchableOpacity style={styles.primary} onPress={next}>{questionIndex + 1 === questions.length ? <Text style={styles.primaryText}>Finish Practice</Text> : <Text style={styles.primaryText}>Next Question</Text>}</TouchableOpacity></> : null}</View></LinearGradient>;
  }
  if (started && questionIndex >= questions.length && questions.length > 0) {
    const score = Math.round((correctCount / questions.length) * 100);
    return <LinearGradient colors={['#0F1022', '#243B55', '#D35D6D']} style={styles.container}><View style={styles.content}><Text style={styles.heading}>Practice complete</Text><Text style={styles.score}>{correctCount} / {questions.length} correct</Text><Text style={styles.scorePercent}>{score}%</Text>{mistakes.length ? <><Text style={styles.sectionTitle}>Review mistakes</Text>{mistakes.map((mistake) => <TouchableOpacity key={mistake.topicId} style={styles.mistake} onPress={() => navigation.navigate('LearningTopicDetail', { languageKey: mistake.languageKey, topicId: mistake.topicId })}><Text style={styles.mistakeTitle}>{getTopicMetadataByGlobalId(mistake.topicId)?.title}</Text><Text style={styles.mistakeText}>{mistake.explanation || mistake.answer}</Text></TouchableOpacity>)}</> : <Text style={styles.feedbackGood}>Great recall. No mistakes to review.</Text>}<TouchableOpacity style={styles.primary} onPress={() => { setStarted(false); setQuestionIndex(0); }}><Text style={styles.primaryText}>Practice Again</Text></TouchableOpacity><TouchableOpacity style={styles.secondary} onPress={() => navigation.goBack()}><Text style={styles.primaryText}>Back</Text></TouchableOpacity></View></LinearGradient>;
  }
  return <LinearGradient colors={['#0F1022', '#243B55', '#D35D6E']} style={styles.container}><View style={styles.content}><Text style={styles.heading}>Practice Mode</Text><Text style={styles.subheading}>Active recall from your offline lesson quizzes.</Text><View style={styles.modes}>{MODES.map(([key, label]) => <TouchableOpacity key={key} style={[styles.mode, mode === key && styles.modeActive]} onPress={() => setMode(key)}><Text style={styles.modeText}>{label}</Text></TouchableOpacity>)}</View><Text style={styles.count}>{candidates.length} eligible topics</Text><TouchableOpacity style={styles.primary} onPress={startSession}><Icon name="play" size={17} color="#FFFFFF" /><Text style={styles.primaryText}>Start {mode === 'quick' ? '5-Question' : labelFor(mode)} Practice</Text></TouchableOpacity><TouchableOpacity style={styles.secondary} onPress={() => navigation.navigate('FlashcardScreen')}><Icon name="layers-outline" size={17} color="#FFFFFF" /><Text style={styles.primaryText}>Flashcards</Text></TouchableOpacity></View></LinearGradient>;
};
const labelFor = (mode: Mode) => MODES.find(([key]) => key === mode)?.[1] ?? 'Practice';
const styles = StyleSheet.create({ container: { flex: 1 }, content: { padding: 18 }, heading: { color: '#F2F8FF', fontSize: 24, fontWeight: '800', marginTop: 12 }, subheading: { color: '#C9DAEE', marginTop: 6, fontSize: 13 }, modes: { marginTop: 24 }, mode: { padding: 13, marginBottom: 9, borderRadius: 13, backgroundColor: 'rgba(12,20,42,0.6)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.16)' }, modeActive: { borderColor: '#8ECBFF', backgroundColor: 'rgba(142,203,255,0.16)' }, modeText: { color: '#F2F8FF', fontWeight: '700' }, count: { marginTop: 12, color: '#BFD2E8', fontSize: 12 }, primary: { minHeight: 44, marginTop: 20, borderRadius: 13, backgroundColor: 'rgba(255,255,255,0.16)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.24)', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 14 }, primaryText: { color: '#FFFFFF', fontWeight: '800', marginLeft: 7 }, secondary: { minHeight: 44, marginTop: 10, borderRadius: 13, backgroundColor: 'rgba(12,20,42,0.5)', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }, progress: { color: '#8ECBFF', fontWeight: '800', marginTop: 12 }, topicLabel: { color: '#BFD2E8', marginTop: 18, fontSize: 12 }, question: { color: '#F2F8FF', fontSize: 22, lineHeight: 30, fontWeight: '800', marginTop: 10, marginBottom: 20 }, option: { padding: 14, marginBottom: 10, borderRadius: 13, backgroundColor: 'rgba(12,20,42,0.62)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.16)' }, optionText: { color: '#F2F8FF', lineHeight: 20 }, correct: { borderColor: '#7BD88F', backgroundColor: 'rgba(123,216,143,0.2)' }, incorrect: { borderColor: '#FF9A9A', backgroundColor: 'rgba(255,154,154,0.2)' }, feedbackGood: { color: '#9BE7A7', fontWeight: '800', marginTop: 4 }, feedbackBad: { color: '#FFB4B4', fontWeight: '800', marginTop: 4 }, explanation: { color: '#D6E4F4', lineHeight: 20, marginTop: 8 }, sectionTitle: { marginTop: 24, marginBottom: 10, color: '#EEF5FF', fontSize: 16, fontWeight: '700' }, score: { marginTop: 28, color: '#F2F8FF', fontSize: 23, fontWeight: '800' }, scorePercent: { marginTop: 6, color: '#8ECBFF', fontSize: 34, fontWeight: '900' }, mistake: { padding: 12, marginBottom: 8, borderRadius: 12, backgroundColor: 'rgba(12,20,42,0.6)' }, mistakeTitle: { color: '#F2F8FF', fontWeight: '800' }, mistakeText: { color: '#C9DAEE', marginTop: 5, lineHeight: 18 }, empty: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 }, emptyTitle: { color: '#F2F8FF', fontSize: 19, fontWeight: '800', textAlign: 'center' }, emptyText: { color: '#C9DAEE', marginTop: 8, textAlign: 'center', lineHeight: 20 } });
export default PracticeScreen;
