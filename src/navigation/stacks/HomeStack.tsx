import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../../screens/main/HomeScreen';
import HtmlMainScreen from '../../screens/learning/HtmlMainScreen';
import CssMainScreen from '../../screens/learning/CssMainScreen';
import JavaScriptMainScreen from '../../screens/learning/JavaScriptMainScreen';
import LearningTopicDetailScreen from '../../screens/learning/LearningTopicDetailScreen';
import { useTheme } from '../../context/ThemeContext';

const Stack = createNativeStackNavigator();

export const HomeStack: React.FC = () => {
  const { colors } = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.headerBackground,
        },
        headerTintColor: colors.text,
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen name="HomeMain" component={HomeScreen} options={{ title: 'Home' }} />
      <Stack.Screen name="HTMLMain" component={HtmlMainScreen} options={{ title: 'HTML Roadmap' }} />
      <Stack.Screen name="CSSMain" component={CssMainScreen} options={{ title: 'CSS Roadmap' }} />
      <Stack.Screen
        name="JavaScriptMain"
        component={JavaScriptMainScreen}
        options={{ title: 'JavaScript Roadmap' }}
      />
      <Stack.Screen
        name="LearningTopicDetail"
        component={LearningTopicDetailScreen}
        options={{ title: 'Topic Details' }}
      />
    </Stack.Navigator>
  );
};

