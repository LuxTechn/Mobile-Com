import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import Header from '../components/Header'

const Home = ({ navigation }) => {
    return (

        <ScrollView style={styles.container}>
            <Header 
                cartNav={()=>navigation.navigate('CartContainer')}
                openDrawer={()=> navigation.openDrawer()}
            />
            <View style={styles.HeadContainer}>
                <Image source={require('../images/imageHeader.png')} style={styles.imageHeader} />
                <View style={styles.HeadTextContainer}>
                    <Text style={styles.HeadText}>Ready to take your Technology</Text>
                    <Text style={styles.HeadText}>Experience to the next level</Text>
                </View>

                <TouchableOpacity style={styles.button}>
                    <Text style={styles.textButton}>Shop</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.productContainer}>
                <View style={styles.laptopContainer}>
                    <Text style={styles.laptopHeading}>Laptops</Text>
                    <View style={styles.imageContainer}>
                        <Image source={require('../images/laptop.png')} style={styles.laptopImage} />
                    </View>
                    <TouchableOpacity style={styles.shopButtonContainer}
                        onPress={() => navigation.navigate('LaptopContainer')}>
                        <Text style={styles.shopButton}>Shop more</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.productContainer}>
                <View style={styles.laptopContainer}>
                    <Text style={styles.laptopHeading}>Keyboard</Text>
                    <View style={styles.imageContainer}>
                        <Image source={require('../images/keyboard.png')} style={styles.laptopImage} />
                    </View>
                    <TouchableOpacity style={styles.shopButtonContainer}
                        onPress={() => navigation.navigate('KeyboardContainer')}>
                        <Text style={styles.shopButton}>Shop more</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>

    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#181818'
    },
    imageHeader: {
        width: '100%',
        marginTop: 100,
    },
    HeadContainer: {

        alignItems: 'center',
        justifyContent: 'center'
    },
    HeadText: {
        fontSize: 25,
        color: 'white',


    },
    HeadTextContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    button: {
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F5A302',
        marginTop: 30
    },
    textButton: {
        fontSize: 18,
        paddingHorizontal: 50,
        paddingVertical: 10,
        fontWeight: 'bold',
        color: 'white'
    },
    productContainer: {

        paddingHorizontal: 20
    },
    laptopContainer: {
        backgroundColor: '#F5A302',
        marginTop: 30,
    },
    laptopHeading: {
        alignItems: 'flex-start',
        marginLeft: 20,
        marginTop: 10,
        fontSize: 35,
        fontWeight: '900',
        color: 'black'

    },
    imageContainer: {
        alignItems: 'center',
        marginTop: 20
    },
    laptopImage: {

    },
    shopButtonContainer: {
        justifyContent: 'flex-end',
        marginTop: 10
    },
    shopButton: {
        textAlign: 'right',
        marginRight: 20,
        marginBottom: 10,
        color: 'black',
        fontWeight: 'bold',
        fontSize: 15
    }
})