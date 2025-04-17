import React from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../themes/palette';
import { moderateScale, scale } from 'react-native-size-matters';

const SearchInput = () => {
    return (
        <View style={styles.container}>
            <TextInput placeholder="Search user..." placeholderTextColor={'#818181'} style={styles.input} />
            <View style={styles.iconView}>
                <Ionicons name="search" size={25} color={COLORS.WHITE} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.WHITE,
        borderRadius: moderateScale(6),
        paddingHorizontal: scale(5),
        marginRight: scale(5),
    },
    input: { flex: 1, color: COLORS.DARK },
    iconView: {
        padding: moderateScale(5),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.PRIMARY,
        borderRadius: moderateScale(6),
    },
});

export default SearchInput;
