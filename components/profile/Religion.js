import { StyleSheet, View } from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';
import { Text } from 'react-native-paper';
import ListRow from './ListRow';


const Religion = () => {
    const { profile } = useSelector((state) => state.auth);
    const {
        doctrine: { caste, motherTongue } = {},
        religion,
        community,
    } = profile || {};

    return (
        <View style={{ padding: 5 }}>

            <ListRow
                label={"Religion"}
                value={religion}
            />
            <ListRow
                label={"Native Language"}
                value={motherTongue}
            />
            <ListRow
                label={"Language"}
                value={community?.map((x, i) => `${x}${i !== community?.length - 1 ? ', ' : ' '}`)}
            />

        </View>
    );
};

export default Religion;


