import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import { LANGUAGE_ORDER, getLanguageByKey } from '../../content/languageCatalog';
import { useLearningProgress } from '../../context/LearningProgressContext';

const CertificatesScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const progress = useLearningProgress();
  const completed = React.useMemo(() => new Set(progress.completedTopicIds), [progress.completedTopicIds]);
  return <LinearGradient colors={['#0F1022', '#243B55', '#D35D6E']} style={styles.container}><FlatList data={LANGUAGE_ORDER} keyExtractor={(key) => key} contentContainerStyle={styles.list} ListHeaderComponent={<><Text style={styles.heading}>Certificates</Text><Text style={styles.subtitle}>Local Certificates of Completion for fully completed learning tracks.</Text></>} renderItem={({ item: key }) => { const language = getLanguageByKey(key); const stats = progress.getTrackCompletion(key); const certificate = progress.certificatesByTrack[key]; return <TouchableOpacity style={styles.row} accessibilityRole="button" accessibilityLabel={`${language?.shortTitle ?? key}, ${certificate ? 'certificate earned' : `${stats.percent}% complete`}`} onPress={() => certificate && navigation.navigate('CertificateDetail', { trackKey: key })}><View style={[styles.icon, { backgroundColor: `${language?.color ?? '#8ECBFF'}24` }]}><Icon name={certificate ? 'ribbon' : 'lock-closed-outline'} size={20} color={certificate ? '#FFD27A' : language?.color ?? '#8ECBFF'} /></View><View style={styles.body}><Text style={styles.title}>{language?.shortTitle ?? key}</Text><Text style={styles.meta}>{certificate ? 'Certificate Earned' : `${stats.percent}% complete | ${stats.remaining.length} lessons remaining`}</Text></View>{certificate ? <Icon name="chevron-forward" size={18} color="#C9DAEE" /> : null}</TouchableOpacity>; }} /></LinearGradient>;
};
export default CertificatesScreen;
const styles = StyleSheet.create({ container: { flex: 1 }, list: { padding: 16, paddingBottom: 40 }, heading: { color: '#F2F8FF', fontSize: 25, fontWeight: '800' }, subtitle: { color: '#C9DAEE', lineHeight: 19, marginTop: 7, marginBottom: 17 }, row: { flexDirection: 'row', alignItems: 'center', padding: 14, marginBottom: 9, borderRadius: 13, backgroundColor: 'rgba(12,20,42,0.58)' }, icon: { width: 42, height: 42, borderRadius: 12, alignItems: 'center', justifyContent: 'center' }, body: { flex: 1, marginLeft: 11 }, title: { color: '#F2F8FF', fontWeight: '800', fontSize: 15 }, meta: { color: '#C9DAEE', fontSize: 11, marginTop: 5 } });
