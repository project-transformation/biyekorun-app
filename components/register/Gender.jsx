import { StyleSheet, View } from 'react-native'
import React from 'react'
import { Text, TouchableRipple } from 'react-native-paper'
import { FlatList } from 'react-native'
import Colors from '../../constants/Colors'
import EntypoIcon from 'react-native-vector-icons/Entypo'


const DATA = [
    { _id: 'Male', value: 'Male' },
    { _id: 'Female', value: 'Female' }
]

const Gender = ({ handlePress, data }) => {

    const Item = ({ item }) => (
        <TouchableRipple onPress={() => handlePress({ gender: item?.value })} >
            <View style={[styles.item,{backgroundColor:data?.gender === item?.value ? Colors.secondary:"#fff"}]}>

                <Text variant='titleMedium' style={[styles.title, { fontWeight: 'bold', color: data?.gender === item?.value ? Colors.textWhite:"black" }]}>
                    {item?.value}
                </Text>


            </View>


        </TouchableRipple>
    );



    return (
        <View>
            <Text style={{ fontWeight: "bold" }} variant='titleLarge'>Gender *</Text>
            <Text style={{color:Colors.textMedium}}>Gender is important for matching preferences</Text>

            {data?.errors?.gender && <Text style={{color:"red"}}>{data?.errors?.gender}</Text>}

            <FlatList
                data={DATA}
                renderItem={({ item }) => <Item item={item} />}
                keyExtractor={item => item._id}

            />
        </View>
    )
}

export default Gender

const styles = StyleSheet.create({
    item: {
        paddingVertical: 10,
        borderColor: Colors.secondary,
        borderWidth: 1,
        borderRadius: 50,
        flexDirection:"row",
        justifyContent: "center",
        alignItems:"center",
        marginVertical:10


    },
    title: {
        color: Colors.textMedium,
        textAlign: "center"
        // fontSize: 17
    }
})