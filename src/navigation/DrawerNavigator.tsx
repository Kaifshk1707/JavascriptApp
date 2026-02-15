import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { BottomTabs } from './BottomTabs';
import { CustomDrawerContent } from '../components/CustomDrawerContent';
import { useTheme } from '../context/ThemeContext';

const Drawer = createDrawerNavigator();

export const DrawerNavigator: React.FC = () => {
  const { colors } = useTheme();

  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: colors.drawerBackground,
        },
        drawerActiveTintColor: colors.primary,
        drawerInactiveTintColor: colors.textSecondary,
        drawerLabelStyle: {
          fontSize: 16,
          fontWeight: '600',
        },
      }}
    >
      <Drawer.Screen
        name="MainTabs"
        component={BottomTabs}
        options={{ title: 'Dashboard' }}
      />
    </Drawer.Navigator>
  );
};
