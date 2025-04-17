import React, { ReactNode } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextStyle, ViewStyle } from 'react-native';
import { COLORS } from '../../themes/palette';
import { moderateScale } from 'react-native-size-matters';

interface ICommonButtonProps {
    title: string;
    onPress: () => void;
    icon?: ReactNode; // Optional icon component
    backgroundColor?: string; // Optional custom background color
    width?: string | number; // Optional width of the button
    height?: string | number; // Optional height of the button
    textStyle?: TextStyle; // Optional custom text style for the button label
    buttonStyle?: ViewStyle; // Optional custom style for the button itself
}

const CommonButton: React.FC<ICommonButtonProps> = ({
    title,
    onPress,
    icon,
    textStyle = {}, // Default text style
    buttonStyle = {}, // Default button style
}) => {
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            style={[styles.btn, buttonStyle]}
            onPress={onPress}
        >
            <View style={styles.block}>
                {icon && <View style={styles.icon}>{icon}</View>}
                <Text style={[styles.btntext, textStyle]}>{title}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    btn: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: moderateScale(6),
        backgroundColor: COLORS.BLACK,
    },
    block: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    btntext: {
        color: COLORS.WHITE,
        fontFamily: 'LatoRegular',//400
    },
    icon: {
        marginRight: 8, // Spacing between the icon and the text
    },
});

export default CommonButton;
