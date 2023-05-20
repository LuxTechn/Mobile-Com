import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FlatList } from 'react-native-gesture-handler'
import { useIsFocused } from '@react-navigation/native'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore';

const FooterCart = ({ checkout }) => {

    const isFocused = useIsFocused();
    const [cartList, setCartList] = useState([])

    const getCartItems = async () => {
        const cuser = await auth().currentUser.uid
        const user = await firestore().collection('users').doc(cuser).get();
        setCartList(user._data.cart)
    }
    useEffect(() => {
        getCartItems();
    }, [isFocused])


    const getTotal = () => {
        let total = 0;
        cartList.map(item => {
            total = total + item.data.price
        })
        return total
    }

    return (
        <View>
            <FlatList
                data={cartList}
            />

            <View style={styles.container}>
                <View style={{flexDirection:'row', alignItems:'center',paddingHorizontal:10}}>
                    <Text style={{ color: 'white' }}>Total: </Text>
                    <Text style={{ color: '#F5A302' }}>{ 'P'+getTotal()}</Text>
                </View>
                <TouchableOpacity
                    onPress={checkout}
                    style={{ backgroundColor: '#F5A302' }}>
                    <Text style={{ color: 'white', padding: 10 }}>Check Out</Text>
                </TouchableOpacity>
            </View>
        </View>

    )
}

export default FooterCart

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    }
})