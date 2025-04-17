import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';

interface ICopyButtonProps {
    bgColor: string;
    iconColor: string;
}

const CoypButton = ({ bgColor, iconColor }: ICopyButtonProps) => {
    return (
        <TouchableOpacity style={[styles.copyBtn, { backgroundColor: bgColor }]}>
            <Ionicons name="copy-outline" size={25} color={iconColor} />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    copyBtn: { paddingHorizontal: scale(8), paddingVertical: verticalScale(8), borderRadius: moderateScale(6), position: 'absolute', right: 0 },
});

export default CoypButton;
