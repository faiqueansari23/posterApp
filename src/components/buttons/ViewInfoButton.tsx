import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { COLORS } from '../../themes/palette';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface IVierInfoButtonProps {
    onPress: () => void;
}

const ViewInfoButton = ({ onPress }: IVierInfoButtonProps) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.viewBtn}>
            <MaterialCommunityIcons name="eye" size={20} color={COLORS.WHITE} />
            <Text style={styles.viewBtnText}>View Info</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    viewBtn: {
        position: 'absolute', bottom: 0, right: 0, paddingHorizontal: scale(10), paddingVertical: verticalScale(7), backgroundColor: COLORS.PRIMARY, flexDirection: 'row', alignItems: 'center', borderRadius: moderateScale(6),
    },
    viewBtnText: { color: COLORS.WHITE, fontFamily: 'LatoRegular', fontSize: moderateScale(14, 1.5), marginLeft: scale(5) },
});

export default ViewInfoButton;
