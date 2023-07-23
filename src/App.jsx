import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Main from './screens/Main'
import Login from './screens/Login';
import OtpVerify from  './screens/Otpverify';
import Dashboard from './screens/Dashboard';
import PendingList from './screens/PendingList';
import DetailedView from './screens/DetailedView';
import { PaperProvider } from 'react-native-paper';
import CameraScreen from './components/Camrea';




const Stack = createNativeStackNavigator();

const App = () => {
  return (
 
    <NavigationContainer>
      <PaperProvider>
      <Stack.Navigator screenOptions={{headerShown:false}} >
        <Stack.Screen name="Main" component={Main} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="OtpVerify" component={OtpVerify} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="PendingList" component={PendingList} />
        <Stack.Screen name="DetailedView" component={DetailedView} />
        
      </Stack.Navigator>
      </PaperProvider>
    </NavigationContainer>

  );
};

export default App;