import { StyleSheet, View } from 'react-native'
import React from 'react'
import { Text } from 'react-native-paper'
const notSpecified = 'Not Specified';
const ListRow = ({ label, value }) => {
  return (
    <View style={styles.row}>
    <Text style={{ flexBasis: '49%', fontSize: 14 }} variant='labelMedium'>
        {label}
    </Text>
    <Text style={{ flexBasis: '1%', fontSize: 14, fontWeight: "bold" }}>:</Text>
    <View style={{ width: '49%' }}>

        <Text style={{ fontSize: 14, flexWrap: 'wrap' }}>
            {value||notSpecified}
        </Text>
    </View>

</View>
  )
}

export default ListRow

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        // justifyContent:"space-between",
        alignItems: 'flex-start',
        paddingVertical: 5,
        gap: 6
    },
})