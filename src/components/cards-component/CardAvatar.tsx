import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../../themes/palette';
import { moderateScale } from 'react-native-size-matters';

const CardAvatar = () => {
    return (
        <View style={styles.avatar}>
            <Text style={styles.avatarText}>P</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    avatar: { backgroundColor: COLORS.GRAY, width: moderateScale(60), height: moderateScale(60), borderRadius: moderateScale(60), alignItems: 'center', justifyContent: 'center' },
    avatarText: { color: COLORS.DARK, fontSize: moderateScale(20, 1.5), fontFamily: 'LatoRegular' },
});

export default CardAvatar;
