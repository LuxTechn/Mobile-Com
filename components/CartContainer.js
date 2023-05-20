import { View, Text } from 'react-native'
import React from 'react'
import HeaderCart from './HeaderCart'
import Cart from '../screens/Cart'
import FooterCart from './FooterCart'

const CartContainer = ({navigation}) => {
    return (
        <View style={{backgroundColor:'#181818',flex:1}}>
            <HeaderCart
                goBack={() => { navigation.goBack() }}
            />
            <Cart/>
            
            <FooterCart
                checkout={() => { navigation.navigate('Checkout') }}
            />
        </View>
    )
}

export default CartContainer