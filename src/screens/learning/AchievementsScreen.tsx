import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import { useLearningProgress } from '../../context/LearningProgressContext';

const AchievementsScreen: React.FC = () => {
  const { getAchievementProgress } = useLearningProgress();
  const items = getAchievementProgress();
  return <LinearGradient colors={['#0F1022', '#243B55', '#D35D6E']} style={styles.container}><FlatList data={items} keyExtractor={(item) => item.id} contentContainerStyle={styles.list} ListHeaderComponent={<Text style={styles.heading}>Achievements</Text>} renderItem={({ item }) => <View style={[styles.row, item.unlocked && styles.unlocked]} accessibilityLabel={`${item.title}, ${item.unlocked ? 'unlocked' : `locked, progress ${Math.min(item.value, item.target)} of ${item.target}`}`}><Icon name={item.unlocked ? 'trophy' : 'lock-closed-outline'} size={22} color={item.unlocked ? '#FFD27A' : '#9FB0C4'} /><View style={styles.body}><Text style={styles.title}>{item.title}</Text><Text style={styles.description}>{item.description}</Text><Text style={styles.progress}>{item.unlocked ? 'Unlocked' : `${Math.min(item.value, item.target)} / ${item.target}`}</Text></View></View>} /></LinearGradient>;
};
export default AchievementsScreen;
const styles = StyleSheet.create({ container: { flex: 1 }, list: { padding: 16, paddingBottom: 40 }, heading: { color: '#F2F8FF', fontSize: 25, fontWeight: '800', marginBottom: 18 }, row: { flexDirection: 'row', alignItems: 'center', padding: 15, marginBottom: 10, borderRadius: 14, backgroundColor: 'rgba(12,20,42,0.62)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.13)', opacity: 0.72 }, unlocked: { opacity: 1, borderColor: 'rgba(255,210,122,0.5)' }, body: { flex: 1, marginLeft: 12 }, title: { color: '#F2F8FF', fontSize: 15, fontWeight: '800' }, description: { color: '#C9DAEE', marginTop: 4, fontSize: 12 }, progress: { color: '#8ECBFF', marginTop: 7, fontWeight: '700', fontSize: 11 } });
