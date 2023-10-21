import { StyleSheet, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native'
import Constants from 'expo-constants';
import TextInput from '../../components/TextInput';
import { Text } from 'react-native-paper';
import Colors from '../../constants/Colors';
import Button from '../../components/Button';
import axiosInstance from '../../lib/axiosInstance';
import { Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import * as SecureStore from 'expo-secure-store';
import { router } from 'expo-router';
import { setUser } from '../../store/reducer/authSlice';

const login = () => {
    const dispatch = useDispatch()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [data, setData] = useState({

        email: "",
        password: "",
        errors: {
            email: "",
            password: "",
        }
    });





    // Validation function
    const validateData = () => {
        const errors = {
            email: "",
            password: "",
        };

        let isValid = true;


        if (!data.email) {
            errors.email = 'Email is required';
            isValid = false;
        } else {
            // Check if the email is in a valid format using a regular expression
            const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
            if (!emailRegex.test(data.email)) {
                errors.email = 'Invalid email format';
                isValid = false;
            }
        }

        if (!data.password) {
            errors.password = 'Password is required';
            isValid = false;

        }

        setData(prev => ({ ...prev, errors }));
        return isValid;
    };
    // Handle submit function for step 9
    const handleSubmit = () => {

        let loginData = {
            email: data.email,
            password: data.password,
        }
        setIsSubmitting(true)
        axiosInstance.post("/user/login", loginData)
            .then(async res => {
                setIsSubmitting(false)
                // console.log(res.data);
                await SecureStore.setItemAsync("biyekorun_token", res.data?.token?.accessToken);
                dispatch(setUser(res.data?.data))

                router.push("/(tabs)/home")
            })
            .catch(err => {
                setIsSubmitting(false)
                Alert.alert(err.response?.data?.message)
                console.log(err);
            })
    };

    // Button press handler
    const handleNext = () => {

        if (validateData()) {
            handleSubmit();
        }
    };
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white", marginTop: Constants.statusBarHeight }}>
            <View style={styles.wrapper}>
                <View>
                    <View style={{ marginTop: 20 }}>
                        <Text style={{ fontWeight: "bold" }} variant='titleLarge'>Your email *</Text>
                        <View style={styles.space}></View>
                        <TextInput
                            placeholder="Email *"
                            mode='outlined'
                            value={data?.email}
                            onChangeText={text => setData(prev => ({ ...prev, email: text }))}

                            style={{ width: "100%" }}
                            color={Colors.primary}
                            errorText={data?.errors?.email}


                        />

                    </View>
                    <View style={{ marginTop: 20 }}>
                        <Text style={{ fontWeight: "bold" }} variant='titleLarge'>Your password *</Text>
                        <View style={styles.space}></View>
                        <TextInput
                            placeholder="Password *"
                            mode='outlined'
                            value={data?.password}
                            onChangeText={text => setData(prev => ({ ...prev, password: text }))}

                            style={{ width: "100%" }}
                            color={Colors.primary}
                            errorText={data?.errors?.password}
                            secureTextEntry


                        />

                    </View>
                </View>


                <Button
                    text={"Login"}
                    onPress={handleNext}
                    textColor={"#fff"}
                    buttonColor={Colors.primary}
                    variant="contained"
                    width={"100%"}
                    rounded
                    loading={isSubmitting}
                // disabled={getDisabledData()}
                />
            </View>
        </SafeAreaView>
    )
}

export default login

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        flexDirection: "column",
        paddingHorizontal: 20,
        gap: 10,
        paddingBottom: 20,
        justifyContent: "space-between",
    }
})