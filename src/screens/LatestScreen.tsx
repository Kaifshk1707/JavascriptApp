import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '../context/ThemeContext';

export const LatestScreen: React.FC = () => {
  const { colors } = useTheme();

  const latestItems = [
    { id: 1, title: 'Latest Update', time: '2 min ago' },
    { id: 2, title: 'New Post', time: '15 min ago' },
    { id: 3, title: 'Fresh Content', time: '1 hour ago' },
    { id: 4, title: 'Recent Activity', time: '3 hours ago' },
    { id: 5, title: 'Just Posted', time: '5 hours ago' },
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      {latestItems.map((item) => (
        <View
          key={item.id}
          style={[styles.card, { backgroundColor: colors.card }]}
        >
          <Text style={[styles.title, { color: colors.text }]}>{item.title}</Text>
          <Text style={[styles.time, { color: colors.textSecondary }]}>
            {item.time}
          </Text>
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
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  time: {
    fontSize: 14,
  },
});
