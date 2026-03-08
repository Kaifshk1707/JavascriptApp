import React from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { useTheme } from '../context/ThemeContext';
import { Moon, Sun } from 'lucide-react-native';

export const CustomDrawerContent: React.FC<any> = (props) => {
  const { colors, theme, toggleTheme } = useTheme();

  return (
    <DrawerContentScrollView
      {...props}
      style={{ backgroundColor: colors.drawerBackground }}
    >
      <View style={[styles.header, { backgroundColor: colors.card }]}>
        <Text style={[styles.appName, { color: colors.text }]}>CodePath</Text>
        <Text style={[styles.appVersion, { color: colors.textSecondary }]}>
          Version 1.0.0
        </Text>
      </View>

      <DrawerItemList {...props} />

      <View style={[styles.themeContainer, { borderTopColor: colors.border }]}>
        <View style={styles.themeRow}>
          {theme === 'light' ? (
            <Sun color={colors.text} size={24} />
          ) : (
            <Moon color={colors.text} size={24} />
          )}
          <Text style={[styles.themeLabel, { color: colors.text }]}>
            {theme === 'light' ? 'Light Mode' : 'Dark Mode'}
          </Text>
        </View>
        <Switch
          value={theme === 'dark'}
          onValueChange={toggleTheme}
          trackColor={{ false: colors.border, true: colors.primary }}
          thumbColor="#FFFFFF"
        />
      </View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 20,
    marginBottom: 10,
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  appVersion: {
    fontSize: 14,
  },
  themeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    marginTop: 20,
    borderTopWidth: 1,
  },
  themeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  themeLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 12,
  },
});

