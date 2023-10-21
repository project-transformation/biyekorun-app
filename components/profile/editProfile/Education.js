import { StyleSheet, View } from 'react-native';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import TextInput from '../../TextInput';
import Colors from '../../../constants/Colors';
import { ActivityIndicator, Text, TouchableRipple } from 'react-native-paper';
import { AntDesign, FontAwesome5, Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { heightCalculator } from '../../../lib/heightCalculator';
import {
    BottomSheetModal,
    BottomSheetModalProvider,
    BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import CustomBackdrop from '../../../lib/CustomBackdrop';
import { bloodGroups, colleges, companies, contries, heights, incomes, maritalStatuses, motherTongues, professions, qualifications, worksWithsOwn } from '../../../constants/staticData';
import DateFiled from '../../DateField';
import Selector from '../../Selector';
import axiosInstance from '../../../lib/axiosInstance';
import { Alert } from 'react-native';
import { getUserData } from '../../../actions/userActions';

const notSpecified = "Not Specified";

const religions = [
    "Islam",
    "Hinduism",
    "Christianity",
    "Buddhism",
    "Judaism",
    "Others",
];

const Education = () => {
    const dispatch = useDispatch();

    // ref
    const bottomSheetModalRef = useRef(null);

    // variables
    const snapPoints = useMemo(() => ['75%', '100%']);

    // callbacks
    const handlePresentModalPress = useCallback((field) => {
        setSelectedField(field);
        bottomSheetModalRef.current?.present();
    }, []);

    // callbacks
    const handleCloseModalPress = useCallback(() => {
        setSelectedField("");
        bottomSheetModalRef.current?.close();
    }, []);

    const handleSheetChanges = useCallback((index) => {
        // console.log('handleSheetChanges', index);
    }, []);

    const { profile } = useSelector(state => state.auth);
    const [isLoading, setIsLoading] = useState(false);

    const {
        education: { education, college } = {},
        profession: {
            employer,
            income: { min, max } = {},
            occupation,
            workingWith,
        } = {},
    } = profile || {};

    const [selectedField, setSelectedField] = useState('');

    const [formValues, setFormValues] = useState({
        employer: employer ? employer : "",
        education: education ? education : "",
        workingWith: workingWith ? workingWith : "",
        occupation: occupation ? occupation : "",
        income: { min, max },
        college: college ? college : "",
    });

    const handleSubmit = () => {
        const {
            employer,
            income,
            occupation,
            workingWith,
            education,
            college,
          } = formValues;
      
          const data = {
            education: { education, college },
            profession: {
              employer,
              income,
              occupation,
              workingWith,
            },
          };

        setIsLoading(true);
        axiosInstance
            .patch("/user/update-user-profile", data)
            .then((res) => {
                setIsLoading(false);
                dispatch(getUserData());
                router.back();
            })
            .catch((err) => {
                setIsLoading(false);
                Alert.alert(err?.response?.data?.message);
            });
    };





    return (
        <BottomSheetModalProvider>
            <View style={styles.wrapper}>
                <View style={[styles.itemsContainer, { flex: 1 }]}>
                    <View style={{ padding: 5 }}>
                        <View style={styles.row}>
                            <Text style={{ flexBasis: "50%", fontSize: 14 }} variant='labelMedium'>Highest Qualification</Text>
                            <TouchableRipple onPress={() => handlePresentModalPress("education")} style={{ flex: 1 }}>
                                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", flex: 1 }}>
                                    <Text style={{ fontSize: 14 }}>: {formValues.education || notSpecified}</Text>
                                    <AntDesign name="right" size={14} color="black" />
                                </View>
                            </TouchableRipple>
                        </View>
                        <View style={styles.row}>
                            <Text style={{ flexBasis: "50%", fontSize: 14 }} variant='labelMedium'>College(S) Attended</Text>
                            <TouchableRipple onPress={() => handlePresentModalPress("college")} style={{ flex: 1 }}>
                                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", flex: 1 }}>
                                    <Text style={{ fontSize: 14 }}>: {formValues.college || notSpecified}</Text>
                                    <AntDesign name="right" size={14} color="black" />
                                </View>
                            </TouchableRipple>
                        </View>
                        <View style={styles.row}>
                            <Text style={{ flexBasis: "50%", fontSize: 14 }} variant='labelMedium'>Yearly Income</Text>
                            <TouchableRipple onPress={() => handlePresentModalPress("income")} style={{ flex: 1 }}>
                                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", flex: 1 }}>
                                    <Text style={{ fontSize: 14, flexWrap: "wrap" }}>: {`$${formValues.income.min || 0} / $${formValues.income.max || 0}`}</Text>
                                    <AntDesign name="right" size={14} color="black" />
                                </View>
                            </TouchableRipple>
                        </View>
                        <View style={styles.row}>
                            <Text style={{ flexBasis: "50%", fontSize: 14 }} variant='labelMedium'>Job Sector</Text>
                            <TouchableRipple onPress={() => handlePresentModalPress("workingWith")} style={{ flex: 1 }}>
                                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", flex: 1 }}>
                                    <Text style={{ fontSize: 14, flexWrap: "wrap" }}>: {formValues.workingWith || notSpecified}</Text>
                                    <AntDesign name="right" size={14} color="black" />
                                </View>
                            </TouchableRipple>
                        </View>
                        <View style={styles.row}>
                            <Text style={{ flexBasis: "50%", fontSize: 14 }} variant='labelMedium'>Job Title</Text>
                            <TouchableRipple onPress={() => handlePresentModalPress("occupation")} style={{ flex: 1 }}>
                                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", flex: 1 }}>
                                    <Text style={{ fontSize: 14, flexWrap: "wrap" }}>: {formValues.occupation || notSpecified}</Text>
                                    <AntDesign name="right" size={14} color="black" />
                                </View>
                            </TouchableRipple>
                        </View>
                        <View style={styles.row}>
                            <Text style={{ flexBasis: "50%", fontSize: 14 }} variant='labelMedium'>Company</Text>
                            <TouchableRipple onPress={() => handlePresentModalPress("employer")} style={{ flex: 1 }}>
                                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", flex: 1 }}>
                                    <Text style={{ fontSize: 14, flexWrap: "wrap" }}>: {formValues.employer || notSpecified}</Text>
                                    <AntDesign name="right" size={14} color="black" />
                                </View>
                            </TouchableRipple>
                        </View>
                    </View>
                </View>
                <View style={{ flexDirection: "row", gap: 1 }}>
                    <TouchableRipple onPress={() => router.back()} style={{ flexBasis: "50%", alignItems: "center", paddingVertical: 15, backgroundColor: "#fff" }}>
                        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                            <AntDesign name="back" size={24} color={Colors.textLight} />
                            <Text style={{ color: Colors.textLight }} variant='labelLarge'>Cancel</Text>
                        </View>
                    </TouchableRipple>
                    <TouchableRipple onPress={() => handleSubmit()} disabled={isLoading} style={{ flexBasis: "50%", alignItems: "center", paddingVertical: 15, backgroundColor: "#fff" }}>
                        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                            {
                                isLoading ?
                                    <ActivityIndicator /> :
                                    <>
                                        <FontAwesome5 name="save" size={24} color={Colors.textLight} />
                                        <Text style={{ color: Colors.textLight }} variant='labelLarge'>Save</Text>
                                    </>
                            }
                        </View>
                    </TouchableRipple>
                </View>
                <BottomSheetModal
                    backdropComponent={CustomBackdrop}
                    ref={bottomSheetModalRef}
                    index={0}
                    snapPoints={snapPoints}
                    onChange={handleSheetChanges}
                >
                    <BottomSheetScrollView style={[styles.itemsContainer]}>
                        {
                            selectedField === 'education' ?
                                <View>
                                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingBottom: 10 }}>
                                        <Ionicons onPress={() => handleCloseModalPress("close")} name="ios-close-sharp" size={28} color={Colors.textLight} />
                                        <Ionicons onPress={() => handleCloseModalPress("check")} name="checkmark-sharp" size={28} color={Colors.textLight} />
                                    </View>
                                    <Text style={{ marginBottom: 10 }} variant='titleLarge'>Highest Qualification:</Text>
                                    <View style={{ flexDirection: "row", gap: 5, flexWrap: "wrap" }}>
                                        <Selector
                                            options={qualifications?.map(item => ({ label: item, value: item }))}
                                            value={formValues.education}
                                            onSelect={value => setFormValues(prev => ({ ...prev, education: value }))}
                                        />
                                    </View>
                                </View> :
                                selectedField === 'college' ?
                                    <View>
                                        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingBottom: 10 }}>
                                            <Ionicons onPress={() => handleCloseModalPress("close")} name="ios-close-sharp" size={28} color={Colors.textLight} />
                                            <Ionicons onPress={() => handleCloseModalPress("check")} name="checkmark-sharp" size={28} color={Colors.textLight} />
                                        </View>
                                        <Text style={{ marginBottom: 10 }} variant='titleLarge'>College:</Text>
                                        <View style={{ flexDirection: "column", gap: 5, flexWrap: "wrap", alignItems: "center" }}>
                                            <Selector
                                                options={colleges?.slice(0, 300)?.map(item => ({ label: item?.name, value: item?.name }))}
                                                value={formValues.college}
                                                onSelect={value => setFormValues(prev => ({ ...prev, college: value }))}
                                                search
                                            />
                                        </View>
                                    </View> :
                                    selectedField === 'income' ?
                                        <View>
                                            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingBottom: 10 }}>
                                                <Ionicons onPress={() => handleCloseModalPress("close")} name="ios-close-sharp" size={28} color={Colors.textLight} />
                                                <Ionicons onPress={() => handleCloseModalPress("check")} name="checkmark-sharp" size={28} color={Colors.textLight} />
                                            </View>
                                            <Text style={{ marginBottom: 10 }} variant='titleLarge'>Yearly Income:</Text>
                                            <View style={{ flexDirection: "column", gap: 5, flexWrap: "wrap", alignItems: "center" }}>
                                                <Selector
                                                    options={incomes}
                                                    value={formValues.income}
                                                    onSelect={value => setFormValues(prev => ({ ...prev, income: value }))}
                                                    search
                                                />
                                            </View>
                                        </View> :
                                    selectedField === 'workingWith' ?
                                        <View>
                                            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingBottom: 10 }}>
                                                <Ionicons onPress={() => handleCloseModalPress("close")} name="ios-close-sharp" size={28} color={Colors.textLight} />
                                                <Ionicons onPress={() => handleCloseModalPress("check")} name="checkmark-sharp" size={28} color={Colors.textLight} />
                                            </View>
                                            <Text style={{ marginBottom: 10 }} variant='titleLarge'>Job Sector:</Text>
                                            <View style={{ flexDirection: "column", gap: 5, flexWrap: "wrap", alignItems: "center" }}>
                                                <Selector
                                                    options={worksWithsOwn?.map(item=>({label:item, value:item}))}
                                                    value={formValues.workingWith}
                                                    onSelect={value => setFormValues(prev => ({ ...prev, workingWith: value }))}
                                                    
                                                />
                                            </View>
                                        </View> :
                                    selectedField === 'occupation' ?
                                        <View>
                                            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingBottom: 10 }}>
                                                <Ionicons onPress={() => handleCloseModalPress("close")} name="ios-close-sharp" size={28} color={Colors.textLight} />
                                                <Ionicons onPress={() => handleCloseModalPress("check")} name="checkmark-sharp" size={28} color={Colors.textLight} />
                                            </View>
                                            <Text style={{ marginBottom: 10 }} variant='titleLarge'>Job Title:</Text>
                                            <View style={{ flexDirection: "column", gap: 5, flexWrap: "wrap", alignItems: "center" }}>
                                                <Selector
                                                    options={professions?.map(item=>({label:item, value:item}))}
                                                    value={formValues.occupation}
                                                    onSelect={value => setFormValues(prev => ({ ...prev, occupation: value }))}
                                                    search
                                                />
                                            </View>
                                        </View> :
                                    selectedField === 'employer' ?
                                        <View>
                                            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingBottom: 10 }}>
                                                <Ionicons onPress={() => handleCloseModalPress("close")} name="ios-close-sharp" size={28} color={Colors.textLight} />
                                                <Ionicons onPress={() => handleCloseModalPress("check")} name="checkmark-sharp" size={28} color={Colors.textLight} />
                                            </View>
                                            <Text style={{ marginBottom: 10 }} variant='titleLarge'>Company:</Text>
                                            <View style={{ flexDirection: "column", gap: 5, flexWrap: "wrap", alignItems: "center" }}>
                                                <Selector
                                                    options={companies?.map(item=>({label:item, value:item}))}
                                                    value={formValues.employer}
                                                    onSelect={value => setFormValues(prev => ({ ...prev, employer: value }))}
                                                    search
                                                />
                                            </View>
                                        </View> :

                                        <></>
                        }
                        <View style={{ marginTop: 30 }}></View>
                    </BottomSheetScrollView>
                </BottomSheetModal>
            </View>
        </BottomSheetModalProvider>
    );
};

export default Education;

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        justifyContent: "space-between",
    },
    itemsContainer: {
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 10,
        borderBottomColor: "#e4e4e4",
        borderBottomWidth: 2,
        height: 60,
    },
});
