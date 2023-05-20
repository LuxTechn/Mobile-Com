import { View, Text, ImageBackground, Image } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'
import FooterCart from '../components/FooterCart'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { AuthContext } from './AuthProvider'


const CustomDrawer = (props) => {
    const { logout } = useContext(AuthContext);

    return (

        <View style={{ flex: 1, backgroundColor:'#F5A302' }}>

            <View style={{ backgroundColor: '#F5A302', paddingHorizontal:20, marginVertical:20 }}>
                <Image source={require('../images/account.png')}
                    style={{ height: 50, width: 50 }} />

                    <Text style={{marginTop:10}}>User</Text>
            </View>

            <View style={{ height: 1, backgroundColor: 'black', width: '100%' }} />
            <DrawerContentScrollView contentContainerStyle={{ backgroundColor: '#F5A302', height: '100%' }}
                {...props}
            >
                <DrawerItemList {...props} />

            </DrawerContentScrollView>
            <View style={{ alignItems: 'flex-end', padding: 20, backgroundColor: '#F5A302' }}>
                <TouchableOpacity
                    onPress={() => { logout() }}>
                    <Image source={require('../images/exit.png')}
                        style={{ height: 25, width: 25 }}
                    />
                </TouchableOpacity>
            </View>
        </View>

    )
}

export default CustomDrawer

const seperatorStyles: ViewStyle = {
    height: 1,
    width: '100%',
    backgroundColor: "#000",
    paddingHorizontal: 10
}
const Separator = () => <View style={seperatorStyles} />;