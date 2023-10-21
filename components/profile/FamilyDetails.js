import { StyleSheet, View } from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';
import { Text } from 'react-native-paper';
import ListRow from './ListRow';

const notSpecified = 'Not Specified';

const FamilyDetails = () => {
    const { profile } = useSelector((state) => state.auth);
    const {
        family: {
            familyCountry,
            familyCity,
            familyState,
            motherProfession,
            fatherProfession,
            type,
        } = {},
    } = profile || {};


    return (
        <View style={{ padding: 5 }}>


            <ListRow
                label={"Father's Profession"}
                value={fatherProfession}
            />
            <ListRow
                label={"Mother's Profession"}
                value={motherProfession}
            />
            <ListRow
                label={"Family Type"}
                value={type}
            />
            <ListRow
                label={"Family Location"}
                value={`${familyCity || notSpecified}, ${familyState || notSpecified}, ${familyCountry || notSpecified}`}
            />


        </View>
    );
};

export default FamilyDetails;

