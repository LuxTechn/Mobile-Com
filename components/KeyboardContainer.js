import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import HeaderProduct from './HeaderProduct'
import Keyboard from '../screens/Keyboard'

const KeyboardContainer = ({navigation}) => {
    return (
        <View style={styles.container}>
            <HeaderProduct
                navigate={() => navigation.replace('Home')}
                titleText={'KEYBOARD'}
                cartNav={() => navigation.navigate('CartContainer')}
                openDrawer={() => navigation.openDrawer()}
            />
            <Keyboard/>
        </View>
    )
}

export default KeyboardContainer

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#181818'
    },
})