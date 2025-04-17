import React, { ReactNode } from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { COLORS } from '../../themes/palette';
import { moderateScale } from 'react-native-size-matters';

interface CardProps {
    children: ReactNode;
    style?: ViewStyle;
}

const Card: React.FC<CardProps> = ({ children, style }) => {
    return (
        <View style={[styles.card, style]}>
            {children}
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        width: '100%',
        backgroundColor: COLORS.WHITE,
        padding: moderateScale(12),
        borderRadius: moderateScale(6),
        shadowColor: COLORS.BLACK,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
    },
});

export default Card;
