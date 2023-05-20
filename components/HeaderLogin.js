import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Colors, parameters } from '../global/styles'
import { Icon } from 'react-native-elements'
import { Image } from 'react-native-animatable'



export const HeaderLogin = () => {
    return (
        <View style={styles.header}>
            <View>
                <Image source={require('../images/logo.png')} style={styles.icon}/>
            </View>
        </View>
    )
}

export default HeaderLogin

const styles = StyleSheet.create({
    header: {
        backgroundColor: Colors.headerbg,
        height: parameters.headerHeight,
        alignItems:'center',
        marginTop:30,
        padding:60
    },
    icon:{
        height: 40,
        width:50,

    }
})