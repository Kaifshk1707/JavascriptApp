import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../../screens/main/HomeScreen';
import HtmlMainScreen from '../../screens/learning/HtmlMainScreen';
import CssMainScreen from '../../screens/learning/CssMainScreen';
import JavaScriptMainScreen from '../../screens/learning/JavaScriptMainScreen';
import LanguageMainScreen from '../../screens/learning/LanguageMainScreen';
import LearningTopicDetailScreen from '../../screens/learning/LearningTopicDetailScreen';
import { LEARNING_ROADMAPS, LanguageKey } from '../../data/learningRoadmaps';

const Stack = createNativeStackNavigator();

export const HomeStack: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#0F1022',
        },
        headerTintColor: '#EAF3FF',
        headerShadowVisible: false,
        headerTitleStyle: {
          fontWeight: '700',
        },
      }}
    >
      <Stack.Screen name="HomeMain" component={HomeScreen} options={{ title: 'Home' }} />
      <Stack.Screen
        name="LanguageMain"
        component={LanguageMainScreen}
        options={({ route }: any) => {
          const languageKey = route.params?.languageKey as LanguageKey | undefined;
          const roadmap = languageKey ? LEARNING_ROADMAPS[languageKey] : undefined;

          return {
            title: roadmap ? `${roadmap.shortTitle} Roadmap` : 'Language Roadmap',
          };
        }}
      />
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
        options={({ route }: any) => ({
          title: route.params?.topic?.title || 'Topic Details',
        })}
      />
    </Stack.Navigator>
  );
};
