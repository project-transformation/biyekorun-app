import { StyleSheet, View } from 'react-native'
import React from 'react'
import { Text, TouchableRipple } from 'react-native-paper'
import Colors from '../../constants/Colors'
import TextInput from '../TextInput'



const Email = ({ onChangeText, data }) => {





  return (
    <View>
      <Text style={{ fontWeight: "bold" }} variant='titleLarge'>Your email *</Text>
      <Text style={{color:Colors.textMedium}}>Your email allows us to send you important notifications and updates.</Text>
      <View style={styles.space}></View>
      <TextInput
        placeholder="Email *"
        mode='outlined'
        value={data?.email}
        onChangeText={text => onChangeText({ email: text })}

        style={{ width: "100%" }}
        color={Colors.primary}
        errorText={data?.errors?.email}
      

      />

    </View>
  )
}

export default Email

const styles = StyleSheet.create({
  space: {
    marginVertical: 5
  },
  item: {
    paddingVertical: 10,

  },
  title: {
    color: Colors.textMedium,
    // fontSize: 17
  }
})