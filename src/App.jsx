import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Main from './screens/Main'
import Login from './screens/Login';
import OtpVerify from  './screens/Otpverify';
import Dashboard from './screens/Dashboard';
import PendingList from './screens/PendingList';
import DetailedView from './screens/DetailedView';
import CameraScreen from './components/Camrea';
import { ApiProvider } from './components/apiContext';
import SplashScreen from 'react-native-splash-screen';





const Stack = createNativeStackNavigator();

const App = () => {
  React.useEffect(()=>{
    SplashScreen.hide();
  },[]);
  return (
    <ApiProvider>
    <NavigationContainer>
      
      <Stack.Navigator screenOptions={{headerShown:false}} >
        <Stack.Screen name="Main" component={Main} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="OtpVerify" component={OtpVerify} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="PendingList" component={PendingList} />
        <Stack.Screen name="DetailedView" component={DetailedView} />
        <Stack.Screen name="CameraScreen" component={CameraScreen} />
        
      </Stack.Navigator>
      
    </NavigationContainer>
    </ApiProvider>

  );
};

export default App;