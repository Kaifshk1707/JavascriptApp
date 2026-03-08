import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';

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
  const scrollY = React.useRef(new Animated.Value(0)).current;

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

  const heroTranslateY = scrollY.interpolate({
    inputRange: [0, 140],
    outputRange: [0, -28],
    extrapolate: 'clamp',
  });
  const heroOpacity = scrollY.interpolate({
    inputRange: [0, 120],
    outputRange: [1, 0.55],
    extrapolate: 'clamp',
  });
  const sectionTranslateY = scrollY.interpolate({
    inputRange: [0, 180],
    outputRange: [0, -12],
    extrapolate: 'clamp',
  });

  return (
    <LinearGradient colors={['#0F1022', '#243B55', '#D35D6E']} style={styles.container}>
      <Animated.ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true },
        )}
      >
        <Animated.View
          style={{
            transform: [{ translateY: heroTranslateY }],
            opacity: heroOpacity,
          }}
        >
          <LinearGradient
            colors={['rgba(255,255,255,0.16)', 'rgba(255,255,255,0.06)']}
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
        </Animated.View>

        <Animated.Text
          style={[
            styles.sectionTitle,
            {
              transform: [{ translateY: sectionTranslateY }],
            },
          ]}
        >
          Your Learning Tracks
        </Animated.Text>

        {tracks.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.trackCard}
            activeOpacity={0.9}
            onPress={() => openLanguage(item.id)}
          >
            <LinearGradient colors={['rgba(12,20,42,0.7)', 'rgba(12,20,42,0.45)']} style={styles.trackCardInner}>
              <View style={[styles.trackIconWrap, { backgroundColor: `${item.color}22` }]}>
                <Icon name={item.icon} size={22} color={item.color} />
              </View>
              <View style={styles.trackInfo}>
                <Text style={styles.trackTitle}>{item.title}</Text>
                <Text style={styles.trackSubtitle}>{item.subtitle}</Text>
                <Text style={styles.trackProgress}>{item.progress}</Text>
              </View>
              <Icon name="chevron-forward" size={18} color="#C9DAEE" />
            </LinearGradient>
          </TouchableOpacity>
        ))}

        <View style={styles.infoCard}>
          <View style={styles.infoHeader}>
            <Icon name="cloud-offline-outline" size={18} color="#8ECBFF" />
            <Text style={styles.infoTitle}>Offline Mode Enabled</Text>
          </View>
          <Text style={styles.infoText}>
            Download lesson packs once and keep learning without internet.
          </Text>
        </View>

        <View style={styles.infoCard}>
          <View style={styles.infoHeader}>
            <Icon name="rocket-outline" size={18} color="#8ECBFF" />
            <Text style={styles.infoTitle}>Coming Next</Text>
          </View>
          <Text style={styles.infoText}>
            Python, React, and more languages can be added in future updates.
          </Text>
        </View>
      </Animated.ScrollView>
    </LinearGradient>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 90,
  },
  heroCard: {
    borderRadius: 18,
    padding: 18,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.18)',
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
    backgroundColor: 'rgba(255,255,255,0.16)',
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.22)',
  },
  heroButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 13,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#EEF5FF',
    marginBottom: 10,
  },
  trackCard: {
    borderRadius: 14,
    overflow: 'hidden',
    marginBottom: 10,
  },
  trackCardInner: {
    borderRadius: 14,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.18)',
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
    color: '#F2F8FF',
  },
  trackSubtitle: {
    fontSize: 12,
    marginTop: 2,
    color: '#CBDAEE',
  },
  trackProgress: {
    fontSize: 12,
    marginTop: 4,
    fontWeight: '600',
    color: '#8ECBFF',
  },
  infoCard: {
    borderRadius: 14,
    padding: 14,
    marginTop: 10,
    backgroundColor: 'rgba(12,20,42,0.58)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.18)',
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
    color: '#EEF5FF',
  },
  infoText: {
    fontSize: 13,
    lineHeight: 19,
    color: '#D0DDEE',
  },
});
