import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState, useContext } from 'react'
import HeaderLogin from '../components/HeaderLogin'
import auth from '@react-native-firebase/auth';
import { AuthContext } from '../navigation/AuthProvider';
import firestore from '@react-native-firebase/firestore';
import uuid from 'react-native-uuid'
const Signup = ({ navigation }) => {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [name, setName] = useState();
    const [address, setAddress] = useState();
    const [phoneNumber, setPhoneNumber] = useState();

    const { register } = useContext(AuthContext)
    const saveUser = async(email,password) => {
        await auth().createUserWithEmailAndPassword(email, password);
        const uid = auth().currentUser.uid
        await firestore().collection('users').doc(uid).set({
            email: email,
            password: password,
            name: name,
            address: address,
            phoneNumber: phoneNumber,
            userID: uid,
            cart:[]
        })
            .then(() => {
                alert('Account Added')
            })
            .catch((error) => {
                alert(error)
            })
    }

    return (
        <View style={styles.container}>
            <HeaderLogin />

            <View>

                <TextInput
                    style={styles.TextInput}
                    labelValue={email}
                    placeholder="Email"
                    onChangeText={(userEmail) => setEmail(userEmail)}

                />
                <TextInput
                    labelValue={password}
                    style={styles.TextInput}
                    placeholder="Password"
                    secureTextEntry
                    onChangeText={(userPassword) => setPassword(userPassword)}
                />
                <TextInput
                    style={styles.TextInput}
                    placeholder="Name"
                    labelValue={name}
                    onChangeText={(userName) => setName(userName)}
                />
                <TextInput
                    style={styles.TextInput}
                    placeholder="Address"
                    labelValue={address}
                    onChangeText={(userAddress) => setAddress(userAddress)}
                />
                <TextInput
                    style={styles.TextInput}
                    placeholder="Phone Number"
                    labelValue={phoneNumber}
                    onChangeText={(userPhoneNumber) => setPhoneNumber(userPhoneNumber)}
                />
                <TouchableOpacity style={styles.button}
                    onPress={() => [saveUser(email,password)]}>
                    <Text style={styles.textButton}>Create Account</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.loginButton}
                    onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.orText}>Already have an account? Log In</Text>
                </TouchableOpacity>

            </View>
        </View>
    )
}

export default Signup

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#181818',
        paddingHorizontal: 30,
    },
    TextInput: {
        borderWidth: 1,
        borderColor: '#86939e',

        paddingHorizontal: 10,
        marginTop: 5,
        borderRadius: 5,
        marginBottom: 20,
        color: 'black',
        backgroundColor: 'white'
    },
    button: {
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F5A302',
    },
    textButton: {
        fontSize: 18,
        padding: 10,
        fontWeight: 'bold',
        color: 'white'
    },
    orText: {
        padding: 10,
        fontSize: 12,
        fontWeight: 'bold',
        color: 'white',
    },
    loginButton: {
        alignItems: 'center'
    }

})