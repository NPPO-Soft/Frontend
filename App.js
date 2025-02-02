import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import UniTBv_App from './src/screens/UniTBv_App';
import DashboardBS from './src/screens/DashboardBS';
import RecruitsBS from './src/screens/RecruitsBS';
import InterviewBS from './src/screens/InterviewBS';
import HistoryBS from './src/screens/HistoryBS';
import TestimonialsBS from './src/screens/TestimonialsBS';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="UniTBv_App">
        <Stack.Screen name="UniTBv_App" component={UniTBv_App} options={{ headerShown: false }} />
        <Stack.Screen name="DashboardBS" component={DashboardBS} options={{  headerShown: false }} />
        <Stack.Screen name="RecruitsBS" component={RecruitsBS} options={{ headerShown: false }} />
        <Stack.Screen name="InterviewBS" component={InterviewBS} options={{ headerShown: false }} />
        <Stack.Screen name="HistoryBS" component={HistoryBS} options={{ headerShown: false }} />
        <Stack.Screen name="TestimonialsBS" component={TestimonialsBS} options={{ headerShown: false }} />
<<<<<<< HEAD
        {/* <Stack.Screen name="CrewBS" component={CrewBS} options={{ headerShown: false }} />*/}
=======
        {/*<Stack.Screen name="CrewBS" component={CrewBS} options={{ headerShown: false }} />*/}
>>>>>>> 08718d3b59d3ad3f8079c1419b0ca2ee12611493
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
