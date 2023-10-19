
import React, { useEffect } from 'react';


import { Text, View, Image, StyleSheet, Platform, Dimensions } from 'react-native';

import { useSelector } from 'react-redux'
import Colors from '../constants/Colors';

const windowWidth = Dimensions.get('window').width;




const MainHeader = () => {
    const { isAuthenticated, user } = useSelector(state => state.auth)


    return (
        <View style={styles.wrapper}>
            <Image
                style={{ width:143}}
                resizeMode='contain'
                source={require('../assets/images/logo.png')}
            />


        </View>
    );
}



export default MainHeader


const styles = StyleSheet.create({
    wrapper: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: windowWidth,
        paddingHorizontal: 10,
        paddingVertical:5,
        backgroundColor: Colors.primaryBold,
        height:55
    }
})