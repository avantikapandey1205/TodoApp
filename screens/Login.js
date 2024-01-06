import { StatusBar } from 'expo-status-bar';
import { Text, View, TextInput, ImageBackground, Button, Alert } from 'react-native';
import Appstyle from '../Style/Appstyle';
import React, { useEffect , useState } from 'react';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigation } from '@react-navigation/core';


export default function Login() {
  const background = require('../assets/background2.jpeg');
  const [usermail, setEmail] = useState('avan@gmail.com');
  const [Password, setPassword] = useState('123456');

  const navigation = useNavigation()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        navigation.replace("ViewTask")
      }
    })

    return unsubscribe
  }, [])
  
  const handleRegister = async () => {
    try {
      await createUserWithEmailAndPassword(auth, usermail, Password);
      Alert.alert('Registration successful!');
    } catch (error) {
      Alert.alert('Registration failed', error.message);
    }
  };

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, usermail, Password);
      Alert.alert('Login successful!');
    } catch (error) {
      Alert.alert('Login failed', error.message);
    }
  };

  return (
    <ImageBackground style={Appstyle.container} source={background}>
      <View style={Appstyle.backgroundCover}>
        <Text style={Appstyle.header}>TodoApp</Text>
        <TextInput
          style={[Appstyle.textInput, Appstyle.lightextInput]}
          placeholder="Email"
          placeholderTextColor="#000000"
          value={usermail}
          onChangeText={setEmail}
        />
        <TextInput
          style={[Appstyle.textInput, Appstyle.lightextInput]}
          placeholder="Password"
          placeholderTextColor="#000000"
          value={Password}
          secureTextEntry={true}
          onChangeText={setPassword}
        />
        <StatusBar style="auto" />
        <Button title="Register" onPress={handleRegister} color="#000000" />
        
        <Button title="Login" onPress={handleLogin} color="#000000" />
      </View>
    </ImageBackground>
  );
}
