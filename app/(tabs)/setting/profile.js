import { StyleSheet, View } from 'react-native'
import React from 'react'
import ProfileInfoCard from '../../../components/home/ProfileInfoCard'
import { Text } from 'react-native-paper'
import { Foundation } from '@expo/vector-icons'
import Colors from '../../../constants/Colors'
import BasicInformation from '../../../components/profile/BasicInformation'
import { Link, router } from 'expo-router'
import AboutMyself from '../../../components/profile/AboutMyself'



const profile = () => {
    return (
        <View style={styles.wrapper}>
            <ProfileInfoCard />
            <View style={styles.itemsContainer}>
                <View>
                    <View style={styles.sectionTitle}>
                        <Text variant='labelLarge' style={{ color: Colors.primary }}>About myself</Text>
                        <Link href={{
                            pathname: "/editprofile",
                            params: {
                                title: "About myself",
                                section: 1
                            }
                        }}>
                            <Foundation name="pencil" size={24} color={Colors.primary} />
                        </Link>
                    </View>
                    <View>
                        <AboutMyself />
                    </View>
                </View>


                <View style={{ marginTop: 20 }}>
                    <View style={styles.sectionTitle}>
                        <Text variant='labelLarge' style={{ color: Colors.primary }}>Basic information</Text>

                        <Link href={{
                            pathname: "/editprofile",
                            params: {
                                title: "Basic information",
                                section: 2
                            }
                        }}>

                            <Foundation name="pencil" size={24} color={Colors.primary} />
                        </Link>
                    </View>
                    <View>
                        <BasicInformation />
                    </View>
                </View>

            </View>


        </View>
    )
}

export default profile

const styles = StyleSheet.create({
    wrapper: {
        flex: 1
    },
    itemsContainer: {
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    sectionTitle: {
        backgroundColor: Colors.primaryLight,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 5,
        paddingHorizontal: 7
    }
})