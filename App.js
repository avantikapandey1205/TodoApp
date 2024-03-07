import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import Login from './screens/Login';
import { NavigationContainer, useIsFocused } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import DetailsScreen from './screens/DetailsScreen';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Button } from 'react-native';
import { signOut } from 'firebase/auth';
import { auth } from './firebase';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{ headerShown: false }} name="Login" component={Login} />
        <Stack.Screen name={"Home"} component={DrawerScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function SignOutButton({ navigation }) {
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      handleSignOut();
    }
  }, [isFocused]);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigation.replace('Login');
    } catch (error) {
      console.error('Sign-out failed:', error.message);
    }
  };

  return null;
}

function DrawerScreen({ navigation }) {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="ViewTask" component={HomeScreen} options={{ headerTitle: 'Todos', drawerLabel: 'Todos', drawerActiveBackgroundColor:'#000000'}} />
      <Drawer.Screen name="DetailsScreen" component={DetailsScreen} options={{ headerTitle: 'Add Notes', drawerLabel: 'Add Notes' ,drawerActiveBackgroundColor:'#000000' }} />
       {/*<Drawer.Screen name="Darkmode" component={Darkmode} options={{ headerTitle: Darkmode, drawerLabel: 'Darkmode' ,drawerActiveBackgroundColor:'#000000' }} />  */}
      <Drawer.Screen
        name="SignOut"
        options={{
          headerTitle: 'Sign Out',
          drawerLabel: 'Sign Out',
          drawerActiveBackgroundColor:'#000000' }}>

        {() => <SignOutButton navigation={navigation} />}

      </Drawer.Screen>
    </Drawer.Navigator>
  );
}
