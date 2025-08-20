import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput, Alert } from 'react-native';
import React, {useState, useEffect} from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RestrictedScreen from './Screens/RestrictedScreen';


interface HomeScreenProps {  
  
  navigation: any; //Define 'navigation' prop type
}

// Defining HomeScreen's app
const HomeScreen: React.FC<HomeScreenProps> = ({navigation}) => {
  const [LoggedIn, setLoggedIn] = useState(false); // State that controls login
  const [username, setUsername] = useState(''); // State for username input storage

  // Collateral effect to check if user is logged in
  useEffect(() => {
    AsyncStorage.getItem('username').then(value => {
      if (value) {
        setLoggedIn(true); // User is logged in
        setUsername(value); // Set username from AsyncStorage
      }
    });
  }, []);

  // Function to handle login proccess
  const handleLogin = async () => {
    if (username === 'joao') {
      await AsyncStorage.setItem('username', username); // Store username
      setLoggedIn(true);
      navigation.navigate('Restricted'); // Navigate to RestrictedScreen
    } else {
      // Show alert
      Alert.alert(
        'Ops, Usuário não encontrado',
        '',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel'),
            style: 'cancel',
          },
          {
            text: 'ok',
            onPress: () => console.log('ok'),
          },
        ]
      );
    }
  }
}

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
