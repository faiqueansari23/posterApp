import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar, TextInput } from 'react-native';
import { COLORS } from '../../themes/palette';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamsList } from '../../navigation/AppNavigator';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CommonButton from '../../components/buttons/CommonButton';

interface ContactusScreenProps {
    navigation: NativeStackNavigationProp<RootStackParamsList>
}

export default function ContactusScreen({ navigation }: ContactusScreenProps) {
    const [selected, setSelected] = useState<number | null>(null);

    return (
        <View style={styles.container}>
            <StatusBar
                backgroundColor={COLORS.BLACK}
                barStyle="light-content"
            />
            <View style={{ width: '100%', paddingHorizontal: scale(16), height: 70, backgroundColor: '#E1306C', flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => { navigation.goBack(); }}>
                        <AntDesign name="arrowleft" size={28} color={COLORS.WHITE} style={{ marginTop: verticalScale(5) }} />
                    </TouchableOpacity>
                    <Text style={{ color: COLORS.WHITE, fontSize: moderateScale(18), fontWeight: '700', marginLeft: scale(5) }}>Contact Us</Text>
                </View>
            </View>
            <View style={styles.subContainer}>

                <TextInput
                    style={{
                        width: '100%',
                        borderWidth: 0.5,
                        borderRadius: moderateScale(8),
                        paddingHorizontal: scale(8),
                        color: COLORS.DARK,
                        marginBottom: verticalScale(20),
                    }}
                    placeholder="Enter your name"
                    placeholderTextColor={COLORS.DARK_SLATE_GRAY}
                />

                <Text style={{ color: COLORS.DARK, fontWeight: '600', fontSize: moderateScale(18), textAlign: 'left', marginVertical: verticalScale(10) }}>How can we help you?</Text>

                <TouchableOpacity onPress={() => {
                    setSelected(1);
                }} style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: verticalScale(5) }}>
                    <Text style={{ color: COLORS.DARK, fontSize: moderateScale(15), width: '70%' }}>Quotes not showing up</Text>
                    <MaterialCommunityIcons name={selected === 1 ? 'check-circle' : 'checkbox-blank-circle-outline'} size={20} color={COLORS.DARK_GRAY} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    setSelected(2);
                }} style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: verticalScale(5) }}>
                    <Text style={{ color: COLORS.DARK, fontSize: moderateScale(15), width: '70%' }}>Payment is done but premium plan is still not activated</Text>
                    <MaterialCommunityIcons name={selected === 2 ? 'check-circle' : 'checkbox-blank-circle-outline'} size={20} color={COLORS.DARK_GRAY} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    setSelected(3);
                }} style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: verticalScale(5) }}>
                    <Text style={{ color: COLORS.DARK, fontSize: moderateScale(15), width: '70%' }}>Need quotes in another language</Text>
                    <MaterialCommunityIcons name={selected === 3 ? 'check-circle' : 'checkbox-blank-circle-outline'} size={20} color={COLORS.DARK_GRAY} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    setSelected(4);
                }} style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: verticalScale(5) }}>
                    <Text style={{ color: COLORS.DARK, fontSize: moderateScale(15), width: '70%' }}>Having difficulty using App</Text>
                    <MaterialCommunityIcons name={selected === 4 ? 'check-circle' : 'checkbox-blank-circle-outline'} size={20} color={COLORS.DARK_GRAY} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    setSelected(5);
                }} style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: verticalScale(5) }}>
                    <Text style={{ color: COLORS.DARK, fontSize: moderateScale(15), width: '70%' }}>Want to delete your account</Text>
                    <MaterialCommunityIcons name={selected === 5 ? 'check-circle' : 'checkbox-blank-circle-outline'} size={20} color={COLORS.DARK_GRAY} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    setSelected(6);
                }} style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: verticalScale(5) }}>
                    <Text style={{ color: COLORS.DARK, fontSize: moderateScale(15), width: '70%' }}>Want to stop automatic payment or recharge</Text>
                    <MaterialCommunityIcons name={selected === 6 ? 'check-circle' : 'checkbox-blank-circle-outline'} size={20} color={COLORS.DARK_GRAY} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    setSelected(7);
                }} style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: verticalScale(5) }}>
                    <Text style={{ color: COLORS.DARK, fontSize: moderateScale(15), width: '70%' }}>Something else</Text>
                    <MaterialCommunityIcons name={selected === 7 ? 'check-circle' : 'checkbox-blank-circle-outline'} size={20} color={COLORS.DARK_GRAY} />
                </TouchableOpacity>

                {selected ? <TextInput
                    style={{
                        width: '100%',
                        borderWidth: 0.5,
                        borderRadius: moderateScale(8),
                        paddingHorizontal: scale(8),
                        color: COLORS.DARK,
                        marginTop: verticalScale(20),
                    }}
                    placeholder="Please tell us more about your problem"
                    placeholderTextColor={COLORS.DARK_SLATE_GRAY}
                /> : null}

                <CommonButton
                    title="SUBMIT"
                    onPress={() => { }}
                    buttonStyle={styles.button}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        backgroundColor: COLORS.OFFWHITE,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        backgroundColor: COLORS.OFFWHITE,
    },
    subContainer: {
        flex: 1,
        paddingVertical: verticalScale(16),
        paddingHorizontal: scale(16),
    },
    button: { width: '80%', height: verticalScale(40), marginTop: verticalScale(30), backgroundColor: '#E1306C', alignSelf:"center" },
});

