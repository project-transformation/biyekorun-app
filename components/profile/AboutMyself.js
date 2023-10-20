import { StyleSheet, View } from 'react-native'
import React from 'react'
import { Text } from 'react-native-paper'
import Colors from '../../constants/Colors'
import { useSelector } from 'react-redux'

const AboutMyself = () => {
    const { profile } = useSelector(state => state.auth)
    const {
        trait: { aboutMe } = {},

    } = profile || {};
    return (
        <>
            <Text style={{ color: Colors.textMedium, padding: 5, fontSize: 14 }}>
                {aboutMe || ""}
            </Text>
        </>
    )
}

export default AboutMyself

const styles = StyleSheet.create({})