import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from './src/context/ThemeContext';
import { LearningProgressProvider } from './src/context/LearningProgressContext';
import { StoreProvider } from './src/store/StoreProvider';
import { SplashScreen } from './src/screens/common/SplashScreen';
import { CameraCaptureScreen } from './src/screens/main/CameraCaptureScreen';
import { AuthStack } from './src/navigation/stacks/AuthStack';
import { DrawerNavigator } from './src/navigation/drawers/DrawerNavigator';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <StoreProvider>
        <ThemeProvider>
          <LearningProgressProvider>
            <NavigationContainer>
              <Stack.Navigator
                screenOptions={{
                  headerShown: false,
                }}
              >
                <Stack.Screen name="Splash" component={SplashScreen} />
                <Stack.Screen name="Auth" component={AuthStack} />
                <Stack.Screen name="Camera" component={CameraCaptureScreen} />
                <Stack.Screen name="Main" component={DrawerNavigator} />
              </Stack.Navigator>
            </NavigationContainer>
          </LearningProgressProvider>
        </ThemeProvider>
      </StoreProvider>
    </SafeAreaProvider>
  );
}
