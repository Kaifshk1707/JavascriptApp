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

type ExploreCard = {
  id: string;
  title: string;
  subtitle: string;
  lessons: string;
  icon: string;
  accent: string;
};

const EXPLORE_CARDS: ExploreCard[] = [
  {
    id: 'html-layouts',
    title: 'HTML Layouts',
    subtitle: 'Semantic sections and clean structure',
    lessons: '12 Lessons',
    icon: 'logo-html5',
    accent: '#F97316',
  },
  {
    id: 'css-design',
    title: 'CSS Visual Design',
    subtitle: 'Colors, spacing, and typography systems',
    lessons: '18 Lessons',
    icon: 'color-palette-outline',
    accent: '#3B82F6',
  },
  {
    id: 'js-logic',
    title: 'JavaScript Logic',
    subtitle: 'Functions, arrays, and async thinking',
    lessons: '20 Lessons',
    icon: 'logo-javascript',
    accent: '#EAB308',
  },
  {
    id: 'project-labs',
    title: 'Project Labs',
    subtitle: 'Build mini projects step by step',
    lessons: '9 Labs',
    icon: 'rocket-outline',
    accent: '#22D3EE',
  },
];

const quickFilters = ['Beginner', 'Popular', 'Offline Ready', 'Hands-on'];

export const ExploreScreen: React.FC = () => {
  const scrollY = React.useRef(new Animated.Value(0)).current;

  const headerTranslateY = scrollY.interpolate({
    inputRange: [0, 130],
    outputRange: [0, -24],
    extrapolate: 'clamp',
  });
  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 110],
    outputRange: [1, 0.6],
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
          style={[
            styles.heroCard,
            {
              opacity: headerOpacity,
              transform: [{ translateY: headerTranslateY }],
            },
          ]}
        >
          <Text style={styles.heroTitle}>Explore Tracks</Text>
          <Text style={styles.heroSubtitle}>
            Choose a focused path and keep learning with offline-first modules.
          </Text>
          <View style={styles.heroStatsRow}>
            <View style={styles.heroStat}>
              <Text style={styles.heroStatValue}>59+</Text>
              <Text style={styles.heroStatLabel}>Modules</Text>
            </View>
            <View style={styles.heroStat}>
              <Text style={styles.heroStatValue}>100%</Text>
              <Text style={styles.heroStatLabel}>Static</Text>
            </View>
            <View style={styles.heroStat}>
              <Text style={styles.heroStatValue}>Offline</Text>
              <Text style={styles.heroStatLabel}>Friendly</Text>
            </View>
          </View>
        </Animated.View>

        <Text style={styles.sectionTitle}>Quick Filters</Text>
        <View style={styles.filtersWrap}>
          {quickFilters.map((filter, index) => {
            const chipTranslateY = scrollY.interpolate({
              inputRange: [0, 200],
              outputRange: [0, -(index + 1) * 0.8],
              extrapolate: 'clamp',
            });
            return (
              <Animated.View key={filter} style={{ transform: [{ translateY: chipTranslateY }] }}>
                <TouchableOpacity activeOpacity={0.86} style={styles.filterChip}>
                  <Text style={styles.filterText}>{filter}</Text>
                </TouchableOpacity>
              </Animated.View>
            );
          })}
        </View>

        <Text style={styles.sectionTitle}>Recommended For You</Text>
        {EXPLORE_CARDS.map((item, index) => {
          const cardTranslateY = scrollY.interpolate({
            inputRange: [0, 360],
            outputRange: [0, -(index + 1) * 1.5],
            extrapolate: 'clamp',
          });
          return (
            <Animated.View
              key={item.id}
              style={[styles.cardWrap, { transform: [{ translateY: cardTranslateY }] }]}
            >
              <TouchableOpacity activeOpacity={0.9}>
                <LinearGradient
                  colors={['rgba(12,20,42,0.72)', 'rgba(12,20,42,0.46)']}
                  style={styles.card}
                >
                  <View style={[styles.iconWrap, { backgroundColor: `${item.accent}24` }]}>
                    <Icon name={item.icon} size={20} color={item.accent} />
                  </View>
                  <View style={styles.cardContent}>
                    <Text style={styles.cardTitle}>{item.title}</Text>
                    <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
                    <Text style={[styles.cardMeta, { color: item.accent }]}>{item.lessons}</Text>
                  </View>
                  <Icon name="chevron-forward" size={18} color="#C9DAEE" />
                </LinearGradient>
              </TouchableOpacity>
            </Animated.View>
          );
        })}

        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <Icon name="flash-outline" size={18} color="#8ECBFF" />
            <Text style={styles.infoTitle}>Daily Sprint</Text>
          </View>
          <Text style={styles.infoText}>
            Complete 20 minutes daily. Short, consistent sessions improve retention fast.
          </Text>
        </View>
      </Animated.ScrollView>
    </LinearGradient>
  );
};

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
    padding: 16,
    marginBottom: 14,
    backgroundColor: 'rgba(12,20,42,0.58)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.18)',
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#EFF6FF',
  },
  heroSubtitle: {
    marginTop: 6,
    fontSize: 13,
    lineHeight: 20,
    color: '#D0DDEE',
  },
  heroStatsRow: {
    flexDirection: 'row',
    marginTop: 14,
    justifyContent: 'space-between',
  },
  heroStat: {
    width: '31%',
    borderRadius: 12,
    paddingVertical: 10,
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.16)',
  },
  heroStatValue: {
    color: '#F2F8FF',
    fontSize: 14,
    fontWeight: '700',
  },
  heroStatLabel: {
    marginTop: 2,
    color: '#BFD2E8',
    fontSize: 11,
  },
  sectionTitle: {
    marginBottom: 10,
    fontSize: 17,
    fontWeight: '700',
    color: '#EEF5FF',
  },
  filtersWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 14,
  },
  filterChip: {
    borderRadius: 18,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
    marginBottom: 8,
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  filterText: {
    color: '#E8F2FF',
    fontSize: 12,
    fontWeight: '600',
  },
  cardWrap: {
    marginBottom: 10,
    borderRadius: 14,
    overflow: 'hidden',
  },
  card: {
    borderRadius: 14,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.18)',
  },
  iconWrap: {
    width: 42,
    height: 42,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    color: '#F2F8FF',
    fontSize: 15,
    fontWeight: '700',
  },
  cardSubtitle: {
    marginTop: 2,
    color: '#C9DAEE',
    fontSize: 12,
  },
  cardMeta: {
    marginTop: 4,
    fontSize: 12,
    fontWeight: '700',
  },
  infoCard: {
    marginTop: 6,
    borderRadius: 14,
    padding: 14,
    backgroundColor: 'rgba(12,20,42,0.62)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.18)',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  infoTitle: {
    marginLeft: 6,
    color: '#EEF5FF',
    fontSize: 14,
    fontWeight: '700',
  },
  infoText: {
    color: '#D0DDEE',
    fontSize: 13,
    lineHeight: 20,
  },
});
