import Login from './screens/Login';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import DetailsScreen from './screens/DetailsScreen';


const Stack = createNativeStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen options={{ headerShown: false }} name="Login" component={Login} />
      <Stack.Screen name="ViewTask" component={HomeScreen} options={{headerTitle:'View Task'}}/> 
      <Stack.Screen name="DetailsScreen" component={DetailsScreen} />
    </Stack.Navigator>
  </NavigationContainer>  
);
}