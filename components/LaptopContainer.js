import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import HeaderProduct from './HeaderProduct'
import Laptop from '../screens/Laptop'

const LaptopContainer = ({navigation}) => {
    return (
        <View style={styles.container}>
            <HeaderProduct
                navigate={() => navigation.navigate('Home')}
                titleText={'Laptop'}
                cartNav={() => navigation.navigate('CartContainer')}
                openDrawer={() => navigation.openDrawer()}
            />
            <Laptop/>
        </View>
    )
}

export default LaptopContainer

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#181818'
    },
})