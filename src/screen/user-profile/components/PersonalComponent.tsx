import React from 'react';
import { View, StyleSheet, Text, TextInput } from 'react-native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { COLORS } from '../../../themes/palette';

interface IPersonalComponentProps {
    name?: string;
    number?: string;
    website?: string;
    facebook?: string;
    business?: string;
    tagline?: string;
    yourState?: string;
    yourCity?: string;
    yourAddress?: string;
    onChange: (field: string, value: string) => void;
}

const PersonalComponent = ({ number, website,
    facebook,
    business,
    tagline, yourState, yourCity, yourAddress, onChange }: IPersonalComponentProps) => {
    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Enter business name:</Text>
                <TextInput
                    value={business}
                    style={styles.inputs}
                    placeholder="Enter business name"
                    placeholderTextColor={COLORS.DARK_FADE_40}
                    onChangeText={(text) => onChange('bussiness_name', text)}
                />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Enter WhatsApp No:</Text>
                <TextInput
                    value={number}
                    style={styles.inputs}
                    placeholder="Enter WhatsApp No."
                    placeholderTextColor={COLORS.DARK_FADE_40}
                    onChangeText={(text) => onChange('whatsappno', text)}
                />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Enter your website:</Text>
                <TextInput
                    value={website}
                    style={styles.inputs}
                    placeholder="Enter your website"
                    placeholderTextColor={COLORS.DARK_FADE_40}
                    onChangeText={(text) => onChange('website', text)}
                />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Enter your facebook/insta id:</Text>
                <TextInput
                    value={facebook}
                    style={styles.inputs}
                    placeholder="Enter your facebook/insta id"
                    placeholderTextColor={COLORS.DARK_FADE_40}
                    onChangeText={(text) => onChange('instagram_facebook', text)}
                />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Enter tagline for your business:</Text>
                <TextInput
                    value={tagline}
                    style={styles.inputs}
                    placeholder="Enter tagline for your business"
                    placeholderTextColor={COLORS.DARK_FADE_40}
                    onChangeText={(text) => onChange('tagline', text)}
                />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Enter your State:</Text>
                <TextInput
                    value={yourState}
                    style={styles.inputs}
                    placeholder="Enter your State"
                    placeholderTextColor={COLORS.DARK_FADE_40}
                    onChangeText={(text) => onChange('state', text)}
                />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Enter your city:</Text>
                <TextInput
                    value={yourCity}
                    style={styles.inputs}
                    placeholder="Enter your city"
                    placeholderTextColor={COLORS.DARK_FADE_40}
                    onChangeText={(text) => onChange('city', text)}
                />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Enter Address:</Text>
                <TextInput
                    value={yourAddress}
                    style={styles.inputs}
                    placeholder="Enter Address"
                    placeholderTextColor={COLORS.DARK_FADE_40}
                    onChangeText={(text) => onChange('address', text)}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: scale(16),
        backgroundColor: COLORS.LIGHT_BG,
    },
    inputContainer: {
        marginBottom: verticalScale(12),
    },
    label: {
        fontSize: moderateScale(16),
        fontWeight: '600',
        color: COLORS.PRIMARY,
        fontFamily: 'Roboto-Medium',
        marginBottom: verticalScale(3),
    },
    inputs: {
        color: COLORS.DARK,
        fontSize: moderateScale(14),
        fontFamily: 'Roboto-Regular',
        borderWidth: 1,
        borderRadius: moderateScale(10),
        borderColor: COLORS.SOFT_GREY,
        backgroundColor: COLORS.WHITE,
        paddingHorizontal: scale(12),
        paddingVertical: verticalScale(5),
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
});

export default PersonalComponent;
