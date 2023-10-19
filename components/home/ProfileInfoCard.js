import { StyleSheet, View } from 'react-native'
import React from 'react'
import { Avatar, Text } from 'react-native-paper'
import { useSelector } from 'react-redux'
import Colors from '../../constants/Colors'
import { Platform } from 'react-native'
import { Feather } from '@expo/vector-icons'
import * as Progress from 'react-native-progress';
import { Dimensions } from 'react-native'


const ProfileInfoCard = () => {
    const { profile } = useSelector(state => state.auth)
    return (
        <View style={styles.cardWrapper}>
            <View >
                <Avatar.Image style={{ height: 60, width: 60 }} />
            </View>
            <View style={{ flex: 1 }}>

                <View style={[styles.row, { justifyContent: "space-between" }]}>
                    <View>
                        <Text style={{ textTransform: "capitalize", color: Colors.primary }} variant='titleLarge'>{profile?.firstName} {profile?.lastName}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text variant='labelLarge' style={{ color: Colors.textMedium, marginRight: 4 }}>Edit profile</Text>
                        <Feather name="edit" size={18} color="black" />
                    </View>
                </View>
                <View style={[styles.row, { justifyContent: "space-between" }]}>
                    <View>
                        <Text variant='labelLarge'>{profile?.userId}</Text>
                    </View>
                    {/* <View>
                        <Text variant='bodyMedium' style={{color:Colors.textMedium}}>Your profile is not completed</Text>
                    </View> */}
                </View>
                <View style={[styles.row, { justifyContent: "space-between" }]}>
                    <View>
                        <Text variant='labelLarge'>Free membership</Text>
                    </View>
                    {/* <View>
                        <Text>Edit profile</Text>
                    </View> */}
                </View>

                <View style={{ marginTop: 10 }}>

                    <Progress.Bar
                        height={5}
                        color={Colors.primary}
                        progress={.3}
                        // style={{ width: null }}
                        width={250}
                        
                        unfilledColor="#e4e4e4"

                        borderColor='#e4e4e4'
                    />
                    <Text variant='labelMedium'>Your profile is 30% completed</Text>
                </View>



            </View>

        </View>
    )
}

export default ProfileInfoCard

const styles = StyleSheet.create({
    cardWrapper: {
        flexDirection: 'row',
        padding: 10,
        gap: 7,
        alignItems: 'center',
        backgroundColor: '#F7F7F7', // Add a background color
        ...Platform.select({
            ios: {
                shadowColor: 'rgba(0, 0, 0, 0.5)',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.8,
                shadowRadius: 4,
            },
            android: {
                elevation: 3,
            },
        }),
    },
    row: {
        flexDirection: 'row',
        alignItems: "center"
    }
})