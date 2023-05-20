import { View, Text } from 'react-native'
import React from 'react'



import Login from '../screens/Login';
import Dashboard from '../screens/Dashboard';
import Signup from '../screens/Signup';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator>
        <Stack.Screen name='Login' component={Login} options={{headerShown:false}}/>
        <Stack.Screen name='Signup' component={Signup} options={{headerShown:false}}/>
    </Stack.Navigator>
  )
}

export default AuthStack