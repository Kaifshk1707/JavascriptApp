import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Easing, StatusBar } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export const SplashScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const entrance = useRef(new Animated.Value(0)).current;
  const ringAnim = useRef(new Animated.Value(0)).current;
  const shimmer = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(entrance, {
      toValue: 1,
      duration: 560,
      easing: Easing.bezier(0.22, 1, 0.36, 1),
      useNativeDriver: true,
    }).start();

    const ringLoop = Animated.loop(
      Animated.timing(ringAnim, {
        toValue: 1,
        duration: 1800,
        easing: Easing.linear,
        isInteraction: false,
        useNativeDriver: true,
      }),
    );

    const shimmerLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(shimmer, {
          toValue: 1,
          duration: 900,
          easing: Easing.inOut(Easing.sin),
          isInteraction: false,
          useNativeDriver: true,
        }),
        Animated.timing(shimmer, {
          toValue: 0,
          duration: 900,
          easing: Easing.inOut(Easing.sin),
          isInteraction: false,
          useNativeDriver: true,
        }),
      ]),
    );

    ringLoop.start();
    shimmerLoop.start();

    const timer = setTimeout(() => {
      navigation.replace('Auth');
    }, 1900);

    return () => {
      clearTimeout(timer);
      ringLoop.stop();
      shimmerLoop.stop();
      entrance.stopAnimation();
      ringAnim.stopAnimation();
      shimmer.stopAnimation();
    };
  }, [entrance, navigation, ringAnim, shimmer]);

  const cardOpacity = entrance.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });
  const cardTranslateY = entrance.interpolate({
    inputRange: [0, 1],
    outputRange: [20, 0],
  });
  const cardScale = entrance.interpolate({
    inputRange: [0, 1],
    outputRange: [0.94, 1],
  });

  const ringRotate = ringAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });
  const ringOpacity = shimmer.interpolate({
    inputRange: [0, 1],
    outputRange: [0.24, 0.48],
  });
  const barScaleX = shimmer.interpolate({
    inputRange: [0, 1],
    outputRange: [0.72, 1],
  });

  return (
    <LinearGradient colors={['#0B1227', '#1E3A5F', '#6A3B6D']} style={styles.container}>
      <StatusBar barStyle="light-content" />

      <View style={styles.blurShapeOne} />
      <View style={styles.blurShapeTwo} />

      <Animated.View
        style={[
          styles.orbitRing,
          {
            opacity: ringOpacity,
            transform: [{ rotate: ringRotate }],
          },
        ]}
      >
        <View style={styles.ringDot} />
      </Animated.View>

      <Animated.View
        style={[
          styles.card,
          {
            opacity: cardOpacity,
            transform: [{ translateY: cardTranslateY }, { scale: cardScale }],
          },
        ]}
      >
        <View style={styles.logoWrap}>
          <Animated.Image
            source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png' }}
            style={styles.logoIcon}
            resizeMode="contain"
          />
        </View>

        <Text style={styles.logoText}>CodePath</Text>
        <Text style={styles.tagline}>Offline Web Learning Studio</Text>

        <View style={styles.badge}>
          <Text style={styles.badgeText}>HTML | CSS | JavaScript</Text>
        </View>

        <View style={styles.progressTrack}>
          <Animated.View
            style={[
              styles.progressFill,
              {
                transform: [{ scaleX: barScaleX }],
              },
            ]}
          />
        </View>
      </Animated.View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  blurShapeOne: {
    position: 'absolute',
    width: 260,
    height: 260,
    borderRadius: 130,
    top: 38,
    right: -95,
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  blurShapeTwo: {
    position: 'absolute',
    width: 190,
    height: 190,
    borderRadius: 95,
    bottom: 90,
    left: -70,
    backgroundColor: 'rgba(125,211,252,0.18)',
  },
  orbitRing: {
    position: 'absolute',
    width: 250,
    height: 250,
    borderRadius: 125,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.25)',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  ringDot: {
    marginTop: -4,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#9DD7FF',
  },
  card: {
    width: '100%',
    borderRadius: 24,
    paddingVertical: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
    backgroundColor: 'rgba(12, 20, 42, 0.58)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  logoWrap: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
    backgroundColor: 'rgba(125,211,252,0.14)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.24)',
  },
  logoIcon: {
    width: 42,
    height: 42,
  },
  logoText: {
    color: '#F5F9FF',
    fontSize: 34,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  tagline: {
    marginTop: 6,
    color: '#D0DDEE',
    fontSize: 14,
  },
  badge: {
    marginTop: 12,
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 7,
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  badgeText: {
    color: '#EAF3FF',
    fontSize: 11,
    fontWeight: '700',
  },
  progressTrack: {
    marginTop: 16,
    width: '70%',
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
    backgroundColor: 'rgba(255,255,255,0.16)',
  },
  progressFill: {
    width: '100%',
    height: '100%',
    borderRadius: 3,
    backgroundColor: '#8ECBFF',
  },
});
