import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { CustomButton } from '../../components/CustomButton';

export const ProfileScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { colors } = useTheme();

  const handleLogout = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Splash' }],
    });
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <View style={[styles.avatar, { backgroundColor: colors.primary }]}>
          <Text style={styles.avatarText}>JD</Text>
        </View>
        <Text style={[styles.name, { color: colors.text }]}>John Doe</Text>
        <Text style={[styles.email, { color: colors.textSecondary }]}>
          john.doe@example.com
        </Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={[styles.statCard, { backgroundColor: colors.card }]}>
          <Text style={[styles.statNumber, { color: colors.primary }]}>1,234</Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
            Posts
          </Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: colors.card }]}>
          <Text style={[styles.statNumber, { color: colors.primary }]}>5,678</Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
            Followers
          </Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: colors.card }]}>
          <Text style={[styles.statNumber, { color: colors.primary }]}>890</Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
            Following
          </Text>
        </View>
      </View>

      <View style={styles.actionsContainer}>
        <CustomButton
          title="Edit Profile"
          onPress={() => {}}
          variant="secondary"
          style={styles.button}
        />
        <CustomButton
          title="Logout"
          onPress={handleLogout}
          variant="primary"
          style={styles.button}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 16,
    marginBottom: 32,
  },
  statCard: {
    flex: 1,
    marginHorizontal: 8,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
  },
  actionsContainer: {
    paddingHorizontal: 16,
  },
  button: {
    marginBottom: 12,
  },
});

