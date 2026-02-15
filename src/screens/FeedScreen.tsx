import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '../context/ThemeContext';

export const FeedScreen: React.FC = () => {
  const { colors } = useTheme();

  const feedItems = [
    { id: 1, title: 'Post 1', content: 'This is a feed post content' },
    { id: 2, title: 'Post 2', content: 'Another interesting post' },
    { id: 3, title: 'Post 3', content: 'More content for your feed' },
    { id: 4, title: 'Post 4', content: 'Keep scrolling for more' },
    { id: 5, title: 'Post 5', content: 'Endless feed content here' },
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      {feedItems.map((item) => (
        <View
          key={item.id}
          style={[styles.card, { backgroundColor: colors.card }]}
        >
          <Text style={[styles.title, { color: colors.text }]}>{item.title}</Text>
          <Text style={[styles.content, { color: colors.textSecondary }]}>
            {item.content}
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
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  content: {
    fontSize: 14,
    lineHeight: 20,
  },
});
