import { StyleSheet, View } from 'react-native'
import React from 'react'
import { Text, TouchableRipple } from 'react-native-paper'
import { FlatList } from 'react-native'
import Colors from '../../constants/Colors'
import EntypoIcon from 'react-native-vector-icons/Entypo'
import { motherTongues } from '../../constants/staticData'




const Community = ({ handlePush, data }) => {

    const Item = ({ item }) => (
        <TouchableRipple onPress={() => handlePush({key:"community", value: item })} style={styles.item}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>

                {data?.community?.includes(item) ? (
                    <Text variant='titleMedium' style={[styles.title, { fontWeight: 'bold',color:"black" }]}>
                        {item}
                    </Text>
                ) : (
                    <Text variant='titleMedium'>{item}</Text>
                )}    
                
                {        
                    data?.community?.includes(item) && <EntypoIcon color={Colors.secondary} size={23} name='check' />
                }


            </View>


        </TouchableRipple>
    );



    return (
        <View>
            <Text style={{ fontWeight: "bold" }} variant='titleLarge'>Community *</Text>
            <Text>You can select multiple</Text>

            {data?.errors?.community && <Text style={{color:"red"}}>{data?.errors?.community}</Text>}

            <FlatList
                data={motherTongues}
                renderItem={({ item }) => <Item item={item} />}
                keyExtractor={item => item}
                style={{flexBasis:"70%"}}
            />
        </View>
    )
}

export default Community

const styles = StyleSheet.create({
    item: {
        paddingVertical: 10,

    },
    title: {
        color: Colors.textMedium,
        // fontSize: 17
    }
})