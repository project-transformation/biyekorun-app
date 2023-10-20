import { StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Searchbar, Text, TouchableRipple } from 'react-native-paper'
import Colors from '../constants/Colors'

const Selector = ({ options, multiple, onSelect, value, search }) => {

    const [searchQuery, setSearchQuery] = React.useState('');
    const [records, setRecords] = useState([])

    useEffect(() => {
        setRecords(options)
    }, [options])


    const onChangeSearch = query => {

        setSearchQuery(query)
        if (query) {
            let filtered = options?.filter(x => x.label?.toLowerCase()?.includes(query?.toLowerCase()))
            setRecords(filtered)
        } else {
            setRecords(options)
        }
    }

    return (
        <View style={{ width: "100%" }}>

            {
                search &&
                <Searchbar
                    placeholder="Search"
                    onChangeText={onChangeSearch}
                    value={searchQuery}
                    style={{ marginVertical: 10, width: "100%" }}
                    inputStyle={{paddingVertical:2}}
                />
            }


            <View style={{ flexDirection: "row", gap: 5, flexWrap: "wrap" }}>
                {
                    records?.map((option, i) => (
                        <TouchableRipple onPress={() => onSelect(option?.value)} key={i}>
                            <View style={{ borderColor: option?.value === value ? Colors.secondary : "#ddd", borderWidth: 2, paddingHorizontal: 7, paddingVertical: 5, borderRadius: 50 }} >
                                <Text style={{ color: option?.value === value ? Colors.secondary : Colors.textMedium }} variant='labelLarge'>{option?.label}</Text>
                            </View>
                        </TouchableRipple>

                    ))
                }
            </View>
        </View>

    )
}

export default Selector

const styles = StyleSheet.create({})