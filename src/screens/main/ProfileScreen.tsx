import React from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';

export const ProfileScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const scrollY = React.useRef(new Animated.Value(0)).current;

  const handleLogout = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Splash' }],
    });
  };

  const heroTranslateY = scrollY.interpolate({
    inputRange: [0, 140],
    outputRange: [0, -24],
    extrapolate: 'clamp',
  });
  const heroScale = scrollY.interpolate({
    inputRange: [0, 140],
    outputRange: [1, 0.94],
    extrapolate: 'clamp',
  });

  const menuItems = [
    { id: 'download', title: 'Downloads', subtitle: 'Offline lessons and packs', icon: 'download-outline' },
    { id: 'progress', title: 'Learning Progress', subtitle: 'Track completed modules', icon: 'stats-chart-outline' },
    { id: 'settings', title: 'Settings', subtitle: 'Account and app preferences', icon: 'settings-outline' },
  ];

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
            { transform: [{ translateY: heroTranslateY }, { scale: heroScale }] },
          ]}
        >
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>SK</Text>
          </View>
          <Text style={styles.name}>Shaikh Kaif</Text>
          <Text style={styles.email}>shaikh.kaif@example.com</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>Offline Learner</Text>
          </View>
        </Animated.View>

        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>27</Text>
            <Text style={styles.statLabel}>Modules</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>14h</Text>
            <Text style={styles.statLabel}>Study Time</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>7</Text>
            <Text style={styles.statLabel}>Day Streak</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Your Space</Text>
        {menuItems.map((item, index) => {
          const translateY = scrollY.interpolate({
            inputRange: [0, 320],
            outputRange: [0, -(index + 1) * 1.2],
            extrapolate: 'clamp',
          });
          return (
            <Animated.View key={item.id} style={{ transform: [{ translateY }] }}>
              <TouchableOpacity activeOpacity={0.9} style={styles.menuWrap}>
                <LinearGradient
                  colors={['rgba(12,20,42,0.72)', 'rgba(12,20,42,0.48)']}
                  style={styles.menuCard}
                >
                  <View style={styles.menuIconWrap}>
                    <Icon name={item.icon} size={19} color="#8ECBFF" />
                  </View>
                  <View style={styles.menuTextWrap}>
                    <Text style={styles.menuTitle}>{item.title}</Text>
                    <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
                  </View>
                  <Icon name="chevron-forward" size={18} color="#C9DAEE" />
                </LinearGradient>
              </TouchableOpacity>
            </Animated.View>
          );
        })}

        <TouchableOpacity onPress={handleLogout} activeOpacity={0.9} style={styles.logoutWrap}>
          <LinearGradient colors={['#53A0FD', '#6C63FF']} style={styles.logoutBtn}>
            <Icon name="log-out-outline" size={18} color="#FFFFFF" />
            <Text style={styles.logoutBtnText}>Logout</Text>
          </LinearGradient>
        </TouchableOpacity>
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
    padding: 18,
    marginBottom: 14,
    alignItems: 'center',
    backgroundColor: 'rgba(12,20,42,0.58)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.18)',
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    backgroundColor: 'rgba(255,255,255,0.16)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.24)',
  },
  avatarText: {
    fontSize: 34,
    fontWeight: '800',
    color: '#EEF5FF',
  },
  name: {
    fontSize: 24,
    fontWeight: '800',
    color: '#F2F8FF',
  },
  email: {
    marginTop: 4,
    fontSize: 13,
    color: '#CFE0F2',
  },
  badge: {
    marginTop: 10,
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  badgeText: {
    color: '#EAF3FF',
    fontSize: 11,
    fontWeight: '700',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  statCard: {
    width: '31%',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
    backgroundColor: 'rgba(12,20,42,0.62)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.18)',
  },
  statValue: {
    color: '#8ECBFF',
    fontSize: 18,
    fontWeight: '800',
  },
  statLabel: {
    marginTop: 3,
    color: '#C9DAEE',
    fontSize: 11,
  },
  sectionTitle: {
    marginBottom: 10,
    fontSize: 17,
    fontWeight: '700',
    color: '#EEF5FF',
  },
  menuWrap: {
    marginBottom: 10,
    borderRadius: 14,
    overflow: 'hidden',
  },
  menuCard: {
    borderRadius: 14,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.18)',
  },
  menuIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    backgroundColor: 'rgba(125,211,252,0.15)',
  },
  menuTextWrap: {
    flex: 1,
  },
  menuTitle: {
    color: '#F2F8FF',
    fontSize: 15,
    fontWeight: '700',
  },
  menuSubtitle: {
    marginTop: 2,
    color: '#C9DAEE',
    fontSize: 12,
  },
  logoutWrap: {
    marginTop: 6,
    borderRadius: 14,
    overflow: 'hidden',
  },
  logoutBtn: {
    borderRadius: 14,
    paddingVertical: 13,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  logoutBtnText: {
    marginLeft: 8,
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
});
