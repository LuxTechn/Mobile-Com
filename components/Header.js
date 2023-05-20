import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { Colors, parameters } from '../global/styles'



export const Header = ({navigation, cartNav, openDrawer}) => {
    return (
        <View>
            <View style={styles.header}>
                <TouchableOpacity
                onPress={openDrawer}>
                    <Image source={require('../images/Nav.png')} style={styles.icon} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image source={require('../images/logo.png')} style={[styles.icon, { marginTop: 20 }]} />
                </TouchableOpacity>
                <TouchableOpacity
                onPress={cartNav}>
                    <Image source={require('../images/cart.png')} style={styles.icon} />
                </TouchableOpacity>
            </View>
        </View>



    )
}

export default Header

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        backgroundColor: '#181818',
        height: parameters.headerHeight,
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 20,
        marginTop: 10
    },
    imageHeader: {
        width:'100%'
    },
})