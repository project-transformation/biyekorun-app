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
import { bloodGroups, contries, heights, maritalStatuses, motherTongues } from '../../../constants/staticData';
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

const Religion = () => {
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
        doctrine: { caste, motherTongue } = {},
        religion,
        community,
    } = profile || {};

    const [selectedField, setSelectedField] = useState('');

    const [formValues, setFormValues] = useState({
        religion: religion || '',
        motherTongue: motherTongue || '',
        community: community || [],
    });

    const handleSubmit = () => {
        const { religion, motherTongue, community } = formValues;

        const data = {
            religion,
            doctrine: { motherTongue },
            community,
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
                            <Text style={{ flexBasis: "50%", fontSize: 14 }} variant='labelMedium'>Religion</Text>
                            <TouchableRipple onPress={() => handlePresentModalPress("religion")} style={{ flex: 1 }}>
                                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", flex: 1 }}>
                                    <Text style={{ fontSize: 14 }}>: {formValues.religion || notSpecified}</Text>
                                    <AntDesign name="right" size={14} color="black" />
                                </View>
                            </TouchableRipple>
                        </View>
                        <View style={styles.row}>
                            <Text style={{ flexBasis: "50%", fontSize: 14 }} variant='labelMedium'>Native Language</Text>
                            <TouchableRipple onPress={() => handlePresentModalPress("motherTongue")} style={{ flex: 1 }}>
                                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", flex: 1 }}>
                                    <Text style={{ fontSize: 14 }}>: {formValues.motherTongue || notSpecified}</Text>
                                    <AntDesign name="right" size={14} color="black" />
                                </View>
                            </TouchableRipple>
                        </View>
                        <View style={styles.row}>
                            <Text style={{ flexBasis: "50%", fontSize: 14 }} variant='labelMedium'>Language</Text>
                            <TouchableRipple onPress={() => handlePresentModalPress("community")} style={{ flex: 1 }}>
                                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", flex: 1 }}>
                                    <Text style={{ fontSize: 14, flexWrap: "wrap" }}>: {formValues.community?.map((x, i) => `${x} ${i !== formValues?.community?.length - 1 ? ", " : ""}`)}</Text>
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
                            selectedField === 'religion' ?
                                <View>
                                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingBottom: 10 }}>
                                        <Ionicons onPress={() => handleCloseModalPress("close")} name="ios-close-sharp" size={28} color={Colors.textLight} />
                                        <Ionicons onPress={() => handleCloseModalPress("check")} name="checkmark-sharp" size={28} color={Colors.textLight} />
                                    </View>
                                    <Text style={{ marginBottom: 10 }} variant='titleLarge'>Religion:</Text>
                                    <View style={{ flexDirection: "row", gap: 5, flexWrap: "wrap" }}>
                                        <Selector
                                            options={religions?.map(item => ({ label: item, value: item }))}
                                            value={formValues.religion}
                                            onSelect={value => setFormValues(prev => ({ ...prev, religion: value }))}
                                        />
                                    </View>
                                </View> :
                                selectedField === 'motherTongue' ?
                                    <View>
                                        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingBottom: 10 }}>
                                            <Ionicons onPress={() => handleCloseModalPress("close")} name="ios-close-sharp" size={28} color={Colors.textLight} />
                                            <Ionicons onPress={() => handleCloseModalPress("check")} name="checkmark-sharp" size={28} color={Colors.textLight} />
                                        </View>
                                        <Text style={{ marginBottom: 10 }} variant='titleLarge'>Native Language:</Text>
                                        <View style={{ flexDirection: "column", gap: 5, flexWrap: "wrap", alignItems: "center" }}>
                                            <Selector
                                                options={motherTongues?.map(item => ({ label: item, value: item }))}
                                                value={formValues.motherTongue}
                                                onSelect={value => setFormValues(prev => ({ ...prev, motherTongue: value }))}
                                                search
                                            />
                                        </View>
                                    </View> :
                                selectedField === 'community' ?
                                    <View>
                                        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingBottom: 10 }}>
                                            <Ionicons onPress={() => handleCloseModalPress("close")} name="ios-close-sharp" size={28} color={Colors.textLight} />
                                            <Ionicons onPress={() => handleCloseModalPress("check")} name="checkmark-sharp" size={28} color={Colors.textLight} />
                                        </View>
                                        <Text style={{ marginBottom: 10 }} variant='titleLarge'>Language: (max 5)</Text>
                                        <View style={{ flexDirection: "column", gap: 5, flexWrap: "wrap", alignItems: "center" }}>
                                            <Selector
                                                options={motherTongues?.map(item => ({ label: item, value: item }))}
                                                value={formValues.community}
                                                onSelect={value => setFormValues(prev => ({ ...prev, community: value }))}
                                                search
                                                multiple
                                                max={5}
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

export default Religion;

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
