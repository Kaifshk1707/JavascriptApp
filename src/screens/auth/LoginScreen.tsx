import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Animated,
  Easing,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { CommonActions } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';

const bgTechIcons = [
  { name: 'code-slash-outline', top: 70, left: 28, size: 30, opacity: 0.18, rotate: '-12deg' },
  { name: 'terminal-outline', top: 132, left: 250, size: 32, opacity: 0.15, rotate: '10deg' },
  { name: 'logo-react', top: 220, left: 42, size: 36, opacity: 0.14, rotate: '0deg' },
  { name: 'hardware-chip-outline', top: 315, left: 270, size: 29, opacity: 0.13, rotate: '-8deg' },
  { name: 'bug-outline', top: 450, left: 22, size: 28, opacity: 0.12, rotate: '8deg' },
  { name: 'git-branch-outline', top: 550, left: 255, size: 33, opacity: 0.16, rotate: '-15deg' },
];

const LoginScreen = ({ navigation }: any) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [contactMode, setContactMode] = useState<'phone' | 'email'>('phone');
  const [contact, setContact] = useState('');
  const [password, setPassword] = useState('');

  const entranceAnim = useRef(new Animated.Value(0)).current;
  const buttonPress = useRef(new Animated.Value(0)).current;
  const buttonPulse = useRef(new Animated.Value(0)).current;
  const socialA = useRef(new Animated.Value(0)).current;
  const socialB = useRef(new Animated.Value(0)).current;
  const socialC = useRef(new Animated.Value(0)).current;
  const contactTyping = useRef(new Animated.Value(0)).current;
  const passwordTyping = useRef(new Animated.Value(0)).current;
  const heroFloat = useRef(new Animated.Value(0)).current;
  const cardFloat = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const entrance = Animated.timing(entranceAnim, {
      toValue: 1,
      duration: 430,
      easing: Easing.bezier(0.22, 1, 0.36, 1),
      isInteraction: false,
      useNativeDriver: true,
    });
    entrance.start();

    const pulseLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(buttonPulse, {
          toValue: 1,
          duration: 900,
          easing: Easing.inOut(Easing.sin),
          isInteraction: false,
          useNativeDriver: true,
        }),
        Animated.timing(buttonPulse, {
          toValue: 0,
          duration: 900,
          easing: Easing.inOut(Easing.sin),
          isInteraction: false,
          useNativeDriver: true,
        }),
      ]),
    );

    const socialWave = Animated.loop(
      Animated.stagger(120, [
        Animated.sequence([
          Animated.timing(socialA, {
            toValue: 1,
            duration: 420,
            easing: Easing.out(Easing.quad),
            isInteraction: false,
            useNativeDriver: true,
          }),
          Animated.timing(socialA, {
            toValue: 0,
            duration: 420,
            easing: Easing.in(Easing.quad),
            isInteraction: false,
            useNativeDriver: true,
          }),
        ]),
        Animated.sequence([
          Animated.timing(socialB, {
            toValue: 1,
            duration: 420,
            easing: Easing.out(Easing.quad),
            isInteraction: false,
            useNativeDriver: true,
          }),
          Animated.timing(socialB, {
            toValue: 0,
            duration: 420,
            easing: Easing.in(Easing.quad),
            isInteraction: false,
            useNativeDriver: true,
          }),
        ]),
        Animated.sequence([
          Animated.timing(socialC, {
            toValue: 1,
            duration: 420,
            easing: Easing.out(Easing.quad),
            isInteraction: false,
            useNativeDriver: true,
          }),
          Animated.timing(socialC, {
            toValue: 0,
            duration: 420,
            easing: Easing.in(Easing.quad),
            isInteraction: false,
            useNativeDriver: true,
          }),
        ]),
      ]),
    );

    pulseLoop.start();
    socialWave.start();
    const heroLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(heroFloat, {
          toValue: 1,
          duration: 1900,
          easing: Easing.inOut(Easing.sin),
          isInteraction: false,
          useNativeDriver: true,
        }),
        Animated.timing(heroFloat, {
          toValue: 0,
          duration: 1900,
          easing: Easing.inOut(Easing.sin),
          isInteraction: false,
          useNativeDriver: true,
        }),
      ]),
    );
    const cardLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(cardFloat, {
          toValue: 1,
          duration: 2200,
          easing: Easing.inOut(Easing.sin),
          isInteraction: false,
          useNativeDriver: true,
        }),
        Animated.timing(cardFloat, {
          toValue: 0,
          duration: 2200,
          easing: Easing.inOut(Easing.sin),
          isInteraction: false,
          useNativeDriver: true,
        }),
      ]),
    );
    heroLoop.start();
    cardLoop.start();

    return () => {
      pulseLoop.stop();
      socialWave.stop();
      heroLoop.stop();
      cardLoop.stop();
      entranceAnim.stopAnimation();
      buttonPulse.stopAnimation();
      buttonPress.stopAnimation();
      contactTyping.stopAnimation();
      passwordTyping.stopAnimation();
      heroFloat.stopAnimation();
      cardFloat.stopAnimation();
      socialA.stopAnimation();
      socialB.stopAnimation();
      socialC.stopAnimation();
    };
  }, [
    entranceAnim,
    buttonPulse,
    buttonPress,
    contactTyping,
    passwordTyping,
    heroFloat,
    cardFloat,
    socialA,
    socialB,
    socialC,
  ]);

  useEffect(() => {
    Animated.timing(contactTyping, {
      toValue: contact.trim().length > 0 ? 1 : 0,
      duration: 180,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  }, [contact, contactTyping]);

  useEffect(() => {
    Animated.timing(passwordTyping, {
      toValue: password.length > 0 ? 1 : 0,
      duration: 180,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  }, [password, passwordTyping]);

  const runExit = (onDone: () => void) => {
    Animated.timing(entranceAnim, {
      toValue: 0,
      duration: 230,
      easing: Easing.in(Easing.cubic),
      useNativeDriver: true,
    }).start(({ finished }) => {
      if (finished) {
        onDone();
      }
    });
  };

  const handleNavigateToRegister = () => {
    navigation.navigate('Register');
  };

  const handleNavigateToForgot = () => {
    navigation.navigate('Forgot');
  };

  const toggleContactMode = () => {
    setContactMode(prev => (prev === 'phone' ? 'email' : 'phone'));
    setContact('');
  };

  const handleSignIn = () => {
    runExit(() => {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'Main' }],
        }),
      );
    });
  };

  const headerTranslateY = entranceAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [20, 0],
  });

  const cardTranslateY = entranceAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [34, 0],
  });

  const cardScale = entranceAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.975, 1],
  });

  const cardOpacity = entranceAnim.interpolate({
    inputRange: [0, 0.25, 1],
    outputRange: [0, 0.45, 1],
  });

  const buttonScale = buttonPress.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.97],
  });

  const pulseScale = buttonPulse.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.05],
  });

  const pulseOpacity = buttonPulse.interpolate({
    inputRange: [0, 1],
    outputRange: [0.16, 0.38],
  });

  const contactScale = contactTyping.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.018],
  });

  const passwordScale = passwordTyping.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.018],
  });

  const socialStyle = (value: Animated.Value) => ({
    transform: [
      {
        translateY: value.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -7],
        }),
      },
      {
        scale: value.interpolate({
          inputRange: [0, 1],
          outputRange: [1, 1.08],
        }),
      },
    ],
  });
  const heroBadgeScale = heroFloat.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.05],
  });
  const heroBadgeRotate = heroFloat.interpolate({
    inputRange: [0, 1],
    outputRange: ['-3deg', '3deg'],
  });
  const cardFloatY = cardFloat.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -5],
  });
  const cardFloatScale = cardFloat.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.008],
  });

  return (
    <LinearGradient colors={['#0F1022', '#243B55', '#D35D6E']} style={styles.container}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.blurShapeOne} />
        <View style={styles.blurShapeTwo} />
        <View pointerEvents="none" style={styles.bgIconLayer}>
          {bgTechIcons.map((item, index) => (
            <Icon
              key={`login-tech-icon-${index}`}
              name={item.name}
              size={item.size}
              color="#E6F2FF"
              style={{
                position: 'absolute',
                top: item.top,
                left: item.left,
                opacity: item.opacity,
                transform: [{ rotate: item.rotate }],
              }}
            />
          ))}
        </View>

        <KeyboardAvoidingView
          style={styles.keyboardView}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <Animated.View
            style={[
              styles.imageContainer,
              {
                opacity: entranceAnim,
                transform: [{ translateY: headerTranslateY }],
              },
            ]}
          >
            <Animated.View style={[styles.heroBadge, { transform: [{ scale: heroBadgeScale }, { rotate: heroBadgeRotate }] }]}>
              <LinearGradient colors={['#66D8FF', '#6B78FF']} style={styles.heroBadgeInner}>
                <Icon name="code-slash-outline" size={42} color="#0B1B3D" />
              </LinearGradient>
            </Animated.View>
            <Text style={styles.heroTitle}>DevTrack</Text>
            <Text style={styles.heroSubTitle}>Learn. Build. Repeat.</Text>
          </Animated.View>

          <Animated.View
            style={[
              styles.formStack,
              {
                opacity: cardOpacity,
                transform: [{ translateY: Animated.add(cardTranslateY, cardFloatY) }, { scale: cardScale }, { scale: cardFloatScale }],
              },
            ]}
          >
            <Animated.View
              style={[
                styles.inputContainer,
                focusedField === 'contact' && styles.inputContainerFocused,
                { transform: [{ scale: contactScale }] },
              ]}
            >
              <Animated.View
                style={{
                  transform: [
                    {
                      scale: contactTyping.interpolate({
                        inputRange: [0, 1],
                        outputRange: [1, 1.15],
                      }),
                    },
                  ],
                }}
              >
                <Icon
                  name={contactMode === 'phone' ? 'call-outline' : 'mail-outline'}
                  size={20}
                  color="#C6D5E6"
                />
              </Animated.View>
              <TextInput
                placeholder={contactMode === 'phone' ? 'Phone Number' : 'Email Address'}
                placeholderTextColor="#9FB0C4"
                style={styles.input}
                value={contact}
                onChangeText={setContact}
                onFocus={() => setFocusedField('contact')}
                onBlur={() => setFocusedField(null)}
                keyboardType={contactMode === 'phone' ? 'phone-pad' : 'email-address'}
                autoCapitalize="none"
              />
              <TouchableOpacity onPress={toggleContactMode} style={styles.modeToggleBtn}>
                <Icon
                  name={contactMode === 'phone' ? 'mail-outline' : 'call-outline'}
                  size={18}
                  color="#C6D5E6"
                />
              </TouchableOpacity>
            </Animated.View>

            <Animated.View
              style={[
                styles.inputContainer,
                focusedField === 'password' && styles.inputContainerFocused,
                { transform: [{ scale: passwordScale }] },
              ]}
            >
              <Animated.View
                style={{
                  transform: [
                    {
                      scale: passwordTyping.interpolate({
                        inputRange: [0, 1],
                        outputRange: [1, 1.15],
                      }),
                    },
                  ],
                }}
              >
                <Icon name="lock-closed-outline" size={20} color="#C6D5E6" />
              </Animated.View>
              <TextInput
                placeholder="Password"
                placeholderTextColor="#9FB0C4"
                secureTextEntry={!passwordVisible}
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                onFocus={() => setFocusedField('password')}
                onBlur={() => setFocusedField(null)}
              />
              <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
                <Icon
                  name={passwordVisible ? 'eye-outline' : 'eye-off-outline'}
                  size={20}
                  color="#C6D5E6"
                />
              </TouchableOpacity>
            </Animated.View>

            <TouchableOpacity activeOpacity={0.85} onPress={handleNavigateToForgot}>
              <Text style={styles.forgotText}>Forgot password?</Text>
            </TouchableOpacity>

            <View style={styles.buttonArea}>
              <Animated.View
                style={[styles.buttonPulseLayer, { opacity: pulseOpacity, transform: [{ scale: pulseScale }] }]}
              />
              <Animated.View style={[styles.buttonAnimatedWrap, { transform: [{ scale: buttonScale }] }]}>
                <TouchableOpacity
                  activeOpacity={1}
                  style={styles.buttonWrapper}
                  onPressIn={() =>
                    Animated.timing(buttonPress, {
                      toValue: 1,
                      duration: 110,
                      easing: Easing.out(Easing.quad),
                      useNativeDriver: true,
                    }).start()
                  }
                  onPressOut={() =>
                    Animated.timing(buttonPress, {
                      toValue: 0,
                      duration: 160,
                      easing: Easing.out(Easing.quad),
                      useNativeDriver: true,
                    }).start()
                  }
                  onPress={handleSignIn}
                >
                  <LinearGradient colors={['#53A0FD', '#6C63FF']} style={styles.button}>
                    <Text style={styles.buttonText}>Sign In</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </Animated.View>
            </View>

            <View style={styles.socialSection}>
              <View style={styles.socialDivider} />
              <Text style={styles.orText}>Or continue with</Text>
              <View style={styles.socialDivider} />
            </View>

            <View style={styles.socialContainer}>
              <Animated.View style={[styles.socialAnimWrap, socialStyle(socialA)]}>
                <TouchableOpacity style={styles.socialBtn} activeOpacity={0.85}>
                  <Icon name="logo-google" size={20} color="#EAF3FF" />
                </TouchableOpacity>
              </Animated.View>
              <Animated.View style={[styles.socialAnimWrap, socialStyle(socialB)]}>
                <TouchableOpacity style={styles.socialBtn} activeOpacity={0.85}>
                  <Icon name="logo-facebook" size={20} color="#EAF3FF" />
                </TouchableOpacity>
              </Animated.View>
              <Animated.View style={[styles.socialAnimWrap, socialStyle(socialC)]}>
                <TouchableOpacity style={styles.socialBtn} activeOpacity={0.85}>
                  <Icon name="logo-twitter" size={20} color="#EAF3FF" />
                </TouchableOpacity>
              </Animated.View>
            </View>

            <TouchableOpacity style={styles.registerLink} onPress={handleNavigateToRegister}>
              <Text style={styles.registerText}>
                Do not have an account? <Text style={styles.registerBold}>Register</Text>
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: 20,
  },
  keyboardView: {
    flex: 1,
    justifyContent: 'center',
  },
  blurShapeOne: {
    position: 'absolute',
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: 'rgba(255,255,255,0.1)',
    top: 20,
    right: -80,
  },
  blurShapeTwo: {
    position: 'absolute',
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: 'rgba(128,190,255,0.18)',
    bottom: 60,
    left: -70,
  },
  bgIconLayer: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 18,
  },
  heroBadge: {
    width: 92,
    height: 92,
    borderRadius: 46,
    marginBottom: 12,
    shadowColor: '#6BA7FF',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 14,
    elevation: 8,
  },
  heroBadgeInner: {
    flex: 1,
    borderRadius: 46,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: '#F5F9FF',
    letterSpacing: 0.4,
  },
  heroSubTitle: {
    marginTop: 6,
    fontSize: 14,
    color: '#D8E6F8',
  },
  formStack: {
    paddingHorizontal: 2,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(148, 172, 215, 0.18)',
    borderRadius: 14,
    paddingHorizontal: 14,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.14)',
  },
  inputContainerFocused: {
    borderColor: '#8ECBFF',
    backgroundColor: 'rgba(148, 172, 215, 0.24)',
  },
  input: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 10,
    color: '#F3F8FF',
    fontSize: 14,
  },
  modeToggleBtn: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  forgotText: {
    textAlign: 'right',
    color: '#D7E5F5',
    marginBottom: 18,
    fontSize: 13,
  },
  buttonArea: {
    position: 'relative',
    marginBottom: 18,
  },
  buttonPulseLayer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    borderRadius: 14,
    backgroundColor: '#6C63FF',
  },
  buttonAnimatedWrap: {
    zIndex: 1,
  },
  buttonWrapper: {
    borderRadius: 14,
  },
  button: {
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  orText: {
    textAlign: 'center',
    color: '#C8D7EA',
    marginHorizontal: 10,
    fontSize: 13,
  },
  socialSection: {
    marginBottom: 14,
    flexDirection: 'row',
    alignItems: 'center',
  },
  socialDivider: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(211, 227, 249, 0.28)',
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  socialAnimWrap: {
    width: '31%',
  },
  socialBtn: {
    backgroundColor: 'rgba(255,255,255,0.13)',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  registerLink: {
    marginTop: 20,
    alignItems: 'center',
  },
  registerText: {
    color: '#D2DDEC',
    fontSize: 14,
  },
  registerBold: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
});
