import { StyleSheet, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Text, TouchableRipple } from 'react-native-paper'
import { FlatList } from 'react-native'
import Colors from '../../constants/Colors'
import EntypoIcon from 'react-native-vector-icons/Entypo'
import axios from 'axios'
import { contries } from '../../constants/staticData'


const Country = ({ handlePress, data }) => {



    const Item = ({ item }) => (
        <TouchableRipple onPress={() => handlePress({ country: item?.name })} style={styles.item}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>

                {data?.country === item?.name ? (
                    <Text variant='titleMedium' style={[styles.title, { fontWeight: 'bold', color: "black" }]}>
                        {item?.name}
                    </Text>
                ) : (
                    <Text variant='titleMedium'>{item?.name}</Text>
                )}

                {
                    data?.country === item?.name && <EntypoIcon color={Colors.secondary} size={23} name='check' />
                }


            </View>


        </TouchableRipple>
    );



    return (
        <View>
            <Text style={{ fontWeight: "bold" }} variant='titleLarge'>Country *</Text>
            {data?.errors?.country && <Text style={{color:"red"}}>{data?.errors?.country}</Text>}
            <FlatList
                data={contries}
                renderItem={({ item }) => <Item item={item} />}
                keyExtractor={item => item.id}
                style={{flexBasis:"75%"}}
            />
        </View>
    )
}

export default Country

const styles = StyleSheet.create({
    item: {
        paddingVertical: 10,

    },
    title: {
        color: Colors.textMedium,
        // fontSize: 17
    }
})