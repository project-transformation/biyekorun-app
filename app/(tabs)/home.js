import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import ProfileInfoCard from '../../components/home/ProfileInfoCard'

const home = () => {
  const {profile} = useSelector(state=>state.auth)

  
  return (
    <View style={{flex:1,backgroundColor:"#FEFEFE"}}>
      <ProfileInfoCard />
     
    </View>
  )
}

export default home

const styles = StyleSheet.create({})