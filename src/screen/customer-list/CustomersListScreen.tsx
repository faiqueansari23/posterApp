import React from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { COLORS } from '../../themes/palette';
import { scale, verticalScale } from 'react-native-size-matters';
import { H2 } from '../../themes/Typhography';

export default function CustomersListScreen() {

    return (
        <View style={styles.container}>
            <StatusBar
                backgroundColor={COLORS.PRIMARY}
                barStyle="light-content"
            />
            <H2 style={styles.heading}>CustomersListScreen</H2>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: scale(16),
        paddingVertical: verticalScale(32),
        backgroundColor: COLORS.WHITE,
    },
    heading: {
        color: COLORS.DARK,
        marginTop: verticalScale(30),
        lineHeight: verticalScale(29),
    },
});

