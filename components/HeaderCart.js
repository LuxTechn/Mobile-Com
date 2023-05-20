import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { Colors, parameters } from '../global/styles'



export const HeaderCart = ({ navigation, cartNav, titleText,goBack }) => {
    return (
        <View>
            <View style={styles.header}>
                <TouchableOpacity onPress={goBack}>
                    <Image source={require('../images/close.png')} style={styles.icon} />
                </TouchableOpacity>
            </View>
            <View style={styles.headTextContainer}>
                <Text style={styles.headText}>Cart</Text>
            </View>
        </View>



    )
}

export default HeaderCart

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        backgroundColor: '#181818',
        height: parameters.headerHeight,
        alignItems: 'flex-end',
        paddingHorizontal:20,
    },
    imageHeader: {
        width: '100%'
    },
    headTextContainer:{
        alignItems:'center',
        justifyContent:'center'
    },
    headText: {
        color: 'white',
        fontSize: 40,
        fontWeight: 'bold',
    },
})