import { StyleSheet, View, ScrollView } from 'react-native'
import React from 'react'
import ProfileInfoCard from '../../../components/home/ProfileInfoCard'
import { Text } from 'react-native-paper'
import { Foundation } from '@expo/vector-icons'
import Colors from '../../../constants/Colors'
import BasicInformation from '../../../components/profile/BasicInformation'
import { Link, router } from 'expo-router'
import AboutMyself from '../../../components/profile/AboutMyself'
import Religion from '../../../components/profile/Religion'
import FamilyDetails from '../../../components/profile/FamilyDetails'
import Education from '../../../components/profile/Education'



const profile = () => {
    return (
        <View style={styles.wrapper}>
            <ProfileInfoCard />
            <ScrollView style={styles.itemsContainer}>
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



                <View style={{ marginTop: 20 }}>
                    <View style={styles.sectionTitle}>
                        <Text variant='labelLarge' style={{ color: Colors.primary }}>Religion</Text>

                        <Link href={{
                            pathname: "/editprofile",
                            params: {
                                title: "Religion",
                                section: 3
                            }
                        }}>

                            <Foundation name="pencil" size={24} color={Colors.primary} />
                        </Link>
                    </View>
                    <View>
                        <Religion />
                    </View>
                </View>




                <View style={{ marginTop: 20 }}>
                    <View style={styles.sectionTitle}>
                        <Text variant='labelLarge' style={{ color: Colors.primary }}>Family Details</Text>

                        <Link href={{
                            pathname: "/editprofile",
                            params: {
                                title: "Family Details",
                                section: 4
                            }
                        }}>

                            <Foundation name="pencil" size={24} color={Colors.primary} />
                        </Link>
                    </View>
                    <View>
                        <FamilyDetails />
                    </View>
                </View>
                <View style={{ marginTop: 20 }}>
                    <View style={styles.sectionTitle}>
                        <Text variant='labelLarge' style={{ color: Colors.primary }}>Education & Career</Text>

                        <Link href={{
                            pathname: "/editprofile",
                            params: {
                                title: "Education & Career",
                                section: 5
                            }
                        }}>

                            <Foundation name="pencil" size={24} color={Colors.primary} />
                        </Link>
                    </View>
                    <View>
                        <Education />
                    </View>
                </View>

                <View style={{ marginTop: 30 }}></View>

            </ScrollView>


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