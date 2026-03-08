import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Animated } from 'react-native';
import { HomeStack } from '../stacks/HomeStack';
import { ExploreScreen } from '../../screens/main/ExploreScreen';
import { NotificationsScreen } from '../../screens/main/NotificationsScreen';
import { ProfileScreen } from '../../screens/main/ProfileScreen';
import { Home, Compass, Bell, User } from 'lucide-react-native';

const Tab = createBottomTabNavigator();

const AnimatedTabIcon = ({
  focused,
  color,
  size,
  Icon,
}: {
  focused: boolean;
  color: string;
  size: number;
  Icon: React.ComponentType<{ color?: string; size?: number }>;
}) => {
  const anim = React.useRef(new Animated.Value(focused ? 1 : 0)).current;

  React.useEffect(() => {
    Animated.spring(anim, {
      toValue: focused ? 1 : 0,
      friction: 6,
      tension: 120,
      useNativeDriver: true,
    }).start();
  }, [anim, focused]);

  const translateY = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -5],
  });
  const scale = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.12],
  });

  return (
    <Animated.View style={{ transform: [{ translateY }, { scale }] }}>
      <Icon color={color} size={size} />
    </Animated.View>
  );
};

export const BottomTabs: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        sceneStyle: {
          backgroundColor: '#0F1022',
        },
        tabBarStyle: {
          position: 'absolute',
          left: 16,
          right: 16,
          bottom: 14,
          height: 64,
          borderRadius: 20,
          backgroundColor: 'rgba(12, 20, 42, 0.9)',
          borderTopWidth: 1,
          borderTopColor: 'rgba(255,255,255,0.18)',
          elevation: 0,
        },
        tabBarItemStyle: {
          paddingTop: 4,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
          marginBottom: 4,
        },
        tabBarActiveTintColor: '#7DD3FC',
        tabBarInactiveTintColor: '#9FB0C4',
        headerStyle: {
          backgroundColor: '#0F1022',
        },
        headerTintColor: '#EAF3FF',
        headerShadowVisible: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => (
            <AnimatedTabIcon focused={focused} color={color} size={size} Icon={Home} />
          ),
        }}
      />
      <Tab.Screen
        name="Explore"
        component={ExploreScreen}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <AnimatedTabIcon focused={focused} color={color} size={size} Icon={Compass} />
          ),
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <AnimatedTabIcon focused={focused} color={color} size={size} Icon={Bell} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <AnimatedTabIcon focused={focused} color={color} size={size} Icon={User} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
