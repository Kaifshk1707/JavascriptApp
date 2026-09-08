import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import { getLanguageByKey } from '../../content/languageCatalog';
import { getTopicMetadataByGlobalId, IndexedTopicMetadata } from '../../content/topicIndex';
import { useLearningProgress } from '../../context/LearningProgressContext';

const SavedLessonsScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { bookmarkedTopicIds, isTopicCompleted, isTopicStarted } = useLearningProgress();
  const topics = React.useMemo(() => bookmarkedTopicIds.map(getTopicMetadataByGlobalId).filter(Boolean) as IndexedTopicMetadata[], [bookmarkedTopicIds]);
  return (
    <LinearGradient colors={['#0F1022', '#243B55', '#D35D6E']} style={styles.container}>
      <FlatList
        data={topics}
        keyExtractor={(item) => item.id}
        contentContainerStyle={topics.length ? styles.list : styles.empty}
        ListHeaderComponent={topics.length ? <Text style={styles.heading}>Saved lessons</Text> : null}
        ListEmptyComponent={<View><Text style={styles.emptyTitle}>No saved lessons</Text><Text style={styles.emptyText}>Bookmark a lesson to keep it here for offline revision.</Text></View>}
        renderItem={({ item }) => {
          const language = getLanguageByKey(item.languageKey);
          const status = isTopicCompleted(item.id) ? 'Completed' : isTopicStarted(item.id) ? 'In Progress' : undefined;
          return <TouchableOpacity style={styles.row} accessibilityRole="button" accessibilityLabel={`${item.title}, ${language?.shortTitle ?? item.languageKey}, ${status ?? 'not started'}`} onPress={() => navigation.navigate('LearningTopicDetail', { languageKey: item.languageKey, topicId: item.id })} activeOpacity={0.88}>
            <View style={[styles.icon, { backgroundColor: `${language?.color ?? '#8ECBFF'}24` }]}><Icon name="bookmark" size={18} color={language?.color ?? '#8ECBFF'} /></View>
            <View style={styles.body}><Text style={styles.title}>{item.title}</Text><Text style={styles.meta}>{language?.shortTitle ?? item.languageKey}  |  {item.level}  |  {item.duration}</Text></View>
            {status ? <Text style={styles.status}>{status}</Text> : <Icon name="chevron-forward" size={18} color="#C9DAEE" />}
          </TouchableOpacity>;
        }}
      />
    </LinearGradient>
  );
};
export default SavedLessonsScreen;
const styles = StyleSheet.create({ container: { flex: 1 }, list: { padding: 16, paddingBottom: 28 }, empty: { flexGrow: 1, justifyContent: 'center', alignItems: 'center', padding: 24 }, heading: { color: '#F2F8FF', fontSize: 22, fontWeight: '800', marginBottom: 16 }, row: { flexDirection: 'row', alignItems: 'center', padding: 13, marginBottom: 9, borderRadius: 14, backgroundColor: 'rgba(12,20,42,0.62)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.16)' }, icon: { width: 40, height: 40, borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginRight: 11 }, body: { flex: 1 }, title: { color: '#F2F8FF', fontSize: 14, fontWeight: '800' }, meta: { marginTop: 4, color: '#9FC7F1', fontSize: 11, fontWeight: '700' }, status: { marginLeft: 8, color: '#B9E6C0', fontSize: 10, fontWeight: '700' }, emptyTitle: { color: '#F2F8FF', fontSize: 18, fontWeight: '800', textAlign: 'center' }, emptyText: { marginTop: 7, color: '#C9DAEE', fontSize: 13, textAlign: 'center', lineHeight: 19 } });
