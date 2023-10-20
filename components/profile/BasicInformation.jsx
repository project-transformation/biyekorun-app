import { StyleSheet, View } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux';
import { Text } from 'react-native-paper';
import { calculateAge } from '../../lib/calculateAge';
import moment from 'moment';
import { heightCalculator } from '../../lib/heightCalculator';

const notSpecfied = "Not Specfied"

const BasicInformation = () => {

    const { profile } = useSelector(state => state.auth)
    const {
        location: { city, residencyStatus, zipCode } = {},
        doctrine: { caste, motherTongue } = {},
        appearance: { height, weight } = {},
        education: { college, education } = {},
        family: {
            familyCountry,
            familyCity,
            familyState,
            motherProfession,
            fatherProfession,
            type,
        } = {},
        lifestyle: { diet, maritalStatus } = {},
        profession: {
            employer,
            income: { min, max } = {},
            occupation,
            workingWith,
        } = {},
        trait: { aboutMe } = {},
        phone,
        profilePicture,
        // profilePicture: { url } = { url: null },
        fullName,
        firstName,
        lastName,
        userId,
        dateOfBirth,
        postedBy,
        religion,
        community,
        country,
        bloodGroup,
    } = profile || {};
    return (
        <View style={{padding:5}}>
            <View style={styles.row}>
                <Text style={{ flexBasis: "50%" ,fontSize:14}} variant='labelMedium'>Age</Text>
                <Text style={{fontSize:14}}>: {calculateAge(dateOfBirth)} Years</Text>
            </View>
            <View style={styles.row}>
                <Text style={{ flexBasis: "50%",fontSize:14 }} variant='labelMedium'>Marital Status</Text>
                <Text style={{fontSize:14}}>:  {maritalStatus || notSpecfied}</Text>
            </View>
            <View style={styles.row}>
                <Text style={{ flexBasis: "50%",fontSize:14 }} variant='labelMedium'>Date of Birth</Text>
                <Text style={{fontSize:14}}>: {moment(dateOfBirth).format("MM/DD/yyyy")}</Text>
            </View>
            <View style={styles.row}>
                <Text style={{ flexBasis: "50%",fontSize:14 }} variant='labelMedium'>Height</Text>
                <Text style={{fontSize:14}}>:  {heightCalculator(height)}</Text>
            </View>
            <View style={styles.row}>
                <Text style={{ flexBasis: "50%",fontSize:14 }} variant='labelMedium'>Born and Raised</Text>
                <Text style={{fontSize:14}}>:  {country}</Text>
            </View>
            <View style={styles.row}>
                <Text style={{ flexBasis: "50%",fontSize:14 }} variant='labelMedium'>Diet</Text>
                <Text style={{fontSize:14}}>:  {diet || notSpecfied}</Text>
            </View>
            <View style={styles.row}>
                <Text style={{ flexBasis: "50%",fontSize:14 }} variant='labelMedium'>Blood Group</Text>
                <Text style={{fontSize:14}}>:  {bloodGroup || notSpecfied}</Text>
            </View>
        </View>
    )
}

export default BasicInformation

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        // justifyContent:"space-between",
        alignItems: "center",
        paddingVertical:5
    }
})