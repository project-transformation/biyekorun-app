import { StyleSheet, View } from 'react-native'
import React from 'react'
import { Text, TouchableRipple } from 'react-native-paper'
import Colors from '../../constants/Colors'
import TextInput from '../TextInput'



const Password = ({ onChangeText, data }) => {


  return (
    <View>
      <Text style={{ fontWeight: "bold" }} variant='titleLarge'>Your password *</Text>
      <Text style={{color:Colors.textMedium}}>Your password ensures your account's security and privacy. Please choose a strong and unique combination.</Text>
      <View style={styles.space}></View>
      <TextInput
        placeholder="Password *"
        mode='outlined'
        value={data?.password}
        onChangeText={text => onChangeText({ password: text })}

        style={{ width: "100%" }}
        color={Colors.primary}
        secureTextEntry
        errorText={data?.errors?.password}

      />
     

    </View>
  )
}

export default Password

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