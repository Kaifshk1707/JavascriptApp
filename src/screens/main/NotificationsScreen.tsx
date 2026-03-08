import React from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';

type Notice = {
  id: string;
  title: string;
  message: string;
  time: string;
  icon: string;
  accent: string;
};

const notifications: Notice[] = [
  {
    id: '1',
    title: 'Streak Reminder',
    message: 'Your 3-day streak is active. Complete 1 lesson to keep it.',
    time: '5m ago',
    icon: 'flame-outline',
    accent: '#F97316',
  },
  {
    id: '2',
    title: 'HTML Module Unlocked',
    message: 'You can now start Forms and Input Validation.',
    time: '22m ago',
    icon: 'lock-open-outline',
    accent: '#22D3EE',
  },
  {
    id: '3',
    title: 'Daily Goal Complete',
    message: 'Great work. You completed your 20-minute sprint.',
    time: '1h ago',
    icon: 'checkmark-done-outline',
    accent: '#10B981',
  },
  {
    id: '4',
    title: 'JavaScript Practice',
    message: 'Try one array-method challenge to improve speed.',
    time: '3h ago',
    icon: 'flash-outline',
    accent: '#EAB308',
  },
];

export const NotificationsScreen: React.FC = () => {
  const scrollY = React.useRef(new Animated.Value(0)).current;

  const heroTranslateY = scrollY.interpolate({
    inputRange: [0, 130],
    outputRange: [0, -24],
    extrapolate: 'clamp',
  });
  const heroOpacity = scrollY.interpolate({
    inputRange: [0, 110],
    outputRange: [1, 0.62],
    extrapolate: 'clamp',
  });

  return (
    <LinearGradient colors={['#0F1022', '#243B55', '#D35D6E']} style={styles.container}>
      <Animated.ScrollView
        contentContainerStyle={styles.contentWrap}
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
              opacity: heroOpacity,
              transform: [{ translateY: heroTranslateY }],
            },
          ]}
        >
          <Text style={styles.heroTitle}>Notifications</Text>
          <Text style={styles.heroSubtitle}>
            Learning updates, reminders, and progress alerts in one place.
          </Text>
          <View style={styles.heroMetaRow}>
            <View style={styles.metaBadge}>
              <Text style={styles.metaText}>4 New</Text>
            </View>
            <View style={styles.metaBadge}>
              <Text style={styles.metaText}>All Offline</Text>
            </View>
          </View>
        </Animated.View>

        {notifications.map((notification, index) => {
          const itemTranslateY = scrollY.interpolate({
            inputRange: [0, 360],
            outputRange: [0, -(index + 1) * 1.4],
            extrapolate: 'clamp',
          });
          return (
            <Animated.View
              key={notification.id}
              style={[styles.cardWrap, { transform: [{ translateY: itemTranslateY }] }]}
            >
              <TouchableOpacity activeOpacity={0.9}>
                <LinearGradient
                  colors={['rgba(12,20,42,0.72)', 'rgba(12,20,42,0.48)']}
                  style={styles.card}
                >
                  <View style={[styles.iconWrap, { backgroundColor: `${notification.accent}24` }]}>
                    <Icon name={notification.icon} size={20} color={notification.accent} />
                  </View>
                  <View style={styles.noticeContent}>
                    <Text style={styles.title}>{notification.title}</Text>
                    <Text style={styles.message}>{notification.message}</Text>
                    <Text style={[styles.tag, { color: notification.accent }]}>Priority Update</Text>
                  </View>
                  <Text style={styles.time}>{notification.time}</Text>
                </LinearGradient>
              </TouchableOpacity>
            </Animated.View>
          );
        })}
      </Animated.ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentWrap: {
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
  heroMetaRow: {
    marginTop: 12,
    flexDirection: 'row',
  },
  metaBadge: {
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 7,
    marginRight: 8,
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  metaText: {
    color: '#EAF3FF',
    fontSize: 12,
    fontWeight: '700',
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
  noticeContent: {
    flex: 1,
    paddingRight: 8,
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    color: '#F2F8FF',
    marginBottom: 2,
  },
  message: {
    fontSize: 12,
    color: '#C9DAEE',
    lineHeight: 18,
  },
  tag: {
    marginTop: 5,
    fontSize: 11,
    fontWeight: '700',
  },
  time: {
    fontSize: 11,
    color: '#AFC4DD',
  },
});
