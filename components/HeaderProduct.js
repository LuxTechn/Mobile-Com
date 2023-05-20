import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { Colors, parameters } from '../global/styles'



export const HeaderProduct = ({navigation, navigate, titleText,cartNav, openDrawer}) => {
    return (
        <View>
            <View style={styles.header}>
                <TouchableOpacity onPress={openDrawer}>
                    <Image source={require('../images/Nav.png')}  />
                </TouchableOpacity>
                <TouchableOpacity
                onPress={navigate}>
                    <Image source={require('../images/logo.png')} style={[styles.icon, { marginTop: 10 }]} />
                </TouchableOpacity>
                <TouchableOpacity
                onPress={cartNav}>
                    <Image source={require('../images/cart.png')}  />
                </TouchableOpacity>
            </View>
            <View style={styles.headTextContainer}>
                <Text style={styles.headText}>{titleText}</Text>
            </View>
            <View style={styles.space}></View>
        </View>
    )
}

export default HeaderProduct

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
        width: '100%'
    },

    headTextContainer: {
        alignItems: 'center',
        padding: 10
    },
    headText: {
        color: 'white',
        fontSize: 40,
        fontWeight: 'bold',
    },
    space: {
        height: '5%',
        backgroundColor: '#F5A302',
        paddingBottom: 10
    },
    icon:{
        height: 40,
        width:50,

    }
})