import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import HeaderCart from '../components/HeaderCart'
import { FlatList, ScrollView } from 'react-native-gesture-handler'
import FooterCart from '../components/FooterCart'
import { useIsFocused } from '@react-navigation/native'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore';

const CheckoutProducts = ({ navigation }) => {

  const isFocused = useIsFocused();
  const [cartList, setCartList] = useState([])

  const getCartItems = async () => {
    const cuser = await auth().currentUser.uid
    const user = await firestore().collection('users').doc(cuser).get();
    setCartList(user._data.cart)
  }

  const deleteItems = async index => {
    const cuser = await auth().currentUser.uid
    const user = await firestore().collection('users').doc(cuser).get();
    let tempCart = []
    tempCart = user._data.cart
    tempCart.splice(index, 1);
    firestore().collection('users').doc(cuser).update({
      cart: tempCart
    })
    getCartItems();
  }
  useEffect(() => {
    getCartItems();
  }, [isFocused])
  return (
    <FlatList
      data={cartList}
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
              </View>
            </ScrollView>

          </View>
        )
      }}
    />

  )
}

export default CheckoutProducts

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#181818',
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