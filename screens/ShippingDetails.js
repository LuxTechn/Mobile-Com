import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ScrollView, TextInput } from 'react-native-gesture-handler'
import Cart from './Cart'
import CheckoutProducts from '../components/CheckoutProducts'
import { useIsFocused } from '@react-navigation/native'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore';
import RadioForm from 'react-native-simple-radio-button'

const ShippingDetails = ({ navigation }) => {
  const [checked, setChecked] = useState('Credit Cart');
  const [firstName, setFirstName] = useState()
  const [lastName, setLastName] = useState()
  const [address, setAddress] = useState()
  const [postal, setPostal] = useState()
  const [city, setCity] = useState()
  const [phoneNumber, setPhoneNumber] = useState()
  const [cartList, setCartList] = useState([])
  const isFocused = useIsFocused(true);
  const items = [
    { label: 'CreditCard', value: 'Credit Cart' },
    { label: 'Cash On Delivery', value: 'COD' }
  ]


  const getCartItems = async () => {
    const cuser = await auth().currentUser.uid
    const user = await firestore().collection('users').doc(cuser).get();
    setCartList(user._data.cart)
  }

  const order = async index => {
    const cuser = await auth().currentUser.uid
    const user = await firestore().collection('users').doc(cuser).get();
    let tempCart = []
    tempCart = user._data.cart
    firestore().collection('orders').doc(cuser).set({
      id: cuser,
      firstName: firstName,
      lastName: lastName,
      address: address,
      postal: postal,
      city: city,
      phoneNumber: phoneNumber,
      order: tempCart
    })
    firestore().collection('users').doc(cuser).update({
      cart: []
    })
    getCartItems();
    alert('ordered')

  }
  const getErrors = (email, password) => {
    const errors = {};
    if (!firstName && !lastName) {
      errors.email = 'Please enter your name';
    } else {
      errors.email = order();
    }
    return errors
  }

  const handleRegister = () => {
    const errors = getErrors(firstName, lastName)
    if (!firstName && !lastName && !address && !postal && !city && !phoneNumber) {
      alert('Please enter your details')
    }
    else if (!firstName) {
      alert('Please enter your first name')
    }
    else if (!lastName) {
      alert('Please enter your last name')
    }
    else if (!address) {
      alert('Please enter your last name')
    }
    else if (!postal) {
      alert('Please enter your postal code')
    }
    else if (!city) {
      alert('Please enter your postal code')
    }
    else if (!phoneNumber) {
      alert('Please enter your phone number')
    }
    else {
      navigation.navigate('Home')
      order()
    }
  }
  useEffect(() => {
    getCartItems();
  }, [isFocused])

  const creditCart = () => {


    if (checked == 'Credit Cart') {
      return (
        <View>
          <View>
            <Text>Card Number *</Text>
            <TextInput style={styles.inputContainer} />
          </View>

          <Text>Expiry Date *</Text>
          <View style={{ flexDirection: 'row' }}>

            <TextInput placeholder='MONTH' style={[styles.inputContainer, { width: '49%', }]} />
            <TextInput placeholder='YEAR' style={[styles.inputContainer, { width: '48%', marginLeft: 10 }]} />
          </View>
          <View>
            <Text>CVV</Text>
            <TextInput style={styles.inputContainer} />
          </View>
        </View>
      )
    }
    else {
      return (
        <View>
        </View>
      )
    }
  }
  return (
    <View >
      <ScrollView style={styles.container}>
        <View style={styles.headTextContainer}>
          <Text style={styles.headText}>CHECKOUT</Text>
        </View>
        <View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ backgroundColor: '#181818', color: 'white', paddingHorizontal: 10, fontSize: 20 }}>1</Text>
            <Text style={{ paddingStart: 10, fontSize: 18, color: 'black', fontWeight: 'bold' }}>SHIPPING</Text>
          </View>
          <View style={{ paddingVertical: 20 }}>
            <Text style={{ fontSize: 23, color: 'black', fontWeight: 'bold' }}>Delivery Address</Text>
          </View>

          <View>
            <Text style={styles.inputHeading}>First Name *</Text>
            <TextInput
              style={styles.inputContainer}
              labelValue={firstName}
              onChangeText={(ufirstName) => setFirstName(ufirstName)} />
          </View>
          <View>
            <Text style={styles.inputHeading}>Last Name *</Text>
            <TextInput
              style={styles.inputContainer}
              labelValue={lastName}
              onChangeText={(ulastName) => setLastName(ulastName)}
            />
          </View>
          <View>
            <Text style={styles.inputHeading}>Address *</Text>
            <TextInput
              style={styles.inputContainer}
              labelValue={address}
              onChangeText={(uAddress) => setAddress(uAddress)} />
            <TextInput placeholder='Optional: Company, C/O, Apt, Suite' style={[styles.inputContainer, { marginTop: 10 }]} />
          </View>
          <View>
            <Text style={styles.inputHeading}>Postal*</Text>
            <TextInput style={styles.inputContainer}
              labelValue={postal}
              onChangeText={(uPostal) => setPostal(uPostal)} />
          </View>
          <View>
            <Text style={styles.inputHeading}>City*</Text>
            <TextInput
              style={styles.inputContainer}
              labelValue={city}
              onChangeText={(uCity) => setCity(uCity)}
            />
          </View>
          <View>
            <Text style={styles.inputHeading}>State/Province*</Text>
            <TextInput style={styles.inputContainer}
            />
          </View>
          <View>
            <Text style={styles.inputHeading}>Country*</Text>
            <TextInput style={styles.inputContainer} />
          </View>
          <View>
            <Text style={styles.inputHeading}>Phone Number *</Text>
            <TextInput style={styles.inputContainer}
              labelValue={phoneNumber}
              onChangeText={(uPhoneNumber) => setPhoneNumber(uPhoneNumber)} />
          </View>
        </View>

        <View style={{ marginTop: 30 }}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ backgroundColor: '#181818', color: 'white', paddingHorizontal: 10, fontSize: 20 }}>2</Text>
            <Text style={{ paddingStart: 10, fontSize: 18, color: 'black', fontWeight: 'bold' }}>Payment</Text>
          </View>

          <View style={{ paddingVertical: 15 }}>
            <Text style={{ fontSize: 20, color: 'black', fontWeight: 'bold' }}>Payment Method</Text>
          </View>

          <View>
            <RadioForm
              buttonColor="black"
              selectedButtonColor="black"
              backgroundColor="#E2BF7B"
              radio_props={items}
              initial={checked}
              onPress={(checked) => setChecked(checked)} />
          </View>
        </View>
        <View>
          {creditCart()}
        </View>
        <View>
          <TouchableOpacity style={{ alignItems: 'center', padding: 5, backgroundColor: '#181818', marginTop: 10, borderRadius: 20 }}
            onPress={() => { [handleRegister()] }}>
            <Text style={{ color: 'white', fontSize: 20, fontWeight: '600' }}>CONFIRM PAYMENT</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  )
}

export default ShippingDetails

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5A302',
    paddingHorizontal: 20
  },
  inputContainer: {
    backgroundColor: '#E2BF7B',
    borderWidth: 1,
    borderColor: 'black',
    height: 40,
    alignItems: 'center'
  },
  inputHeading: {
    color: 'black',
    fontWeight: 'bold'
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