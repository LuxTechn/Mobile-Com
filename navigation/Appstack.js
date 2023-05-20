import { View, Text } from 'react-native'
import React from 'react'


import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Checkout from '../screens/Checkout';
import Home from '../screens/Home';

import ShippingDetails from '../screens/ShippingDetails';
import CustomDrawer from './CustomDrawer';
import Account from '../screens/Account';

import KeyboardContainer from '../components/KeyboardContainer';
import CartContainer from '../components/CartContainer';
import LaptopContainer from '../components/LaptopContainer';
const Drawer = createDrawerNavigator();


const Appstack = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props} />}
      initialRouteName='Home'
      screenOptions={{
        drawerActiveBackgroundColor:'#201f1d30',
        drawerActiveTintColor:'#fff'
      }}
      >
      <Drawer.Screen name='Home' component={Home} options={{ headerShown: false }} />
      <Drawer.Screen name='LaptopContainer' component={LaptopContainer} options={{ headerShown: false, title:'Laptops' }} />
      <Drawer.Screen name='KeyboardContainer' component={KeyboardContainer} options={{ headerShown: false,title:'Keyboards' }} />
      <Drawer.Screen name='CartContainer' component={CartContainer  } options={{ headerShown: false, title:'Cart' }} />
      <Drawer.Screen name='Checkout' component={Checkout} options={{ headerShown: false, drawerItemStyle: { display: 'none' } }} />
      <Drawer.Screen name='ShippingDetails' component={ShippingDetails} options={{ headerShown: false, drawerItemStyle: { display: 'none' } }} />
    </Drawer.Navigator>
  )
}

export default Appstack