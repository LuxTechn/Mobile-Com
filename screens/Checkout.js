import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import Cart from './Cart'
import CheckoutProducts from '../components/CheckoutProducts'
import { useIsFocused } from '@react-navigation/native'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore';

const Checkout = ({ navigation }) => {


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
        <View >
            <ScrollView style={styles.container}>
                <View style={styles.headTextContainer}>
                    <Text style={styles.headText}>CHECKOUT</Text>
                </View>
                <View style={styles.subTotalprice}>
                    <Text style={styles.subtotalPriceText}>Total</Text>
                    <Text style={styles.subtotalPriceText}>PHP {getTotal()+'.00'}</Text>
                </View>
                <View style={styles.checkoutButtonContainer}>
                    <TouchableOpacity style={styles.checkoutButton} onPress={() => { navigation.navigate('ShippingDetails') }}>
                        <Text style={styles.checkoutButtonText}>PLACE ORDER</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.cartSummary}>
                    <View style={styles.cartHeaderContainer}>
                        <Text style={styles.cartHeaderText}> CART SUMMARY</Text>
                    </View>
                    <View style={styles.cartContainer}>
                        <CheckoutProducts />
                    </View>
                </View>

                <View style={styles.serviceConditionContainer}>
                    <View style={styles.agreementContainer}>
                        <Text style={styles.agreementText}>
                            *International orders may experience a longer shipment time and/or subject to custom fees.
                            Damian Tech are not responsible for such Custom Declaration Fees.
                            {"\n"}{"\n"}
                            This exclusive site and purchase process is hosted by San Gabriel Inc,
                            a trusted partner of Damian Tech, using TLS technology to protect your data.
                            {"\n"}{"\n"}
                            We accept numerous payment methods, including
                            {"\n"}{"\n"}
                            The delivery time may vary depending on your location and shipment method.
                            We do our best to deliver your order on the release date.
                            You will be able to track your package’s progression through shipment tracking.

                        </Text>
                    </View>
                </View>
            </ScrollView>
        </View>

    )
}

export default Checkout

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F5A302',
        paddingHorizontal: 20
    },
    headTextContainer: {
        alignItems: 'center',
        padding: 20
    },
    headText: {
        color: 'black',
        fontSize: 35,
        fontWeight: 900,
    },
    subTotalprice: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 35,

    },
    subtotalPriceText: {
        fontWeight: 'bold',
        color: 'black',
        fontSize: 20
    },
    checkoutButtonContainer: {
        marginTop: 20,

    },
    checkoutButton: {
        alignItems: 'center',
        borderRadius: 20,
        paddingHorizontal: 30,
        backgroundColor: '#181818'

    },
    checkoutButtonText: {
        fontSize: 20,
        color: 'white',
        padding: 5,
        fontWeight: 700
    },
    cartHeaderContainer: {
        backgroundColor: '#282727',
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        padding: 10,
        marginTop: 15
    },
    cartHeaderText: {
        fontSize: 20,
        color: 'white',
        fontWeight: 700
    },
    cartContainer: {
        backgroundColor: '#181818',
        height: 275,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20
    },
    serviceConditionContainer: {
        paddingHorizontal: 10
    },
    agreementContainer: {
        padding: 10,
        borderWidth: 1,
        borderColor: 'black',
        marginTop: 25
    },
    agreementText: {
        color: 'black',
        fontSize: 15,
        fontWeight: '300'
    }

})