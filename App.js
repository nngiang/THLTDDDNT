import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import HomeScreen from './screens/HomeScreen';
import AdminScreen from './screens/AdminScreen';
import RevenueScreen from './screens/RevenueScreen';
import OrderScreen from './screens/OrderScreen';

const MainStack = createNativeStackNavigator();
const AdminStack = createNativeStackNavigator();

const AdminNavigator = () => {
  return (
    <AdminStack.Navigator>
      <AdminStack.Screen name="AdminMain" component={AdminScreen} options={{ headerShown: false }} />
      <AdminStack.Screen name="Revenue" component={RevenueScreen} />
      <AdminStack.Screen name="Order" component={OrderScreen} />
    </AdminStack.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <MainStack.Navigator initialRouteName="Login">
        <MainStack.Screen name="Login" component={LoginScreen} />
        <MainStack.Screen name="Register" component={RegisterScreen} />
        <MainStack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        <MainStack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <MainStack.Screen name="Admin" component={AdminNavigator} options={{ headerShown: false }} />
      </MainStack.Navigator>
    </NavigationContainer>
  );
};

export default App;