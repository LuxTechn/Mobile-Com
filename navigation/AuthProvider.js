import { View, Text } from 'react-native'
import React, { useState, useEffect, useContext, createContext } from 'react'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore';

export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                login: async (email, password) => {
                    try {
                        await auth().signInWithEmailAndPassword(email, password);

                    } catch (e) {
                        console.log("wrong")
                    }
                },
                register: async (email, password) => {
                    try {
                        await auth().createUserWithEmailAndPassword(email, password);
                        const uid = auth.user.uid;      // <----

                        const db = firestore();

                        await db
                            .collection('users')
                            .doc(uid)              // <----
                            .set({
                                id: uid,             // <----
                                email: email,
                                password: password,
                                name: name,
                                address: address,
                                phoneNumber: phoneNumber,
                                userID: uid,
                                cart: []
                                    .then(() => {
                                        alert('Account Added')
                                    })
                                    .catch((error) => {
                                        alert(error)
                                    })
                            });
                    } catch (e) {
                        console.log(e)
                    }
                },
                logout: async () => {
                    try {
                        await auth().signOut()
                    } catch (e) {
                        console.log(e)
                    }
                },
            }}>
            {children}
        </AuthContext.Provider>
    )
}
