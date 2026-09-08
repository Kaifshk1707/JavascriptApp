import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import { getLanguageByKey } from '../../content/languageCatalog';
import { getTopicMetadataByGlobalId, IndexedTopicMetadata } from '../../content/topicIndex';
import { useLearningProgress } from '../../context/LearningProgressContext';

const daysSince = (iso?: string) => iso ? Math.floor((Date.now() - new Date(iso).getTime()) / 86400000) : Number.POSITIVE_INFINITY;
const ReviewScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { reviewTopicIds, completedTopicIds, completedAtByTopicId, lastReviewedAtByTopicId, reviewCountByTopicId, markTopicReviewed } = useLearningProgress();
  const topics = React.useMemo(() => {
    const ids = new Set(reviewTopicIds);
    completedTopicIds.forEach((id) => {
      const count = reviewCountByTopicId[id] ?? 0;
      const interval = [1, 3, 7][Math.min(count, 2)];
      if (daysSince(lastReviewedAtByTopicId[id] || completedAtByTopicId[id]) >= interval) ids.add(id);
    });
    return Array.from(ids).map(getTopicMetadataByGlobalId).filter(Boolean) as IndexedTopicMetadata[];
  }, [reviewTopicIds, completedTopicIds, completedAtByTopicId, lastReviewedAtByTopicId, reviewCountByTopicId]);
  return <LinearGradient colors={['#0F1022', '#243B55', '#D35D6E']} style={styles.container}>
    <FlatList data={topics} keyExtractor={(item) => item.id} contentContainerStyle={topics.length ? styles.list : styles.empty} ListHeaderComponent={topics.length ? <Text style={styles.heading}>Review queue</Text> : null} ListEmptyComponent={<View><Text style={styles.emptyTitle}>Nothing to review</Text><Text style={styles.emptyText}>Complete a lesson or choose Review Later from a topic.</Text></View>} renderItem={({ item }) => { const language = getLanguageByKey(item.languageKey); return <View style={styles.row}><TouchableOpacity style={styles.open} accessibilityRole="button" accessibilityLabel={`${item.title}, review due`} onPress={() => navigation.navigate('LearningTopicDetail', { languageKey: item.languageKey, topicId: item.id })} activeOpacity={0.88}><View style={[styles.icon, { backgroundColor: `${language?.color ?? '#8ECBFF'}24` }]}><Icon name="refresh-outline" size={18} color={language?.color ?? '#8ECBFF'} /></View><View style={styles.body}><Text style={styles.title}>{item.title}</Text><Text style={styles.meta}>{language?.shortTitle ?? item.languageKey}  |  {item.level}  |  {item.duration}</Text></View></TouchableOpacity><TouchableOpacity style={styles.reviewButton} accessibilityRole="button" accessibilityLabel={`Mark ${item.title} reviewed`} onPress={() => markTopicReviewed(item.id)}><Text style={styles.reviewText}>Mark Reviewed</Text></TouchableOpacity></View>; }} />
  </LinearGradient>;
};
export default ReviewScreen;
const styles = StyleSheet.create({ container: { flex: 1 }, list: { padding: 16, paddingBottom: 28 }, empty: { flexGrow: 1, justifyContent: 'center', alignItems: 'center', padding: 24 }, heading: { color: '#F2F8FF', fontSize: 22, fontWeight: '800', marginBottom: 16 }, row: { flexDirection: 'row', alignItems: 'center', padding: 11, marginBottom: 9, borderRadius: 14, backgroundColor: 'rgba(12,20,42,0.62)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.16)' }, open: { flex: 1, flexDirection: 'row', alignItems: 'center' }, icon: { width: 40, height: 40, borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginRight: 11 }, body: { flex: 1 }, title: { color: '#F2F8FF', fontSize: 14, fontWeight: '800' }, meta: { marginTop: 4, color: '#9FC7F1', fontSize: 11, fontWeight: '700' }, reviewButton: { paddingHorizontal: 9, paddingVertical: 8 }, reviewText: { color: '#B9E6C0', fontSize: 10, fontWeight: '800' }, emptyTitle: { color: '#F2F8FF', fontSize: 18, fontWeight: '800', textAlign: 'center' }, emptyText: { marginTop: 7, color: '#C9DAEE', fontSize: 13, textAlign: 'center', lineHeight: 19 } });
