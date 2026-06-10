import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Animated, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { HomeStack } from '../stacks/HomeStack';
import { ExploreScreen } from '../../screens/main/ExploreScreen';
import { CameraCaptureScreen } from '../../screens/main/CameraCaptureScreen';
import { NotificationsScreen } from '../../screens/main/NotificationsScreen';
import { ProfileScreen } from '../../screens/main/ProfileScreen';
import { Home, Compass, Camera, Bell, User } from 'lucide-react-native';

const Tab = createBottomTabNavigator();
const TAB_BAR_HEIGHT = 64;
const TAB_BAR_SIDE_GAP = 16;

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
  const insets = useSafeAreaInsets();
  const bottomInset = Math.max(insets.bottom, 0);
  const tabBarHeight = TAB_BAR_HEIGHT + bottomInset;

  return (
    <Tab.Navigator
      screenOptions={{
        sceneStyle: {
          backgroundColor: '#0F1022',
        },
        tabBarHideOnKeyboard: true,
        tabBarStyle: [
          styles.tabBar,
          {
            height: tabBarHeight,
            paddingBottom: bottomInset,
          },
        ],
        tabBarItemStyle: {
          height: TAB_BAR_HEIGHT,
          paddingTop: 6,
          paddingBottom: 6,
        },
        tabBarLabelStyle: {
          fontSize: 11.5,
          fontWeight: '600',
          marginBottom: 2,
        },
        tabBarActiveTintColor: '#8dd5f7',
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
            <AnimatedTabIcon
              focused={focused}
              color={color}
              size={size}
              Icon={Home}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Explore"
        component={ExploreScreen}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <AnimatedTabIcon
              focused={focused}
              color={color}
              size={size}
              Icon={Compass}
            />
          ),
        }}
      />
      {/* <Tab.Screen
        name="Camera"
        component={CameraCaptureScreen}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <AnimatedTabIcon
              focused={focused}
              color={color}
              size={size}
              Icon={Camera}
            />
          ),
        }}
      /> */}
      <Tab.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <AnimatedTabIcon
              focused={focused}
              color={color}
              size={size}
              Icon={Bell}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <AnimatedTabIcon
              focused={focused}
              color={color}
              size={size}
              Icon={User}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    left: TAB_BAR_SIDE_GAP,
    right: TAB_BAR_SIDE_GAP,
    bottom: 0,
    height: TAB_BAR_HEIGHT,
    // borderRadius: 20,
    backgroundColor: 'rgba(12, 20, 42, 0.94)',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.18)',
    // borderWidth: 1,
    // borderColor: 'rgba(255,255,255,0.14)',
    // shadowColor: '#000000',
    // shadowOffset: { width: 0, height: 8 },
    // shadowOpacity: 0.18,
    // shadowRadius: 16,
    // elevation: 12,
  },
});
