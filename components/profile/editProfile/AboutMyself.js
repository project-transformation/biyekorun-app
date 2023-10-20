import { StyleSheet, View, TextInput, Alert } from 'react-native'
import React, { useState } from 'react'

import Colors from '../../../constants/Colors'
import { ActivityIndicator, Text, TouchableRipple } from 'react-native-paper'
import { AntDesign, FontAwesome5 } from '@expo/vector-icons'
import { router } from 'expo-router'
import axiosInstance from '../../../lib/axiosInstance'
import { useDispatch, useSelector } from 'react-redux'
import { getUserData } from '../../../actions/userActions'

const AboutMyself = () => {
  const dispatch = useDispatch()
  const { profile } = useSelector(state => state.auth)
  const {
      trait: { aboutMe } = {},

  } = profile || {};
  const [isLoding, setIsLoading] = useState(false)
  const [text, setText] = useState(aboutMe)

  const handleSubmit = () => {
    let data = {
      trait: {
        aboutMe: text
      }
    }


    setIsLoading(true)
    axiosInstance.patch("/user/update-user-profile", data)
      .then(res => {
        setIsLoading(false)
        dispatch(getUserData())
        router.back()
      })
      .catch(err => {
        setIsLoading(false)
        console.log(err);
        Alert.alert(err?.response?.data?.message)
      })
  }
  return (
    <View style={styles.wrapper}>
      <View style={[styles.itemsContainer, { flex: 1 }]}>
        <TextInput
          placeholder='Write something about yourself'
          style={{ height: 150, textAlignVertical: 'top', backgroundColor: "white", padding: 5 }}
          value={text}
          onChangeText={value => setText(value)}
          multiline={true}
          numberOfLines={4}
        />

      </View>

      <View style={{ flexDirection: "row", gap: 1 }}>
        <TouchableRipple onPress={() => router.back()} style={{ flexBasis: "50%", alignItems: "center", paddingVertical: 15, backgroundColor: "#fff" }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <AntDesign name="back" size={24} color={Colors.textLight} />
            <Text style={{ color: Colors.textLight }} variant='labelLarge'>Cancel</Text>
          </View>

        </TouchableRipple>
        <TouchableRipple onPress={()=>handleSubmit()} disabled={isLoding} style={{ flexBasis: "50%", alignItems: "center", paddingVertical: 15, backgroundColor: "#fff" }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            {
              isLoding ?
                <ActivityIndicator /> :
                <>
                  <FontAwesome5 name="save" size={24} color={Colors.textLight} />
                  <Text style={{ color: Colors.textLight }} variant='labelLarge'>Save</Text>
                </>
            }

          </View>

        </TouchableRipple>

      </View>
    </View>
  )
}

export default AboutMyself

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: "space-between",
  },
  itemsContainer: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
})