import { StyleSheet, View } from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';
import { Text } from 'react-native-paper';
import ListRow from './ListRow';

const notSpecified = 'Not Specified';

const Education = () => {
    const { profile } = useSelector((state) => state.auth);
    const {
        education: { education, college } = {},
        profession: {
            employer,
            income: { min, max } = {},
            occupation,
            workingWith,
        } = {},
    } = profile || {};


    return (
        <View style={{ padding: 5 }}>


            <ListRow
                label={"Highest Qualification"}
                value={education}
            />
            <ListRow
                label={"College(S) Attended"}
                value={college}
            />
            <ListRow
                label={"Yearly Income"}
                value={`$${min||0} / $${max||0}`}
            />
            <ListRow
                label={"Job Sector"}
                value={workingWith}
            />
            <ListRow
                label={"Job Title"}
                value={occupation}
            />
            <ListRow
                label={"Company"}
                value={employer}
            />
       

        </View>
    );
};

export default Education;

