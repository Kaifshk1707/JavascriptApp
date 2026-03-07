import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import  LoginScreen  from '../../screens/auth/LoginScreen';
import  RegisterScreen  from '../../screens/auth/RegisterScreen';
import ForgotScreen from '../../screens/auth/ForgotScreen';
import { useTheme } from '../../context/ThemeContext';

const Stack = createNativeStackNavigator();

export const AuthStack: React.FC = () => {
  const { colors } = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        animation: 'slide_from_right',
        animationDuration: 360,
        gestureEnabled: true,
        headerStyle: {
          backgroundColor: colors.headerBackground,
        },
        headerTintColor: colors.text,
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Forgot"
        component={ForgotScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

