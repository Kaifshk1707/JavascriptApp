import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';

export const SplashScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { colors } = useTheme();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Auth');
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.logo, { color: colors.primary }]}>MyApp</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    fontSize: 48,
    fontWeight: 'bold',
  },
});
