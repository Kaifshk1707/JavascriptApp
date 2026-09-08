import React from 'react';
import { FlatList, Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import { LANGUAGE_CATEGORIES, getLanguageByKey } from '../../content/languageCatalog';
import { LearningSearchResult, searchLearning } from '../../content/topicIndex';
import { useLearningProgress } from '../../context/LearningProgressContext';

const SUGGESTIONS = ['async', 'loops', 'react hooks', 'sql joins', 'ownership', 'flutter navigation'];

const LearningSearchScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [query, setQuery] = React.useState('');
  const { isTopicCompleted, isTopicStarted, bookmarkedTopicIds } = useLearningProgress();
  const results = React.useMemo(() => searchLearning(query), [query]);

  const openResult = (result: LearningSearchResult) => {
    Keyboard.dismiss();
    if (result.kind === 'language') {
      navigation.navigate('LanguageMain', { languageKey: result.languageKey });
      return;
    }
    navigation.navigate('LearningTopicDetail', { languageKey: result.languageKey, topicId: result.topicId });
  };

  return (
    <LinearGradient colors={['#0F1022', '#243B55', '#D35D6E']} style={styles.container}>
      <View style={styles.content}>
        <View style={styles.searchShell}>
          <Icon name="search" size={20} color="#BFD2E8" />
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Search languages and lessons"
            placeholderTextColor="#9FB1C8"
            autoFocus
            autoCorrect={false}
            returnKeyType="search"
            style={styles.input}
            accessibilityLabel="Search learning content"
            accessibilityRole="search"
          />
          {query ? (
            <TouchableOpacity onPress={() => setQuery('')} accessibilityLabel="Clear search" hitSlop={10}>
              <Icon name="close-circle" size={20} color="#D8E5F4" />
            </TouchableOpacity>
          ) : null}
        </View>

        {!query ? (
          <>
            <Text style={styles.heading}>Explore offline lessons</Text>
            <Text style={styles.subheading}>Search by language, level, or concept.</Text>
            <Text style={styles.label}>Popular searches</Text>
            <View style={styles.chips}>
              {SUGGESTIONS.map((suggestion) => (
                <TouchableOpacity key={suggestion} accessibilityRole="button" accessibilityLabel={`Search for ${suggestion}`} style={styles.chip} onPress={() => setQuery(suggestion)}>
                  <Text style={styles.chipText}>{suggestion}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <Text style={styles.label}>Browse categories</Text>
            <View style={styles.chips}>
              {LANGUAGE_CATEGORIES.map((category) => (
                <TouchableOpacity key={category} accessibilityRole="button" accessibilityLabel={`Browse ${category}`} style={styles.chip} onPress={() => setQuery(category)}>
                  <Text style={styles.chipText}>{category}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </>
        ) : (
          <FlatList
            data={results}
            keyExtractor={(item) => item.kind === 'language' ? `language-${item.languageKey}` : `${item.languageKey}-${item.topicId}`}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={results.length ? styles.results : styles.emptyResults}
            renderItem={({ item }) => {
              const language = getLanguageByKey(item.languageKey);
              const status = item.topicId && isTopicCompleted(item.topicId) ? 'Completed' : item.topicId && isTopicStarted(item.topicId) ? 'In Progress' : undefined;
              const saved = item.topicId ? bookmarkedTopicIds.includes(item.topicId) : false;
              return (
                <TouchableOpacity style={styles.result} accessibilityRole="button" accessibilityLabel={`${item.title}, ${item.kind === 'language' ? 'language' : `${item.level} lesson`}${saved ? ', saved' : ''}`} onPress={() => openResult(item)} activeOpacity={0.88}>
                  <View style={[styles.resultIcon, { backgroundColor: `${language?.color ?? '#8ECBFF'}24` }]}>
                    <Icon name={item.kind === 'language' ? 'code-slash-outline' : 'document-text-outline'} size={19} color={language?.color ?? '#8ECBFF'} />
                  </View>
                  <View style={styles.resultBody}>
                    <Text style={styles.resultTitle}>{item.title}</Text>
                    <Text style={styles.resultMeta}>{item.kind === 'language' ? 'Language' : `${language?.shortTitle ?? item.languageKey}  |  ${item.level}  |  ${item.duration}`}</Text>
                    {item.summary ? <Text style={styles.resultSummary} numberOfLines={2}>{item.summary}</Text> : null}
                  </View>
                  {saved ? <Icon name="bookmark" size={16} color="#FFD59A" /> : status ? <Text style={styles.status}>{status}</Text> : <Icon name="chevron-forward" size={18} color="#C9DAEE" />}
                </TouchableOpacity>
              );
            }}
            ListEmptyComponent={<View><Text style={styles.emptyTitle}>No matching lessons</Text><Text style={styles.emptyText}>Try a shorter phrase or browse a category.</Text></View>}
          />
        )}
      </View>
    </LinearGradient>
  );
};

export default LearningSearchScreen;

const styles = StyleSheet.create({
  container: { flex: 1 }, content: { flex: 1, padding: 16 },
  searchShell: { minHeight: 50, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14, borderRadius: 14, backgroundColor: 'rgba(12,20,42,0.72)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)' },
  input: { flex: 1, color: '#F2F8FF', fontSize: 15, marginHorizontal: 10, paddingVertical: 8 },
  heading: { marginTop: 26, color: '#F2F8FF', fontSize: 22, fontWeight: '800' }, subheading: { marginTop: 6, color: '#C9DAEE', fontSize: 13 },
  label: { marginTop: 24, marginBottom: 10, color: '#EEF5FF', fontSize: 14, fontWeight: '700' }, chips: { flexDirection: 'row', flexWrap: 'wrap' },
  chip: { paddingHorizontal: 12, paddingVertical: 9, marginRight: 8, marginBottom: 8, borderRadius: 16, backgroundColor: 'rgba(255,255,255,0.1)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.18)' }, chipText: { color: '#E8F2FF', fontSize: 12, fontWeight: '600' },
  results: { paddingTop: 16, paddingBottom: 24 }, emptyResults: { flexGrow: 1, justifyContent: 'center', alignItems: 'center' },
  result: { flexDirection: 'row', alignItems: 'center', padding: 13, marginBottom: 9, borderRadius: 14, backgroundColor: 'rgba(12,20,42,0.62)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.16)' }, resultIcon: { width: 40, height: 40, borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginRight: 11 }, resultBody: { flex: 1 }, resultTitle: { color: '#F2F8FF', fontSize: 14, fontWeight: '800' }, resultMeta: { marginTop: 4, color: '#9FC7F1', fontSize: 11, fontWeight: '700' }, resultSummary: { marginTop: 4, color: '#B9CBE0', fontSize: 11, lineHeight: 16 }, status: { marginLeft: 8, color: '#B9E6C0', fontSize: 10, fontWeight: '700' }, emptyTitle: { color: '#F2F8FF', fontSize: 17, fontWeight: '800', textAlign: 'center' }, emptyText: { marginTop: 6, color: '#C9DAEE', fontSize: 13, textAlign: 'center' },
});
