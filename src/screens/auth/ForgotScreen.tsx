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
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';

const ForgotScreen = ({ navigation }: any) => {
  const [contactMode, setContactMode] = useState<'phone' | 'email'>('phone');
  const [contact, setContact] = useState('');
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const entranceAnim = useRef(new Animated.Value(0)).current;
  const buttonPress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(entranceAnim, {
      toValue: 1,
      duration: 360,
      easing: Easing.bezier(0.22, 1, 0.36, 1),
      useNativeDriver: true,
    }).start();
  }, [entranceAnim]);

  const handleSubmit = () => {
    navigation.goBack();
  };

  const toggleContactMode = () => {
    setContactMode(prev => (prev === 'phone' ? 'email' : 'phone'));
    setContact('');
  };

  return (
    <LinearGradient colors={['#141E30', '#243B55', '#3A6073']} style={styles.container}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          style={styles.keyboardView}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <Animated.View
            style={[
              styles.card,
              {
                opacity: entranceAnim,
                transform: [
                  {
                    translateY: entranceAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [28, 0],
                    }),
                  },
                ],
              },
            ]}
          >
            <Text style={styles.title}>Forgot Password</Text>
            <Text style={styles.subtitle}>Enter your number or email to reset password</Text>

            <View
              style={[
                styles.inputContainer,
                focusedField === 'contact' && styles.inputContainerFocused,
              ]}
            >
              <Icon
                name={contactMode === 'phone' ? 'call-outline' : 'mail-outline'}
                size={20}
                color="#D7E8FA"
              />
              <TextInput
                placeholder={contactMode === 'phone' ? 'Phone Number' : 'Email Address'}
                placeholderTextColor="#A2B7CC"
                style={styles.input}
                value={contact}
                onChangeText={setContact}
                keyboardType={contactMode === 'phone' ? 'phone-pad' : 'email-address'}
                autoCapitalize="none"
                onFocus={() => setFocusedField('contact')}
                onBlur={() => setFocusedField(null)}
              />
              <TouchableOpacity onPress={toggleContactMode} style={styles.modeToggleBtn}>
                <Icon
                  name={contactMode === 'phone' ? 'mail-outline' : 'call-outline'}
                  size={18}
                  color="#D7E8FA"
                />
              </TouchableOpacity>
            </View>

            <Animated.View
              style={[
                styles.buttonWrap,
                {
                  transform: [
                    {
                      scale: buttonPress.interpolate({
                        inputRange: [0, 1],
                        outputRange: [1, 0.97],
                      }),
                    },
                  ],
                },
              ]}
            >
              <TouchableOpacity
                activeOpacity={1}
                onPressIn={() =>
                  Animated.timing(buttonPress, {
                    toValue: 1,
                    duration: 90,
                    useNativeDriver: true,
                  }).start()
                }
                onPressOut={() =>
                  Animated.timing(buttonPress, {
                    toValue: 0,
                    duration: 140,
                    useNativeDriver: true,
                  }).start()
                }
                onPress={handleSubmit}
              >
                <LinearGradient colors={['#4FACFE', '#00F2FE']} style={styles.button}>
                  <Text style={styles.buttonText}>Send Reset Code</Text>
                </LinearGradient>
              </TouchableOpacity>
            </Animated.View>

            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={styles.backText}>Back to Login</Text>
            </TouchableOpacity>
          </Animated.View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default ForgotScreen;

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
  card: {
    backgroundColor: 'rgba(10, 24, 44, 0.6)',
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.18)',
  },
  title: {
    color: '#F3FAFF',
    fontSize: 28,
    fontWeight: '800',
    textAlign: 'center',
  },
  subtitle: {
    color: '#C4D9EE',
    textAlign: 'center',
    marginTop: 6,
    marginBottom: 18,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(148, 172, 215, 0.18)',
    borderRadius: 14,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.14)',
  },
  inputContainerFocused: {
    borderColor: '#8ECBFF',
    backgroundColor: 'rgba(148, 172, 215, 0.24)',
  },
  modeToggleBtn: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  input: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 10,
    color: '#F3F8FF',
    fontSize: 14,
  },
  buttonWrap: {
    marginTop: 16,
  },
  button: {
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
  },
  backText: {
    marginTop: 18,
    textAlign: 'center',
    color: '#CFE2F5',
    fontSize: 14,
  },
});
