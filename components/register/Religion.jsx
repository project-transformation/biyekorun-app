import { StyleSheet, View } from 'react-native'
import React from 'react'
import { Text, TouchableRipple } from 'react-native-paper'
import { FlatList } from 'react-native'
import Colors from '../../constants/Colors'
import EntypoIcon from 'react-native-vector-icons/Entypo'


const DATA =  [
    { _id: 'Islam', value: 'Islam' },
    { _id: 'Hinduism', value: 'Hinduism' },
    { _id: 'Christianity', value: 'Christianity' },
    { _id: 'Buddhism', value: 'Buddhism' },
    { _id: 'Judaism', value: 'Judaism' },
    { _id: 'Others', value: 'Others' },
]

const Religion = ({ handlePress, data }) => {

    const Item = ({ item }) => (
        <TouchableRipple onPress={() => handlePress({ religion: item?.value })} >
            <View style={[styles.item,{backgroundColor:data?.religion === item?.value ? Colors.secondary:"#fff"}]}>

                <Text variant='titleMedium' style={[styles.title, { fontWeight: 'bold', color: data?.religion === item?.value ? Colors.textWhite:"black" }]}>
                    {item?.value}
                </Text>


            </View>


        </TouchableRipple>
    );



    return (
        <View>
            <Text style={{ fontWeight: "bold" }} variant='titleLarge'>Religion *</Text>
            <Text style={{color:Colors.textMedium}}>Your religion helps us understand your background</Text>
            {data?.errors?.religion && <Text style={{color:"red"}}>{data?.errors?.religion}</Text>}


            <FlatList
                data={DATA}
                renderItem={({ item }) => <Item item={item} />}
                keyExtractor={item => item._id}

            />
        </View>
    )
}

export default Religion

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