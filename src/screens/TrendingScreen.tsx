import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '../context/ThemeContext';

export const TrendingScreen: React.FC = () => {
  const { colors } = useTheme();

  const trendingItems = [
    { id: 1, title: 'Trending Topic #1', views: '1.2M views' },
    { id: 2, title: 'Hot Topic #2', views: '890K views' },
    { id: 3, title: 'Popular #3', views: '650K views' },
    { id: 4, title: 'Trending Now #4', views: '520K views' },
    { id: 5, title: 'Viral Post #5', views: '410K views' },
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      {trendingItems.map((item, index) => (
        <View
          key={item.id}
          style={[styles.card, { backgroundColor: colors.card }]}
        >
          <View style={styles.rank}>
            <Text style={[styles.rankText, { color: colors.primary }]}>#{index + 1}</Text>
          </View>
          <View style={styles.content}>
            <Text style={[styles.title, { color: colors.text }]}>{item.title}</Text>
            <Text style={[styles.views, { color: colors.textSecondary }]}>
              {item.views}
            </Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    margin: 16,
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  rank: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  rankText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  views: {
    fontSize: 14,
  },
});
