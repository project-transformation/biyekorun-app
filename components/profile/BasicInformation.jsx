import { StyleSheet, View } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux';
import { Text } from 'react-native-paper';
import { calculateAge } from '../../lib/calculateAge';
import moment from 'moment';
import { heightCalculator } from '../../lib/heightCalculator';
import ListRow from './ListRow';

const notSpecfied = "Not Specified"

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
        <View style={{ padding: 5 }}>

            <ListRow
                label={"Age"}
                value={`${calculateAge(dateOfBirth)} Years`}
            />
            <ListRow
                label={"Marital Status"}
                value={maritalStatus}
            />
            <ListRow
                label={"Date of Birth"}
                value={moment(dateOfBirth).format("MM/DD/yyyy")}
            />
            <ListRow
                label={"Height"}
                value={heightCalculator(height)}
            />
            <ListRow
                label={"Born and Raised"}
                value={country}
            />
            <ListRow
                label={"Diet"}
                value={diet}
            />
            <ListRow
                label={"Blood Group"}
                value={bloodGroup}
            />

        </View>
    )
}

export default BasicInformation

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        // justifyContent:"space-between",
        alignItems: "center",
        paddingVertical: 5
    }
})