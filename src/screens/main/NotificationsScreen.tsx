import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '../../context/ThemeContext';

export const NotificationsScreen: React.FC = () => {
  const { colors } = useTheme();

  const notifications = [
    {
      id: 1,
      title: 'New follower',
      message: 'John Doe started following you',
      time: '5m ago',
    },
    {
      id: 2,
      title: 'New like',
      message: 'Someone liked your post',
      time: '1h ago',
    },
    {
      id: 3,
      title: 'New comment',
      message: 'Jane commented on your post',
      time: '2h ago',
    },
    {
      id: 4,
      title: 'New message',
      message: 'You have a new message',
      time: '3h ago',
    },
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.header, { color: colors.text }]}>Notifications</Text>
      {notifications.map((notification) => (
        <View
          key={notification.id}
          style={[styles.card, { backgroundColor: colors.card }]}
        >
          <View style={styles.content}>
            <Text style={[styles.title, { color: colors.text }]}>
              {notification.title}
            </Text>
            <Text style={[styles.message, { color: colors.textSecondary }]}>
              {notification.message}
            </Text>
          </View>
          <Text style={[styles.time, { color: colors.textSecondary }]}>
            {notification.time}
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
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    margin: 16,
  },
  card: {
    marginHorizontal: 16,
    marginBottom: 12,
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  message: {
    fontSize: 14,
  },
  time: {
    fontSize: 12,
  },
});

