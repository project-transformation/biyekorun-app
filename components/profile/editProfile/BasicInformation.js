import { StyleSheet, View } from 'react-native'
import React, { useCallback, useMemo, useRef, useState } from 'react'
import TextInput from '../../TextInput'
import Colors from '../../../constants/Colors'
import { ActivityIndicator, Text, TouchableRipple } from 'react-native-paper'
import { AntDesign, FontAwesome5, Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import { heightCalculator } from '../../../lib/heightCalculator'
import {
    BottomSheetModal,
    BottomSheetModalProvider,
    BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import CustomBackdrop from '../../../lib/CustomBackdrop'
import { bloodGroups, contries, heights, maritalStatuses } from '../../../constants/staticData'
import DateFiled from '../../DateField'
import Selector from '../../Selector'
import axiosInstance from '../../../lib/axiosInstance'
import { Alert } from 'react-native'
import { getUserData } from '../../../actions/userActions'
const BasicInformation = () => {
    const dispatch = useDispatch()

    // ref
    const bottomSheetModalRef = useRef(null);

    // variables
    const snapPoints = useMemo(() => ['75%', '100%']);

    // callbacks
    const handlePresentModalPress = useCallback((filed) => {
        setSelectedField(filed)
        bottomSheetModalRef.current?.present();
    }, []);
    // callbacks
    const handleCloseModalPress = useCallback(() => {
        setSelectedField("")
        bottomSheetModalRef.current?.close();
    }, []);
    const handleSheetChanges = useCallback((index) => {
        // console.log('handleSheetChanges', index);
    }, []);

    const { profile } = useSelector(state => state.auth)
    const [isLoading, setIsLoading] = useState(false)
    const {
        appearance: { height, weight } = {},
        lifestyle: { diet, maritalStatus } = {},
        dateOfBirth,
        country,
        bloodGroup,
    } = profile || {};

    const [selectedFiled, setSelectedField] = useState('')

    const [formValues, setFormValues] = useState({
        diet: diet ? diet : "",
        bloodGroup: bloodGroup ? bloodGroup : "",
        maritalStatus: maritalStatus ? maritalStatus : "",
        height: height ? height : "",
        dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : "",
        country: country ? country : ""
    });

    const [errors, setErrors] = useState({
        dateOfBirth: ""
    })

    const [tempDob, setTempDob] = useState("")


    const handleSetDate = () => {
        // Check if the date is in a valid format using moment.js
        const isValidDate = moment(tempDob, 'MM/DD/YYYY', true).isValid();

        if (!isValidDate) {
            setErrors(prev => ({ ...prev, dateOfBirth: "Invalid date" }))
        } else {
            // Calculate age
            const birthDate = moment(tempDob, 'MM/DD/YYYY');
            const currentDate = moment();
            const age = currentDate.diff(birthDate, 'years');

            // Check if age is at least 18
            if (age < 18) {
                setErrors(prev => ({ ...prev, dateOfBirth: 'You must be at least 18 years old' }))

            } else {
                setFormValues(prev => ({ ...prev, dateOfBirth: moment(tempDob, "MM/DD/YYYY").toISOString() }))
                handleCloseModalPress()
            }
        }
    }



    const handleSubmit = () => {
        const { bloodGroup, maritalStatus, diet, dateOfBirth, height, country } = formValues;

        const data = {
            lifestyle: { diet, maritalStatus },
            appearance: { height },
            dateOfBirth,
            bloodGroup,
            country
        };
        setIsLoading(true);
        axiosInstance
            .patch("/user/update-user-profile", data)
            .then((res) => {
                setIsLoading(false);
                dispatch(getUserData())
                router.back()

            })
            .catch((err) => {
                setIsLoading(false);
                Alert.alert(err?.response?.data?.message)
            });
    };


    return (
        <BottomSheetModalProvider  >
            <View style={styles.wrapper}>

                <View style={[styles.itemsContainer, { flex: 1 }]}>
                    <View style={{ padding: 5 }}>

                        <View style={styles.row}>
                            <Text style={{ flexBasis: "50%", fontSize: 14 }} variant='labelMedium'>Marital Status</Text>
                            <TouchableRipple onPress={() => handlePresentModalPress("maritalStatus")} style={{ flex: 1 }}>
                                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", flex: 1 }}>
                                    <Text style={{ fontSize: 14 }}>:  {formValues.maritalStatus || notSpecfied}</Text>
                                    <AntDesign name="right" size={14} color="black" />
                                </View>
                            </TouchableRipple>
                        </View>




                        <View style={styles.row}>
                            <Text style={{ flexBasis: "50%", fontSize: 14 }} variant='labelMedium'>Date of Birth</Text>
                            <TouchableRipple onPress={() => handlePresentModalPress("dateOfBirth")} style={{ flex: 1 }}>
                                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", flex: 1 }}>
                                    <Text style={{ fontSize: 14 }}>: {moment(formValues.dateOfBirth).format("MM/DD/yyyy")}</Text>
                                    <AntDesign name="right" size={14} color="black" />
                                </View>
                            </TouchableRipple>
                        </View>


                        <View style={styles.row}>
                            <Text style={{ flexBasis: "50%", fontSize: 14 }} variant='labelMedium'>Height</Text>

                            <TouchableRipple onPress={() => handlePresentModalPress("height")} style={{ flex: 1 }}>
                                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", flex: 1 }}>
                                    <Text style={{ fontSize: 14 }}>: {heightCalculator(formValues.height)}</Text>
                                    <AntDesign name="right" size={14} color="black" />
                                </View>
                            </TouchableRipple>

                        </View>
                        <View style={styles.row}>
                            <Text style={{ flexBasis: "50%", fontSize: 14 }} variant='labelMedium'>Born and Raised</Text>


                            <TouchableRipple onPress={() => handlePresentModalPress("country")} style={{ flex: 1 }}>
                                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", flex: 1 }}>
                                    <Text style={{ fontSize: 14 }}>: {country}</Text>
                                    <AntDesign name="right" size={14} color="black" />
                                </View>
                            </TouchableRipple>




                        </View>
                        <View style={styles.row}>
                            <Text style={{ flexBasis: "50%", fontSize: 14 }} variant='labelMedium'>Diet</Text>

                            <TouchableRipple onPress={() => handlePresentModalPress("diet")} style={{ flex: 1 }}>
                                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", flex: 1 }}>
                                    <Text style={{ fontSize: 14 }}>:  {formValues.diet || notSpecfied}</Text>
                                    <AntDesign name="right" size={14} color="black" />
                                </View>
                            </TouchableRipple>
                        </View>


                        <View style={styles.row}>
                            <Text style={{ flexBasis: "50%", fontSize: 14 }} variant='labelMedium'>Blood Group</Text>


                            <TouchableRipple onPress={() => handlePresentModalPress("bloodGroup")} style={{ flex: 1 }}>
                                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", flex: 1 }}>
                                    <Text style={{ fontSize: 14 }}>:  {formValues.bloodGroup || notSpecfied}</Text>
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
                            selectedFiled === 'maritalStatus' ?
                                <View>
                                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingBottom: 10 }}>
                                        <Ionicons onPress={() => handleCloseModalPress("close")} name="ios-close-sharp" size={28} color={Colors.textLight} />
                                        <Ionicons onPress={() => handleCloseModalPress("check")} name="checkmark-sharp" size={28} color={Colors.textLight} />
                                    </View>
                                    <Text style={{ marginBottom: 10 }} variant='titleLarge'>Marital Status:</Text>
                                    <View style={{ flexDirection: "row", gap: 5, flexWrap: "wrap" }}>

                                        <Selector
                                            options={maritalStatuses?.map(item => ({ label: item, value: item }))}
                                            value={formValues.maritalStatus}
                                            onSelect={value => setFormValues(prev => ({ ...prev, maritalStatus: value }))}

                                        />

                                    </View>
                                </View> :
                                selectedFiled === 'dateOfBirth' ?
                                    <View>
                                        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingBottom: 10 }}>
                                            <Ionicons onPress={() => handleCloseModalPress("close")} name="ios-close-sharp" size={28} color={Colors.textLight} />
                                            <Ionicons onPress={() => handleSetDate()} name="checkmark-sharp" size={28} color={Colors.textLight} />
                                        </View>
                                        <Text style={{ marginBottom: 10 }} variant='titleLarge'>Date of Birth:</Text>
                                        <View style={{ flexDirection: "column", gap: 5, flexWrap: "wrap", alignItems: "center" }}>
                                            <DateFiled
                                                onChangeDate={date => setTempDob(date)}
                                                errorText={errors.dateOfBirth}
                                            />
                                        </View>
                                    </View> :

                                    selectedFiled === 'height' ?
                                        <View>
                                            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingBottom: 10 }}>
                                                <Ionicons onPress={() => handleCloseModalPress("close")} name="ios-close-sharp" size={28} color={Colors.textLight} />
                                                <Ionicons onPress={() => handleCloseModalPress("check")} name="checkmark-sharp" size={28} color={Colors.textLight} />
                                            </View>
                                            <Text style={{ marginBottom: 10 }} variant='titleLarge'>Height:</Text>
                                            <View style={{ flexDirection: "row", gap: 5, flexWrap: "wrap" }}>

                                                <Selector
                                                    options={heights}
                                                    value={formValues.height}
                                                    onSelect={value => setFormValues(prev => ({ ...prev, height: value }))}

                                                />


                                            </View>
                                        </View> :

                                        selectedFiled === 'country' ?
                                            <View>
                                                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingBottom: 10 }}>
                                                    <Ionicons onPress={() => handleCloseModalPress("close")} name="ios-close-sharp" size={28} color={Colors.textLight} />
                                                    <Ionicons onPress={() => handleCloseModalPress("check")} name="checkmark-sharp" size={28} color={Colors.textLight} />
                                                </View>
                                                <Text style={{ marginBottom: 10 }} variant='titleLarge'>Country:</Text>
                                                <View style={{ flexDirection: "row", gap: 5, flexWrap: "wrap", paddingBottom: 20 }}>
                                                    <Selector
                                                        options={contries.map(country => ({ label: country?.name, value: country?.name }))}
                                                        value={formValues.country}
                                                        onSelect={value => setFormValues(prev => ({ ...prev, country: value }))}
                                                        search
                                                    />

                                                </View>
                                            </View> :
                                            selectedFiled === 'diet' ?
                                                <View>
                                                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingBottom: 10 }}>
                                                        <Ionicons onPress={() => handleCloseModalPress("close")} name="ios-close-sharp" size={28} color={Colors.textLight} />
                                                        <Ionicons onPress={() => handleCloseModalPress("check")} name="checkmark-sharp" size={28} color={Colors.textLight} />
                                                    </View>
                                                    <Text style={{ marginBottom: 10 }} variant='titleLarge'>Diet:</Text>
                                                    <View style={{ flexDirection: "row", gap: 5, flexWrap: "wrap", paddingBottom: 20 }}>
                                                        <Selector
                                                            options={[{ label: "Veg", value: "Veg" }, { label: "Non-Veg", value: "Non-Veg" }]}
                                                            value={formValues.diet}
                                                            onSelect={value => setFormValues(prev => ({ ...prev, diet: value }))}

                                                        />

                                                    </View>
                                                </View> :
                                                selectedFiled === 'bloodGroup' ?
                                                    <View>
                                                        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingBottom: 10 }}>
                                                            <Ionicons onPress={() => handleCloseModalPress("close")} name="ios-close-sharp" size={28} color={Colors.textLight} />
                                                            <Ionicons onPress={() => handleCloseModalPress("check")} name="checkmark-sharp" size={28} color={Colors.textLight} />
                                                        </View>
                                                        <Text style={{ marginBottom: 10 }} variant='titleLarge'>Blood Group:</Text>
                                                        <View style={{ flexDirection: "row", gap: 5, flexWrap: "wrap", paddingBottom: 20 }}>
                                                            <Selector
                                                                options={bloodGroups?.map(item => ({ label: item, value: item }))}
                                                                value={formValues.bloodGroup}
                                                                onSelect={value => setFormValues(prev => ({ ...prev, bloodGroup: value }))}

                                                            />

                                                        </View>
                                                    </View> :

                                                    <></>
                        }
                    </BottomSheetScrollView>
                </BottomSheetModal>
            </View>






        </BottomSheetModalProvider>
    )
}

export default BasicInformation

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
        // justifyContent:"space-between",
        alignItems: "center",
        paddingVertical: 10,
        borderBottomColor: "#e4e4e4",
        borderBottomWidth: 2,
        height:50

    }
})