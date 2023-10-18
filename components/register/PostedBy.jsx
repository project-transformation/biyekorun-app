import { StyleSheet, View } from 'react-native'
import React from 'react'
import { Text, TouchableRipple } from 'react-native-paper'
import { FlatList } from 'react-native'
import Colors from '../../constants/Colors'
import EntypoIcon from 'react-native-vector-icons/Entypo'


const DATA = [
    { _id: 'My Son', value: 'My Son' },
    { _id: 'My Daughter', value: 'My Daughter' },
    { _id: 'My Brother', value: 'My Brother' },
    { _id: 'My Sister', value: 'My Sister' },
    { _id: 'My Friend', value: 'My Friend' },
    { _id: 'My Relative', value: 'My Relative' },
]

const PostedBy = ({ handlePress, data }) => {

    const Item = ({ item }) => (
        <TouchableRipple onPress={() => handlePress({ postedBy: item?.value })} style={styles.item}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>

                {data?.postedBy === item?.value ? (
                    <Text variant='titleMedium' style={[styles.title, { fontWeight: 'bold',color:"black" }]}>
                        {item?.value}
                    </Text>
                ) : (
                    <Text variant='titleMedium'>{item?.value}</Text>
                )}    
                
                {        
                    data?.postedBy === item?.value && <EntypoIcon color={Colors.secondary} size={23} name='check' />
                }


            </View>


        </TouchableRipple>
    );



    return (
        <View>
            <Text style={{ fontWeight: "bold" }} variant='titleLarge'>Profile For *</Text>
            {data?.errors?.postedBy && <Text style={{color:"red"}}>{data?.errors?.postedBy}</Text>}
            <FlatList
                data={DATA}
                renderItem={({ item }) => <Item item={item} />}
                keyExtractor={item => item._id}
            />
        </View>
    )
}

export default PostedBy

const styles = StyleSheet.create({
    item: {
        paddingVertical: 10,

    },
    title: {
        color: Colors.textMedium,
        // fontSize: 17
    }
})