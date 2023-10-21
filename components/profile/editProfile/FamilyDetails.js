import { StyleSheet, View } from 'react-native';
import React, { useCallback, useMemo, useRef, useState, useEffect } from 'react';
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
import { bloodGroups, contries, heights, maritalStatuses, motherTongues } from '../../../constants/staticData';
import DateFiled from '../../DateField';
import Selector from '../../Selector';
import axiosInstance from '../../../lib/axiosInstance';
import { Alert } from 'react-native';
import { getUserData } from '../../../actions/userActions';
import { getCities, getCountries, getStatesForCountry } from '../../../lib/countryApi';

const notSpecified = 'Not Specified';

const types = [
    "Nuclear Family",
    "Extended Family",
    "Step Family",
    "Same Sex Family",
    "Grandparent Family",
    "Single Parent Family",
]

const FamilyDetails = () => {
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

    const {
        family: {
            familyCountry,
            familyCity,
            familyState,
            motherProfession,
            fatherProfession,
            type,
        } = {},
    } = profile || {};
    const [isLoading, setIsLoading] = useState(false);


    const [countries, setCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState(familyCountry);
    const [isCountryLoading, setIsCountryLoading] = useState(false);

    const [states, setStates] = useState([]);
    const [selectedState, setSelectedState] = useState(familyState);
    const [isStateLoading, setIsStateLoading] = useState(false);

    const [cities, setCities] = useState([]);
    const [selectedCity, setSelectedCity] = useState(familyCity);
    const [isCityLoading, setIsCityLoading] = useState(false);






    const [selectedField, setSelectedField] = useState('');

    const [formValues, setFormValues] = useState({
        fatherProfession: fatherProfession ? fatherProfession : "",
        motherProfession: motherProfession ? motherProfession : "",
        type: type ? type : "",
    });

    const handleSubmit = () => {
        const { motherProfession, fatherProfession, type } = formValues;

        const data = {
            family: {
                familyCountry: selectedCountry,
                familyCity: selectedCity,
                familyState: selectedState,
                motherProfession,
                fatherProfession,
                type,
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



    useEffect(() => {
        setIsCityLoading(true)
        getCountries()
            .then((result) => {
                const convertedList = result?.data.data?.map((item) => ({
                    label: item?.name,
                    value: item?.name,
                }));
                setCountries(convertedList);
                setIsCityLoading(false)
            })
            .catch(err => {
                setIsCityLoading(false)

            })
    }, []);

    useEffect(() => {
        if (selectedCountry) {
            setIsStateLoading(true)
            getStatesForCountry(selectedCountry).then((result) => {
                const convertedList = result?.data.data?.states.map((item) => ({
                    label: item?.name,
                    value: item?.name,
                }));

                setStates(convertedList);
                setIsStateLoading(false)
            })
                .catch(err => {
                    setIsStateLoading(false)

                })


            setStates([]);
            setCities([]);
        }
    }, [selectedCountry]);

    useEffect(() => {
        if (selectedCountry && selectedState) {
            setIsCityLoading(true)
            getCities(selectedCountry, selectedState).then((result) => {
                // console.log("result.data.data", result.data.data);

                // console.log(result.data);


                const convertedList = result?.data.data?.map((item) => ({
                    label: item,
                    value: item,
                }));



                setCities(convertedList);
                setIsCityLoading(false)

            })
                .catch(err => {
                    setIsCityLoading(false)

                })

            setCities([]);
            //   setSelectedCity("");
        }
    }, [selectedState]);

    return (
        <BottomSheetModalProvider>
            <View style={styles.wrapper}>
                <View style={[styles.itemsContainer, { flex: 1 }]}>
                    <View style={{ padding: 5 }}>
                        <View style={styles.row}>
                            <Text style={{ flexBasis: "50%", fontSize: 14 }} variant='labelMedium'>Father's Profession</Text>
                            <TouchableRipple onPress={() => handlePresentModalPress("fatherProfession")} style={{ flex: 1 }}>
                                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", flex: 1 }}>
                                    <Text style={{ fontSize: 14 }}>: {formValues.fatherProfession || notSpecified}</Text>
                                    <AntDesign name="right" size={14} color="black" />
                                </View>
                            </TouchableRipple>
                        </View>
                        <View style={styles.row}>
                            <Text style={{ flexBasis: "50%", fontSize: 14 }} variant='labelMedium'>Mother's Profession</Text>
                            <TouchableRipple onPress={() => handlePresentModalPress("motherProfession")} style={{ flex: 1 }}>
                                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", flex: 1 }}>
                                    <Text style={{ fontSize: 14 }}>: {formValues.motherProfession || notSpecified}</Text>
                                    <AntDesign name="right" size={14} color="black" />
                                </View>
                            </TouchableRipple>
                        </View>
                        <View style={styles.row}>
                            <Text style={{ flexBasis: "50%", fontSize: 14 }} variant='labelMedium'>Family Type</Text>
                            <TouchableRipple onPress={() => handlePresentModalPress("type")} style={{ flex: 1 }}>
                                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", flex: 1 }}>
                                    <Text style={{ fontSize: 14, flexWrap: "wrap" }}>: {formValues.type || notSpecified}</Text>
                                    <AntDesign name="right" size={14} color="black" />
                                </View>
                            </TouchableRipple>
                        </View>
                        <View style={styles.row}>
                            <Text style={{ flexBasis: "50%", fontSize: 14 }} variant='labelMedium'>Country</Text>
                            <TouchableRipple onPress={() => handlePresentModalPress("familyCountry")} style={{ flex: 1 }}>
                                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", flex: 1 }}>
                                    <Text style={{ fontSize: 14, flexWrap: "wrap" }}>: {selectedCountry || notSpecified}</Text>
                                    <AntDesign name="right" size={14} color="black" />
                                </View>
                            </TouchableRipple>
                        </View>
                        <View style={styles.row}>
                            <Text style={{ flexBasis: "50%", fontSize: 14 }} variant='labelMedium'>State</Text>
                            <TouchableRipple onPress={() => handlePresentModalPress("familyState")} style={{ flex: 1 }}>
                                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", flex: 1 }}>
                                    <Text style={{ fontSize: 14, flexWrap: "wrap" }}>: {selectedState || notSpecified}</Text>
                                    <AntDesign name="right" size={14} color="black" />
                                </View>
                            </TouchableRipple>
                        </View>
                        <View style={styles.row}>
                            <Text style={{ flexBasis: "50%", fontSize: 14 }} variant='labelMedium'>City</Text>
                            <TouchableRipple onPress={() => handlePresentModalPress("familyCity")} style={{ flex: 1 }}>
                                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", flex: 1 }}>
                                    <Text style={{ fontSize: 14, flexWrap: "wrap" }}>: {selectedCity || notSpecified}</Text>
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
                            selectedField === 'fatherProfession' ?
                                <View>
                                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingBottom: 10 }}>
                                        <Ionicons onPress={() => handleCloseModalPress("close")} name="ios-close-sharp" size={28} color={Colors.textLight} />
                                        <Ionicons onPress={() => handleCloseModalPress("check")} name="checkmark-sharp" size={28} color={Colors.textLight} />
                                    </View>
                                    <Text style={{ marginBottom: 10 }} variant='titleLarge'>Father's Profession:</Text>
                                    <View style={{ flexDirection: "row", gap: 5, flexWrap: "wrap", width: "100%" }}>
                                        <TextInput
                                            value={formValues.fatherProfession}
                                            onChangeText={value => setFormValues(prev => ({ ...prev, fatherProfession: value }))}
                                            customStyle={{ width: "100%" }}
                                            placeholder="Write your father's profession"
                                        />
                                    </View>
                                </View> :
                                selectedField === 'motherProfession' ?
                                    <View>
                                        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingBottom: 10 }}>
                                            <Ionicons onPress={() => handleCloseModalPress("close")} name="ios-close-sharp" size={28} color={Colors.textLight} />
                                            <Ionicons onPress={() => handleCloseModalPress("check")} name="checkmark-sharp" size={28} color={Colors.textLight} />
                                        </View>
                                        <Text style={{ marginBottom: 10 }} variant='titleLarge'>Mother's Profession:</Text>
                                        <View style={{ flexDirection: "row", gap: 5, flexWrap: "wrap", width: "100%" }}>
                                            <TextInput
                                                value={formValues.motherProfession}
                                                onChangeText={value => setFormValues(prev => ({ ...prev, motherProfession: value }))}
                                                customStyle={{ width: "100%" }}
                                                placeholder="Write your mother's profession"
                                            />
                                        </View>
                                    </View> :
                                    selectedField === 'type' ?
                                        <View>
                                            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingBottom: 10 }}>
                                                <Ionicons onPress={() => handleCloseModalPress("close")} name="ios-close-sharp" size={28} color={Colors.textLight} />
                                                <Ionicons onPress={() => handleCloseModalPress("check")} name="checkmark-sharp" size={28} color={Colors.textLight} />
                                            </View>
                                            <Text style={{ marginBottom: 10 }} variant='titleLarge'>Family Type:</Text>
                                            <View style={{ flexDirection: "column", gap: 5, flexWrap: "wrap", alignItems: "center" }}>
                                                <Selector
                                                    options={types?.map(item => ({ label: item, value: item }))}
                                                    value={formValues.type}
                                                    onSelect={value => setFormValues(prev => ({ ...prev, type: value }))}

                                                />
                                            </View>
                                        </View> :
                                        selectedField === 'familyCountry' ?
                                            <View>
                                                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingBottom: 10 }}>
                                                    <Ionicons onPress={() => { handleCloseModalPress("close") }} name="ios-close-sharp" size={28} color={Colors.textLight} />
                                                    <Ionicons onPress={() => handleCloseModalPress("check")} name="checkmark-sharp" size={28} color={Colors.textLight} />
                                                </View>
                                                <Text style={{ marginBottom: 10 }} variant='titleLarge'>Country:</Text>
                                                <View style={{ flexDirection: "column", gap: 5, flexWrap: "wrap", alignItems: "center" }}>
                                                    {
                                                        isCountryLoading ?
                                                            <ActivityIndicator /> :
                                                            <Selector
                                                                options={countries}
                                                                value={selectedCountry}
                                                                onSelect={value => setSelectedCountry(value)}
                                                                search
                                                            />
                                                    }

                                                </View>
                                            </View> :
                                            selectedField === 'familyState' ?
                                                <View>
                                                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingBottom: 10 }}>
                                                        <Ionicons onPress={() => { handleCloseModalPress("close") }} name="ios-close-sharp" size={28} color={Colors.textLight} />
                                                        <Ionicons onPress={() => handleCloseModalPress("check")} name="checkmark-sharp" size={28} color={Colors.textLight} />
                                                    </View>
                                                    <Text style={{ marginBottom: 10 }} variant='titleLarge'>State:</Text>
                                                    <View style={{ flexDirection: "column", gap: 5, flexWrap: "wrap", alignItems: "center" }}>
                                                        {
                                                            isStateLoading ?
                                                                <ActivityIndicator /> :
                                                                <Selector
                                                                    options={states}
                                                                    value={selectedState}
                                                                    onSelect={value => setSelectedState(value)}
                                                                    search
                                                                />
                                                        }

                                                    </View>
                                                </View> :
                                                selectedField === 'familyCity' ?
                                                    <View>
                                                        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingBottom: 10 }}>
                                                            <Ionicons onPress={() => { handleCloseModalPress("close") }} name="ios-close-sharp" size={28} color={Colors.textLight} />
                                                            <Ionicons onPress={() => handleCloseModalPress("check")} name="checkmark-sharp" size={28} color={Colors.textLight} />
                                                        </View>
                                                        <Text style={{ marginBottom: 10 }} variant='titleLarge'>City:</Text>
                                                        <View style={{ flexDirection: "column", gap: 5, flexWrap: "wrap", alignItems: "center" }}>
                                                            {
                                                                isCityLoading ?
                                                                    <ActivityIndicator /> :
                                                                    <Selector
                                                                        options={cities}
                                                                        value={selectedCity}
                                                                        onSelect={value => setSelectedCity(value)}
                                                                        search
                                                                    />
                                                            }

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

export default FamilyDetails;

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
