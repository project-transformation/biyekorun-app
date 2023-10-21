import { AntDesign, FontAwesome5, Ionicons } from '@expo/vector-icons';
import { Link, router, Stack, useLocalSearchParams } from 'expo-router';
import { StyleSheet } from 'react-native';
import { Image, View } from 'react-native';
import { Text, TouchableRipple } from 'react-native-paper';
import Colors from '../constants/Colors';
import Constants from 'expo-constants';
import { StatusBar } from 'expo-status-bar';
import AboutMyself from '../components/profile/editProfile/AboutMyself';
import BasicInformation from '../components/profile/editProfile/BasicInformation';
import Religion from '../components/profile/editProfile/Religion';
import FamilyDetails from '../components/profile/editProfile/FamilyDetails';
import Education from '../components/profile/editProfile/Education';

const sections = {
    1: <AboutMyself />,
    2: <BasicInformation />,
    3: <Religion />,
    4: <FamilyDetails />,
    5: <Education />,
}

const EditProfile = () => {
    let params = useLocalSearchParams()

    // console.log(params);
    return (
        <View style={{ flex: 1, marginTop: Constants.statusBarHeight }}>

            {/* <Stack.Screen

                options={{
                    title: 'Edit Profile',
                    headerShown:false
                    // header: () => (
                    //     <View style={{ height: 55, backgroundColor: "#fff", flexDirection: "row", alignItems: "center", paddingHorizontal: 10, marginTop: Constants.statusBarHeight }}>
                    //         <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
                    //             <Ionicons onPress={() => router.back()} name="arrow-back" size={24} color={Colors.primary} />
                    //             <Text style={{ color: Colors.primary, fontWeight: "bold" }} variant='titleLarge'>{params?.title || "Edit Profile"}</Text>
                    //         </View>
                    //     </View>
                    // )
                }}
            /> */}

            <View style={{ height: 55, backgroundColor: "#fff", flexDirection: "row", alignItems: "center", paddingHorizontal: 10, }}>
                <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
                    <Ionicons onPress={() => router.back()} name="arrow-back" size={24} color={Colors.primary} />
                    <Text style={{ color: Colors.primary, fontWeight: "bold" }} variant='titleLarge'>{params?.title || "Edit Profile"}</Text>
                </View>
            </View>





            {sections[parseInt(params?.section)]}






        </View>
    );
}


export default EditProfile



const styles = StyleSheet.create({


})