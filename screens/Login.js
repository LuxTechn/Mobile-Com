import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import HeaderLogin from '../components/HeaderLogin'
import auth from '@react-native-firebase/auth';

const Login = ({ navigation }) => {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const userSignin = () => {
        auth().signInWithEmailAndPassword(email, password)
            .then(() => {
                alert('user logged in')
            })
            .catch(error => {
                alert(error)
            })
    }

    const getErrors = (email, password) => {
        const errors = {};
        if (!email && !password) {
            errors.email = 'Please Enter Email and password';
        } 
        else if(!email){
            errors.email = 'Please Enter Email';
        }
        else if (!password){
            errors.password = 'Please Enter Password'
        }
        else {
            errors.email = userSignin();
        }
        return errors
    }

    const handleRegister = () => {
        const errors = getErrors(email, password)
        if (!email && !password) {
            alert('Please Enter Email and password')
        }
        else if (!email) {
            alert('Please Enter Email ')
        }
        else if (!password) {
            alert('Please Enter password ')
        }
        else{
            userSignin()
        }

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
                    onChangeText={(userPassword) => setPassword(userPassword)}
                    secureTextEntry
                />

                <TouchableOpacity style={[styles.button, { marginBottom: 10 }]}
                    onPress={() => handleRegister()}>
                    <Text style={styles.textButton}>Log In</Text>
                </TouchableOpacity>
                <View style={{ alignItems: 'center' }}>
                    <Text style={styles.orText}>Or</Text>
                </View>

                <TouchableOpacity style={[styles.button, { backgroundColor: '#353071' }]}>
                    <Text style={styles.textButton}>Continue with Facebook</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.button, { backgroundColor: '#DC111E' }]}>
                    <Text style={styles.textButton}>Continue with Google</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button}
                    onPress={() => navigation.navigate('Signup')}>
                    <Text style={styles.textButton}>Sign Up for Free</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Login

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#181818',
        paddingHorizontal: 30
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
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    }

})