import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '../context/ThemeContext';

export const ExploreScreen: React.FC = () => {
  const { colors } = useTheme();

  const categories = [
    { id: 1, name: 'Technology', count: 1240 },
    { id: 2, name: 'Sports', count: 890 },
    { id: 3, name: 'Music', count: 2100 },
    { id: 4, name: 'Art', count: 650 },
    { id: 5, name: 'Food', count: 1520 },
    { id: 6, name: 'Travel', count: 980 },
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.header, { color: colors.text }]}>Explore Categories</Text>
      <View style={styles.grid}>
        {categories.map((category) => (
          <View
            key={category.id}
            style={[styles.card, { backgroundColor: colors.card }]}
          >
            <Text style={[styles.categoryName, { color: colors.text }]}>
              {category.name}
            </Text>
            <Text style={[styles.count, { color: colors.textSecondary }]}>
              {category.count} posts
            </Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    margin: 16,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 8,
  },
  card: {
    width: '45%',
    margin: 8,
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  categoryName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  count: {
    fontSize: 14,
  },
});
