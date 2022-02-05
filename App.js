import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import ToDoApp from './src/screens/ToDoApp';
import SplashScreen from './src/components/SplashScreen';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default App = () => {
  const Stack = createNativeStackNavigator();

  return (
    <SafeAreaProvider>

      <NavigationContainer>
        <Stack.Navigator>
      
          {/* <Stack.Screen 
            name='SplashScreen'
            component={SplashScreen}
            options={{headerShown: false}}
          /> */}

          <Stack.Screen
            name='ToDoApp'
            component={ToDoApp}
            options={{headerShown: false}}
          />

        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};
