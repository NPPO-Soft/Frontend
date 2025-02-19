import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useLoadFonts } from "./src/styles/fonts";
import UniTBv_App from './src/screens/UniTBv_App';
import DashboardBS from './src/screens/DashboardBS';
import RecruitsBS from './src/screens/RecruitsBS';
import InterviewBS from './src/screens/InterviewBS';
import HistoryBS from './src/screens/HistoryBS';
import TestimonialsBS from './src/screens/TestimonialsBS';
import CrewBS from './src/screens/CrewBS';

const Stack = createStackNavigator();


const App = () => {
  const fontsLoaded = useLoadFonts();
  if (!fontsLoaded) return null;
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="UniTBv_App">
        <Stack.Screen name="UniTBv_App" component={UniTBv_App} options={{ headerShown: false }} />
        <Stack.Screen name="DashboardBS" component={DashboardBS} options={{  headerShown: false }} />
        <Stack.Screen name="RecruitsBS" component={RecruitsBS} options={{ headerShown: false }} />
        <Stack.Screen name="InterviewBS" component={InterviewBS} options={{ headerShown: false }} />
        <Stack.Screen name="HistoryBS" component={HistoryBS} options={{ headerShown: false }} />
        <Stack.Screen name="TestimonialsBS" component={TestimonialsBS} options={{ headerShown: false }} />
        <Stack.Screen name="CrewBS" component={CrewBS} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
