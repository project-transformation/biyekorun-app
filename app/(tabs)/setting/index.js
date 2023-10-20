import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { AntDesign, Entypo, FontAwesome, FontAwesome5, Ionicons } from '@expo/vector-icons';
import { Text, TouchableRipple } from 'react-native-paper';
import Colors from '../../../constants/Colors';
import ProfileInfoCard from '../../../components/home/ProfileInfoCard';
import { logout } from '../../../store/reducer/authSlice';
import { router } from 'expo-router';

const lists = [
  {
    title: 'My Profile',
    icon: <FontAwesome5 name="user-edit" size={24} color={Colors.textLight} />,
    onPress: () => router.push("/setting/profile"),
  },
  {
    title: 'Shortlist',
    icon: <Ionicons name="md-star" size={24} color={Colors.textLight} />,
    onPress: () => null,
  },
  {
    title: 'Connections',
    icon: <Entypo name="plus" size={24} color={Colors.textLight} />,
    onPress: () => null,
  },
  {
    title: 'Partner preferences',
    icon: <FontAwesome5 name="users-cog" size={24} color={Colors.textLight} />,
    onPress: () => null,
  },
  {
    title: 'Account setting',
    icon: <FontAwesome name="gear" size={24} color={Colors.textLight} />,
    onPress: () => null,
  },
  {
    title: 'Log out',
    icon: <Entypo name="log-out" size={24} color="red" />,
    onPress: (dispatch) => {
      dispatch(logout());
    },
  },
];

const Setting = () => {
  const dispatch = useDispatch();

  return (
    <View style={styles.wrapper}>
      <ProfileInfoCard />
      <View style={styles.itemsContainer}>
        {lists.map((item, i) => (
          <TouchableRipple onPress={() => item.onPress(dispatch)} key={i}>
            <View style={styles.item}>
              <View style={styles.icon}>{item.icon}</View>
              <Text
                style={{
                  color: item.title === 'Log out' ? 'red' : Colors.textLight,
                }}
                variant="titleMedium"
              >
                {item.title}
              </Text>
            </View>
          </TouchableRipple>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  itemsContainer: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  item: {
    flexDirection: 'row',
    gap: 10,
    paddingVertical: 10,
  },
  icon: {
    flexBasis: 30,
  },
});

export default Setting;
