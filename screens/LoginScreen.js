import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Image, KeyboardAvoidingView, Platform } from 'react-native';
import { auth } from '../firebase-config';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import * as Google from 'expo-auth-session/providers/google';
import { makeRedirectUri } from 'expo-auth-session';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const navigation = useNavigation();

  // Cấu hình Google Auth
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: "320015085159-3qse9del0kpmqmjvso1ln1nndkrhop1s.apps.googleusercontent.com",
    redirectUri: makeRedirectUri({ useProxy: true }),
  });

  const handleLogin = () => {
    // Kiểm tra thông tin đăng nhập admin
    const ADMIN_EMAIL = 'admin'; // Tên đăng nhập admin
    const ADMIN_PASSWORD = '123456'; // Mật khẩu admin

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      navigation.navigate('Admin'); // Điều hướng đến trang Admin nếu thông tin đăng nhập admin đúng
    } else {
      // Nếu không phải admin, kiểm tra với Firebase
      signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          navigation.navigate('Home'); // Điều hướng đến trang Home nếu đăng nhập thành công
        })
        .catch((error) => {
          setErrorMessage(error.message);
        });
    }
  };

  const handleGoogleLogin = async () => {
    const result = await promptAsync();
    if (result?.type === 'success') {
      const { id_token } = result.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential)
        .then(() => {
          navigation.navigate('Home'); // Điều hướng đến trang Home sau khi đăng nhập thành công
        })
        .catch((error) => {
          setErrorMessage(error.message);
        });
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // Thay đổi hành vi tùy theo hệ điều hành
      keyboardVerticalOffset={80} // Đảm bảo khoảng cách giữa bàn phím và nội dung
    >
      <Image 
        source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQttC6_lwoUbEfR5G9veF1DzWEvqff1hYf6YA&s' }} 
        style={styles.logo} 
        resizeMode="contain" 
      />
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
      
      <View style={styles.buttonContainer}>
        <Button title="Login" onPress={handleLogin} color="#FF8C00" />
        <Button title="Login with Google" onPress={handleGoogleLogin} color="#FF8C00" disabled={!request} />
        <Button title="Forgot Password?" onPress={() => navigation.navigate('ForgotPassword')} color="#FF8C00" />
        <Button title="Register" onPress={() => navigation.navigate('Register')} color="#FF8C00" />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  logo: {
    width: '100%',
    height: 150,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 15,
  },
  buttonContainer: {
    marginTop: 10,
  },
});

export default LoginScreen;
