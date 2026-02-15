import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  StatusBar,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';

const LoginScreen = ({ navigation }: any) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
const handleNavigateToRegister = () => {
  navigation.navigate('Register');
};

  return (
    <LinearGradient
      colors={['#1B0F2B', '#3A1C71', '#D76D77', '#FFAF7B']}
      style={styles.container}
    >
      <StatusBar barStyle="light-content" />

      {/* Top Illustration */}
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
          }}
          style={styles.image}
          resizeMode="contain"
        />
      </View>

      {/* Card */}
      <View style={styles.card}>
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>Welcome back we missed you</Text>

        {/* Username */}
        <View style={styles.inputContainer}>
          <Icon name="person-outline" size={20} color="#999" />
          <TextInput
            placeholder="Username"
            placeholderTextColor="#999"
            style={styles.input}
          />
        </View>

        {/* Password */}
        <View style={styles.inputContainer}>
          <Icon name="lock-closed-outline" size={20} color="#999" />
          <TextInput
            placeholder="Password"
            placeholderTextColor="#999"
            secureTextEntry={!passwordVisible}
            style={styles.input}
          />
          <TouchableOpacity
            onPress={() => setPasswordVisible(!passwordVisible)}
          >
            <Icon
              name={passwordVisible ? 'eye-outline' : 'eye-off-outline'}
              size={20}
              color="#999"
            />
          </TouchableOpacity>
        </View>

        {/* Forgot */}
        <TouchableOpacity>
          <Text style={styles.forgotText}>Forgot Password?</Text>
        </TouchableOpacity>

        {/* Sign Up Button */}
        <LinearGradient colors={['#7F00FF', '#E100FF']} style={styles.button}>
          <TouchableOpacity>
            <Text style={styles.buttonText}>Sign up</Text>
          </TouchableOpacity>
        </LinearGradient>

        {/* Continue with */}
        <Text style={styles.orText}>or Continue with</Text>

        <View style={styles.socialContainer}>
          <TouchableOpacity style={styles.socialBtn}>
            <Icon name="logo-google" size={22} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.socialBtn}>
            <Icon name="logo-facebook" size={22} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.socialBtn}>
            <Icon name="logo-twitter" size={22} color="#fff" />
          </TouchableOpacity>

        </View>
          {/* Register Link */}
          <TouchableOpacity
            style={styles.registerLink}
            onPress={handleNavigateToRegister}
          >
            <Text style={styles.registerText}>
              Don’t have an account?{' '}
              <Text style={styles.registerBold}>Register</Text>
            </Text>
          </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },

  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },

  image: {
    width: 120,
    height: 120,
  },

  card: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 25,
    padding: 20,
  },

  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },

  subtitle: {
    color: '#ccc',
    textAlign: 'center',
    marginBottom: 25,
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 15,
  },

  input: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 10,
    color: '#fff',
  },

  forgotText: {
    textAlign: 'right',
    color: '#bbb',
    marginBottom: 20,
  },

  button: {
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: 'center',
    marginBottom: 20,
  },

  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },

  orText: {
    textAlign: 'center',
    color: '#ccc',
    marginBottom: 15,
  },

  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },

  socialBtn: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    padding: 12,
    borderRadius: 50,
  },

  registerLink: {
    marginTop: 20,
    alignItems: 'center',
  },

  registerText: {
    color: '#ccc',
    fontSize: 14,
  },

  registerBold: {
    color: '#fff',
    fontWeight: '600',
  },
});
