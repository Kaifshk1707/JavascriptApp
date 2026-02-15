import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { FeedScreen } from '../screens/FeedScreen';
import { TrendingScreen } from '../screens/TrendingScreen';
import { LatestScreen } from '../screens/LatestScreen';
import { useTheme } from '../context/ThemeContext';

const Tab = createMaterialTopTabNavigator();

export const HomeTopTabs: React.FC = () => {
  const { colors } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: colors.headerBackground,
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarIndicatorStyle: {
          backgroundColor: colors.primary,
        },
        tabBarLabelStyle: {
          fontWeight: '600',
          fontSize: 14,
        },
      }}
    >
      <Tab.Screen name="Feed" component={FeedScreen} />
      <Tab.Screen name="Trending" component={TrendingScreen} />
      <Tab.Screen name="Latest" component={LatestScreen} />
    </Tab.Navigator>
  );
};
