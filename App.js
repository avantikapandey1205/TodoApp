import 'react-native-gesture-handler';
import React from 'react';
import Login from './screens/Login';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import DetailsScreen from './screens/DetailsScreen';
import { createDrawerNavigator } from '@react-navigation/drawer';

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

function DrawerScreen() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="ViewTask" component={HomeScreen} options={{ headerTitle: 'Todos', drawerLabel: "Todos" }} />
      <Drawer.Screen name="DetailsScreen" component={DetailsScreen} options={{ headerTitle: "Add Notes", drawerLabel: "Add Notes" }}/>
    </Drawer.Navigator>
  );
}
