import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../../themes/palette';
import { moderateScale } from 'react-native-size-matters';

interface CardLabelValueProps {
    label: string;
    labelValue: string;
    valueColor?: string;
}

const CardLabelValue = ({ label, labelValue, valueColor }: CardLabelValueProps) => {
    return (
        <View style={styles.itemRow}>
            <Text style={styles.itemLabel}>{label}:</Text>
            <Text style={[styles.labelValue, { color: valueColor ? valueColor : COLORS.DARK }]}>{labelValue}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    itemRow: { width: '100%', flexDirection: 'row', alignItems: 'center' },
    itemLabel: { color: COLORS.GRAY, fontFamily: 'LatoBold', width: '25%', fontSize: moderateScale(14, 1.5) },
    labelValue: { fontFamily: 'LatoBold', fontSize: moderateScale(14, 1.5) },
});

export default CardLabelValue;
