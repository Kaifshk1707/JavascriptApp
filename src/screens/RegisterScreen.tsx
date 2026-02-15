import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  StatusBar,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';

const RegisterScreen = ({ navigation }: any) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);

  return (
    <LinearGradient
      colors={['#1B0F2B', '#3A1C71', '#D76D77', '#FFAF7B']}
      style={styles.container}
    >
      <StatusBar barStyle="light-content" />

      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
      >
        {/* Top Illustration */}
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/512/3135/3135768.png',
            }}
            style={styles.image}
            resizeMode="contain"
          />
        </View>

        {/* Card */}
        <View style={styles.card}>
          <Text style={styles.title}>Get Started Free</Text>
          <Text style={styles.subtitle}>
            Free Forever. No Credit Card Needed
          </Text>

          {/* Email */}
          <View style={styles.inputContainer}>
            <Icon name="mail-outline" size={20} color="#999" />
            <TextInput
              placeholder="Email"
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

          {/* Confirm Password */}
          <View style={styles.inputContainer}>
            <Icon name="lock-closed-outline" size={20} color="#999" />
            <TextInput
              placeholder="Confirm Password"
              placeholderTextColor="#999"
              secureTextEntry={!confirmVisible}
              style={styles.input}
            />
            <TouchableOpacity
              onPress={() => setConfirmVisible(!confirmVisible)}
            >
              <Icon
                name={confirmVisible ? 'eye-outline' : 'eye-off-outline'}
                size={20}
                color="#999"
              />
            </TouchableOpacity>
          </View>

          {/* Sign Up Button */}
          <LinearGradient colors={['#7F00FF', '#E100FF']} style={styles.button}>
            <TouchableOpacity>
              <Text style={styles.buttonText}>Sign up</Text>
            </TouchableOpacity>
          </LinearGradient>

          {/* Divider */}
          <Text style={styles.orText}>or sign up with</Text>

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

          {/* Navigate to Login */}
          <TouchableOpacity
            style={{ marginTop: 20 }}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={{ textAlign: 'center', color: '#ccc' }}>
              Already have an account?{' '}
              <Text style={{ color: '#fff', fontWeight: '600' }}>Login</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },

  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },

  image: {
    width: 130,
    height: 130,
  },

  card: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 25,
    padding: 20,
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },

  subtitle: {
    color: '#ccc',
    textAlign: 'center',
    marginBottom: 25,
    fontSize: 13,
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

  button: {
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 15,
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
});
