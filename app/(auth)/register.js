import React, { useState } from 'react';
import {
    Dimensions, SafeAreaView, StyleSheet, TouchableOpacity, View, Text, TextInput
} from 'react-native';
import * as Progress from 'react-native-progress';
import Ficon from 'react-native-vector-icons/FontAwesome';
import Constants from 'expo-constants';
import moment from 'moment';
import * as SecureStore from 'expo-secure-store';

// Components
import PostedBy from '../../components/register/PostedBy';
import Name from '../../components/register/Name';
import Gender from '../../components/register/Gender';
import Religion from '../../components/register/Religion';
import Community from '../../components/register/Community';
import Country from '../../components/register/Country';
import DOB from '../../components/register/DOB';
import Email from '../../components/register/Email';
import Password from '../../components/register/Password';
import Button from '../../components/Button';

// Constants
import Colors from '../../constants/Colors';
import axios from 'axios';
import { Alert } from 'react-native';
import axiosInstance from '../../lib/axiosInstance';

const Register = () => {
    // States
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [step, setStep] = useState(1);
    const [data, setData] = useState({
        postedBy: "",
        firstName: "",
        lastName: "",
        gender: "",
        religion: "",
        community: [],
        country: "",
        dateOfBirth: "",
        email: "",
        password: "",
        errors: {
            postedBy: "",
            firstName: "",
            lastName: "",
            gender: "",
            religion: "",
            community: "",
            country: "",
            dateOfBirth: "",
            email: "",
            password: "",
        }
    });

    // Data Handlers
    const handlePush = (item) => {
        const arr = data[item?.key] || [];
        const updatedArr = arr.includes(item?.value)
            ? arr.filter(x => x !== item?.value)
            : [...arr, item?.value];

        setData(prev => ({ ...prev, [item.key]: updatedArr }));
    };

    const handleDateChange = (date) => {
        setData(prev => ({ ...prev, dateOfBirth: date }));
    };



    // Validation function
    const validateData = () => {
        const errors = {
            postedBy: "",
            firstName: "",
            lastName: "",
            gender: "",
            religion: "",
            community: "",
            country: "",
            dateOfBirth: "",
            email: "",
            password: "",
        };

        let isValid = true;

        switch (step) {
            case 1:
                if (!data.postedBy) {
                    errors.postedBy = "Posted by is required";
                    isValid = false;
                }
                break;
            case 2:
                if (!data.firstName) {
                    errors.firstName = "First name is required";
                    isValid = false;
                }
                if (!data.lastName) {
                    errors.lastName = "Last name is required";
                    isValid = false;
                }
                break;
            case 3:
                if (!data.gender) {
                    errors.gender = "Gender is required";
                    isValid = false;
                }
                break;
            case 4:
                if (!data.religion) {
                    errors.religion = "Religion is required";
                    isValid = false;
                }
                break;
            case 5:
                if (data.community.length === 0) {
                    errors.community = "Select at least one community";
                    isValid = false;
                }
                break;
            case 6:
                if (!data.country) {
                    errors.country = "Country is required";
                    isValid = false;
                }
                break;
            case 7:
                if (!data.dateOfBirth) {
                    errors.dateOfBirth = 'Date of Birth is required';
                    isValid = false;
                } else {
                    // Check if the date is in a valid format using moment.js
                    const isValidDate = moment(data.dateOfBirth, 'MM/DD/YYYY', true).isValid();

                    if (!isValidDate) {
                        errors.dateOfBirth = 'Invalid date format';
                        isValid = false;
                    } else {
                        // Calculate age
                        const birthDate = moment(data.dateOfBirth, 'MM/DD/YYYY');
                        const currentDate = moment();
                        const age = currentDate.diff(birthDate, 'years');

                        // Check if age is at least 18
                        if (age < 18) {
                            errors.dateOfBirth = 'You must be at least 18 years old';
                            isValid = false;
                        }
                    }
                }
                break;
            case 8:
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
                break;
            case 9:
                if (!data.password) {
                    errors.password = 'Password is required';
                    isValid = false;

                } else if (data.password.length < 8) {
                    errors.password = 'Password must be at least 8 characters long';
                    isValid = false;

                } else if (!/[A-Z]/.test(data.password)) {
                    errors.password = 'Password must contain at least one uppercase letter';
                    isValid = false;

                } else if (!/[a-z]/.test(data.password)) {
                    errors.password = 'Password must contain at least one lowercase letter';
                    isValid = false;

                } else if (!/[@$!%*?&]/.test(data.password)) {
                    errors.password = 'Password must contain at least one special character';
                    isValid = false;

                }



                break;
            default:
                break;
        }

        setData(prev => ({ ...prev, errors }));
        return isValid;
    };

    // Component Render Functions
    const renderStepComponent = () => {
        switch (step) {
            case 1: return <PostedBy handlePress={value => setData(prev => ({ ...prev, ...value }))} data={data} />;
            case 2: return <Name onChangeText={value => setData(prev => ({ ...prev, ...value }))} data={data} />;
            case 3: return <Gender handlePress={value => setData(prev => ({ ...prev, ...value }))} data={data} />;
            case 4: return <Religion handlePress={value => setData(prev => ({ ...prev, ...value }))} data={data} />;
            case 5: return <Community handlePush={handlePush} data={data} />;
            case 6: return <Country handlePress={value => setData(prev => ({ ...prev, ...value }))} data={data} />;
            case 7: return <DOB onChangeDate={handleDateChange} handlePress={value => setData(prev => ({ ...prev, ...value }))} data={data} />;
            case 8: return <Email onChangeText={value => setData(prev => ({ ...prev, ...value }))} data={data} />;
            case 9: return <Password onChangeText={value => setData(prev => ({ ...prev, ...value }))} data={data} />;
            default: return <View></View>;
        }
    };

    const getDisabledData = () => {
        const errors = data.errors;

        switch (step) {
            case 1: return !data.postedBy || !!errors.postedBy;
            case 2: return (!data.firstName || !data.lastName) || (!!errors.firstName || !!errors.lastName);
            case 3: return !data.gender || !!errors.gender;
            case 4: return !data.religion || !!errors.religion;
            case 5: return data.community.length === 0 || !!errors.community;
            case 6: return !data.country || !!errors.country;
            case 7: return !data.dateOfBirth || !!errors.dateOfBirth;
            case 8: return !data.email || !!errors.email;
            case 9: return !data.password || !!errors.password;
            default: return true;
        }
    };


    // Button press handler
    const handleNext = () => {
        if (validateData()) {
            if (step === 9) {
                // If step is 9 and validation is successful, call handleSubmit function
                handleSubmit();
            } else {
                // Otherwise, proceed to the next step
                setStep(prev => prev + 1);
            }
        }
    };

    // Handle submit function for step 9
    const handleSubmit = () => {
        // Your submit logic goes here
        console.log("Form submitted successfully");
        // Add your logic to handle the form submission in step 9
        let registerData = {
            postedBy: data.postedBy,
            firstName: data.firstName,
            lastName: data.lastName,
            gender: data.gender,
            religion: data.religion,
            community: data.community,
            country: data.country,
            dateOfBirth: data.dateOfBirth,
            email: data.email,
            password: data.password,
        }
        setIsSubmitting(true)
        axiosInstance.post("/user/register",registerData)
        .then(async res=>{
            setIsSubmitting(false)
            console.log(res.data);
            await SecureStore.setItemAsync("biyekorun_token", res.data?.token?.accessToken);
            
            Alert.alert("Registered succesfully")
        })
        .catch(err=>{
            setIsSubmitting(false)
            Alert.alert(err.response?.data?.message)
            console.log(err);
        })
    };


    // Render
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white", marginTop: Constants.statusBarHeight }}>
            <Progress.Bar
                height={3}
                color={Colors.primary}
                progress={(step / 9)}
                width={Dimensions.get('window').width}
                unfilledColor="#e4e4e4"
                borderColor='#e4e4e4'
            />
            <View style={styles.wrapper}>
                <View>
                    {step > 1 && (
                        <TouchableOpacity onPress={() => setStep(prev => prev - 1)}>
                            <Ficon size={30} name='angle-left' />
                        </TouchableOpacity>
                    )}
                    {renderStepComponent()}
                </View>
                <Button
                    text={step === 9 ? "Submit" : "Next"}
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
    );
};

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        flexDirection: "column",
        paddingHorizontal: 20,
        gap: 10,
        paddingBottom: 20,
        justifyContent: "space-between",
    },
    errorText: {
        color: 'red',
        fontSize: 12,
    },
});

export default Register;
