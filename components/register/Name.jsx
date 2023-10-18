import { StyleSheet, View } from 'react-native'
import React from 'react'
import { Text, TouchableRipple } from 'react-native-paper'
import { FlatList } from 'react-native'
import Colors from '../../constants/Colors'
import EntypoIcon from 'react-native-vector-icons/Entypo'
import TextInput from '../TextInput'


const DATA = [
    { _id: 'My Son', value: 'My Son' },
    { _id: 'My Daughter', value: 'My Daughter' },
    { _id: 'My Brother', value: 'My Brother' },
    { _id: 'My Sister', value: 'My Sister' },
    { _id: 'My Friend', value: 'My Friend' },
    { _id: 'My Relative', value: 'My Relative' },
]

const Name = ({ onChangeText, data }) => {





    return (
        <View>
            <Text style={{ fontWeight: "bold" }} variant='titleLarge'>Your first name *</Text>
            <TextInput
                placeholder="First Name *"
                mode='outlined'
                value={data?.firstName}
                onChangeText={text => onChangeText({ firstName: text })}

                style={{ width: "100%" }}
                color={Colors.primary}
                errorText={data?.errors?.firstName}

            />
            <View style={styles.space}></View>
            <Text style={{ fontWeight: "bold" }} variant='titleLarge'>Your last name *</Text>
            <TextInput
                placeholder="Last Name *"
                mode='outlined'
                value={data?.lastName}
                onChangeText={text => onChangeText({ lastName: text })}
                style={{ width: "100%" }}
                color={Colors.primary}
                errorText={data?.errors?.lastName}
                



            />
        </View>
    )
}

export default Name

const styles = StyleSheet.create({
    space:{
        marginVertical:30
    },
    item: {
        paddingVertical: 10,

    },
    title: {
        color: Colors.textMedium,
        // fontSize: 17
    }
})