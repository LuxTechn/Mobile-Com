import { View, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import HeaderProduct from '../components/HeaderProduct'
import { Text } from 'react-native-elements'
import { FlatList, ScrollView } from 'react-native-gesture-handler'
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth'
import { AsyncStorage } from '@react-native-async-storage/async-storage'
import { AuthContext } from '../navigation/AuthProvider'
import { useIsFocused } from '@react-navigation/native'
const Laptop = ({ navigation }) => {


    const [laptops, setLaptops] = useState([]);
    const [cartCount, setCartCount] = useState([])
    const isFocused = useIsFocused()
    useEffect(() => {
        getLaptops();
    }, [])
    useEffect(() => {
        getCartItems();
    }, [isFocused])
    const getCartItems = async () => {
        const cuser = await auth().currentUser.uid
        const user = await firestore().collection('users').doc(cuser).get();
        setCartCount(user._data.cart.length)
    }
    const getLaptops = () => {
        firestore()
            .collection('laptops')
            .get()
            .then(querySnapshot => {
                console.log('Total users: ', querySnapshot.size);

                let tempData = []
                querySnapshot.forEach(documentSnapshot => {
                    console.log(
                        'User ID: ', documentSnapshot.id,
                        documentSnapshot.data()
                    )
                    tempData.push({ id: documentSnapshot.id, data: documentSnapshot.data() })
                })
                setLaptops(tempData)
            })
    }

    const onAddtoCart = async (item, index) => {
        const cuser = auth().currentUser.uid
        const user = await firestore().collection('users').doc(cuser).get()
        let tempCart = []
        tempCart = user._data.cart
        if (tempCart.length > 0) {
            let existing = false;
            tempCart.map(itm => {
                if (itm.id == item.id) {
                    existing = true
                    alert('Item already in Cart')
                }
            })
            if (existing == false) {
                tempCart.push(item)
                alert('item added!')
            }
            firestore().collection("users").doc(cuser).update({
                cart: tempCart
            })
        } else {
            tempCart.push(item)
            alert('item added!')
        }
        firestore().collection("users").doc(cuser).update({
            cart: tempCart
        })
    }
    return (

        <FlatList
            data={laptops}
            renderItem={({ item, index }) => {
                return (
                    <View style={styles.container}>
                        <ScrollView>
                            <View style={styles.productItemContainer}>
                                <View style={styles.productContainer}>
                                    <Image source={{ uri: item.data.image }} style={styles.image} />

                                    <View style={styles.productInformationContainer}>
                                        <Text style={styles.productInformationText}>{item.data.title}</Text>
                                        <Text style={styles.productInformationText}>{item.data.price}</Text>


                                    </View>
                                </View>
                                <View style={styles.buttonContainer}>
                                    <TouchableOpacity style={styles.button} onPress={() => { onAddtoCart(item, index) }}>
                                        <Text style={styles.textButton}>ADD TO CART</Text>
                                    </TouchableOpacity>
                                </View>

                            </View>

                        </ScrollView>
                    </View>
                )
            }}
        />


    )
}

export default Laptop

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#181818'
    },
    productItemContainer: {
        backgroundColor: 'white',
        marginBottom: 10
    },
    productContainer: {
        flexDirection: 'row',
        padding: 10
    },
    image: {
        height: 100,
        width: 150,
        resizeMode: 'stretch',

    },

    productInformationContainer: {
        flexDirection: 'column',
        marginLeft: 10
    },
    productInformationText: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    buttonContainer: {
        alignItems: 'flex-end',
        padding: 10
    },
    button: {
        alignItems: 'flex-end',
        backgroundColor: '#F5A302',

    },
    textButton: {
        fontSize: 12,
        paddingHorizontal: 30,
        paddingVertical: 5,
        fontWeight: 'bold',
        color: 'white'
    },
})