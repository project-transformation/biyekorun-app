import React, { useRef, useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import DateField from '../DateField'

const DateOfBirthInput = ({ onChangeDate, data }) => {


    return (
        <View style={styles.container}>
            <Text style={{ fontWeight: "bold" }} variant='titleLarge'>When's your birthday *</Text>
            <Text>You birthday is required to find better match</Text>
            <View style={{ alignItems: "center", marginTop: 30 }}>

                <DateField
                    onChangeDate={onChangeDate}
                    errorText={data?.errors?.dateOfBirth}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {

    },
});

export default DateOfBirthInput;
