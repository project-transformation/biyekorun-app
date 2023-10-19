import { StyleSheet, Text, View, ImageBackground, Image, SafeAreaView } from 'react-native'
import React, { useEffect } from 'react'
import Button from '../components/Button'
import Colors from '../constants/Colors'
import Icon from 'react-native-vector-icons/FontAwesome'
import { ExternalLink } from '../components/ExternalLink'
import { Redirect, router } from 'expo-router'
import { useDispatch, useSelector } from 'react-redux'
import { getUserData } from '../actions/userActions'


const index = () => {

    const { isAuthenticated } = useSelector(state => state.auth)
    const disPatch = useDispatch()



    useEffect(() => {
        if (isAuthenticated) {

            disPatch(getUserData())

        }
    }, [isAuthenticated])

    if (isAuthenticated) {
        return <Redirect href={"/(tabs)/home"} />

    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ImageBackground
                source={require('../assets/images/splash.png')} // Replace with your image path
                style={styles.backgroundImage}
            >
                <View style={styles.container}>
                    <Image resizeMode='contain' style={{ height: 80 }} source={require("../assets/images/logo.png")} />



                    <View style={{ width: "100%", gap: 20 }}>
                        <Text style={{ color: "white", textAlign: 'center', fontWeight: "bold" }}>
                            By clicking Log in, you agree our <ExternalLink href="https://biyekorun.us/terms-&-conditions">Terms </ExternalLink>
                        </Text>
                        <Button
                            text="Login"
                            onPress={() => router.push("/login")}
                            textColor={Colors.textWhite}
                            buttonColor={Colors.secondary}
                            variant="contained"
                            width={"100%"}
                            rounded
                        // icon={<Icon color="white" size={20} name='rocket' />}
                        />
                        <Button
                            text="Register"
                            onPress={() => router.push("/register")}
                            textColor={"#000"}
                            buttonColor={"#fff"}
                            variant="contained"
                            width={"100%"}
                            rounded
                        // icon={<Icon color="white" size={20} name='rocket' />}
                        />

                    </View>

                </View>
            </ImageBackground>
        </SafeAreaView>
    )
}

export default index

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1, // This ensures that the background image covers the entire screen
        resizeMode: 'cover', // You can use 'cover', 'contain', or other resizeMode values
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: "100%",
        paddingHorizontal: 20,
        paddingVertical: 50,
        justifyContent: "space-between"
    },
    text: {
        fontSize: 24,
        color: 'white', // Text color on top of the background image
    },
});