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
import { useTheme } from '../../context/ThemeContext';

const tracks = [
  {
    id: 'html',
    title: 'HTML',
    subtitle: 'Structure of the web',
    progress: '6/24 lessons',
    icon: 'logo-html5',
    color: '#F97316',
  },
  {
    id: 'css',
    title: 'CSS',
    subtitle: 'Style and layouts',
    progress: '2/30 lessons',
    icon: 'color-palette-outline',
    color: '#3B82F6',
  },
  {
    id: 'javascript',
    title: 'JavaScript',
    subtitle: 'Logic and interactivity',
    progress: '0/42 lessons',
    icon: 'logo-javascript',
    color: '#EAB308',
  },
];

const HomeScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { colors } = useTheme();

  const openLanguage = (id: string) => {
    if (id === 'html') {
      navigation.navigate('HTMLMain');
      return;
    }
    if (id === 'css') {
      navigation.navigate('CSSMain');
      return;
    }
    navigation.navigate('JavaScriptMain');
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <LinearGradient
        colors={['#0EA5E9', '#2563EB']}
        style={styles.heroCard}
      >
        <Text style={styles.heroTitle}>Build Web Skills Offline</Text>
        <Text style={styles.heroSubtitle}>
          Learn HTML, CSS, and JavaScript anywhere. No internet required after download.
        </Text>
        <TouchableOpacity
          style={styles.heroButton}
          activeOpacity={0.9}
          onPress={() => navigation.navigate('HTMLMain')}
        >
          <Text style={styles.heroButtonText}>Continue Learning</Text>
        </TouchableOpacity>
      </LinearGradient>

      <View style={styles.sectionHeader}>
        <Text style={[styles.sectionTitle, { color: colors.textPrimary || '#111827' }]}>
          Your Learning Tracks
        </Text>
      </View>

      {tracks.map((item) => (
        <TouchableOpacity
          key={item.id}
          style={[styles.trackCard, { backgroundColor: colors.card }]}
          activeOpacity={0.9}
          onPress={() => openLanguage(item.id)}
        >
          <View style={[styles.trackIconWrap, { backgroundColor: `${item.color}22` }]}>
            <Icon name={item.icon} size={22} color={item.color} />
          </View>
          <View style={styles.trackInfo}>
            <Text style={[styles.trackTitle, { color: colors.textPrimary || '#111827' }]}>
              {item.title}
            </Text>
            <Text style={[styles.trackSubtitle, { color: colors.textSecondary || '#4B5563' }]}>
              {item.subtitle}
            </Text>
            <Text style={[styles.trackProgress, { color: colors.primary }]}>
              {item.progress}
            </Text>
          </View>
          <Icon name="chevron-forward" size={18} color={colors.textSecondary || '#6B7280'} />
        </TouchableOpacity>
      ))}

      <View style={[styles.infoCard, { backgroundColor: colors.card }]}>
        <View style={styles.infoHeader}>
          <Icon name="cloud-offline-outline" size={18} color={colors.primary} />
          <Text style={[styles.infoTitle, { color: colors.textPrimary || '#111827' }]}>
            Offline Mode Enabled
          </Text>
        </View>
        <Text style={[styles.infoText, { color: colors.textSecondary || '#4B5563' }]}>
          Download lesson packs once and keep learning without internet.
        </Text>
      </View>

      <View style={[styles.infoCard, { backgroundColor: colors.card }]}>
        <View style={styles.infoHeader}>
          <Icon name="rocket-outline" size={18} color={colors.primary} />
          <Text style={[styles.infoTitle, { color: colors.textPrimary || '#111827' }]}>
            Coming Next
          </Text>
        </View>
        <Text style={[styles.infoText, { color: colors.textSecondary || '#4B5563' }]}>
          Python, React, and more languages can be added in future updates.
        </Text>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 24,
  },
  heroCard: {
    borderRadius: 18,
    padding: 18,
    marginBottom: 18,
  },
  heroTitle: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 6,
  },
  heroSubtitle: {
    color: '#E8F2FF',
    fontSize: 13,
    lineHeight: 20,
    marginBottom: 14,
  },
  heroButton: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 12,
  },
  heroButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 13,
  },
  sectionHeader: {
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  trackCard: {
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  trackIconWrap: {
    width: 42,
    height: 42,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  trackInfo: {
    flex: 1,
  },
  trackTitle: {
    fontSize: 16,
    fontWeight: '700',
  },
  trackSubtitle: {
    fontSize: 12,
    marginTop: 2,
  },
  trackProgress: {
    fontSize: 12,
    marginTop: 4,
    fontWeight: '600',
  },
  infoCard: {
    borderRadius: 14,
    padding: 14,
    marginTop: 10,
  },
  infoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
    gap: 6,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: '700',
  },
  infoText: {
    fontSize: 13,
    lineHeight: 19,
  },
});
