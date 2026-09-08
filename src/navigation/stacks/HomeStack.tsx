import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../../screens/main/HomeScreen';
import HtmlMainScreen from '../../screens/learning/HtmlMainScreen';
import CssMainScreen from '../../screens/learning/CssMainScreen';
import JavaScriptMainScreen from '../../screens/learning/JavaScriptMainScreen';
import LanguageMainScreen from '../../screens/learning/LanguageMainScreen';
import LearningTopicDetailScreen from '../../screens/learning/LearningTopicDetailScreen';
import LearningSearchScreen from '../../screens/learning/LearningSearchScreen';
import SavedLessonsScreen from '../../screens/learning/SavedLessonsScreen';
import ReviewScreen from '../../screens/learning/ReviewScreen';
import PracticeScreen from '../../screens/learning/PracticeScreen';
import FlashcardScreen from '../../screens/learning/FlashcardScreen';
import AchievementsScreen from '../../screens/learning/AchievementsScreen';
import LearningStatsScreen from '../../screens/learning/LearningStatsScreen';
import LearningPlanScreen from '../../screens/learning/LearningPlanScreen';
import OnboardingScreen from '../../screens/learning/OnboardingScreen';
import CodePlaygroundScreen from '../../screens/learning/CodePlaygroundScreen';
import CertificatesScreen from '../../screens/learning/CertificatesScreen';
import CertificateDetailScreen from '../../screens/learning/CertificateDetailScreen';
import { getLanguageByKey, LanguageKey } from '../../content/languageCatalog';
import { getTopicById } from '../../content';

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
      <Stack.Screen name="LearningSearch" component={LearningSearchScreen} options={{ title: 'Search Learning' }} />
      <Stack.Screen name="SavedLessons" component={SavedLessonsScreen} options={{ title: 'Saved Lessons' }} />
      <Stack.Screen name="ReviewScreen" component={ReviewScreen} options={{ title: 'Review Queue' }} />
      <Stack.Screen name="PracticeScreen" component={PracticeScreen} options={{ title: 'Practice' }} />
      <Stack.Screen name="FlashcardScreen" component={FlashcardScreen} options={{ title: 'Flashcards' }} />
      <Stack.Screen name="AchievementsScreen" component={AchievementsScreen} options={{ title: 'Achievements' }} />
      <Stack.Screen name="LearningStatsScreen" component={LearningStatsScreen} options={{ title: 'Learning Stats' }} />
      <Stack.Screen name="CertificatesScreen" component={CertificatesScreen} options={{ title: 'Certificates' }} />
      <Stack.Screen name="CertificateDetail" component={CertificateDetailScreen} options={{ title: 'Certificate of Completion' }} />
      <Stack.Screen name="LearningPlan" component={LearningPlanScreen} options={{ title: 'Your Learning Plan' }} />
      <Stack.Screen name="Onboarding" component={OnboardingScreen} options={{ title: 'Personalize Learning' }} />
      <Stack.Screen name="PlanSettings" component={OnboardingScreen} options={{ title: 'Plan Settings' }} initialParams={{ settings: true }} />
      <Stack.Screen name="CodePlayground" component={CodePlaygroundScreen} options={{ title: 'Code Playground' }} />
      <Stack.Screen
        name="LanguageMain"
        component={LanguageMainScreen}
        options={({ route }: any) => {
          const languageKey = route.params?.languageKey as LanguageKey | undefined;
          const roadmap = languageKey ? getLanguageByKey(languageKey) : undefined;

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
          title: route.params?.languageKey && route.params?.topicId
            ? getTopicById(route.params.languageKey, route.params.topicId)?.title || 'Topic Details'
            : route.params?.topic?.title || 'Topic Details',
        })}
      />
    </Stack.Navigator>
  );
};
