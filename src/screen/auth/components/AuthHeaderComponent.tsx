import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { COLORS } from '../../../themes/palette';
import { scale, verticalScale } from 'react-native-size-matters';
import { HeaderLable, Span } from '../../../themes/Typhography';

interface IAuthHeaderComponentProps {
    header: string;
    subHeader: string;
    navigation: any;
    shoBack?: boolean;
}

const AuthHeaderComponent = ({ header, subHeader, navigation, shoBack = true }: IAuthHeaderComponentProps) => {
    return (
        <View style={styles.container}>
            {shoBack ? <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
                <Feather name="chevron-left" size={25} color={COLORS.BLACK} />
            </TouchableOpacity> : null}
            {/* <Image source={require('../../../assets/images/app-logo.png')} style={styles.logo} /> */}
            <HeaderLable style={styles.lable}>{header}</HeaderLable>
            <Span style={styles.span}>{subHeader}</Span>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: verticalScale(40),
    },
    backBtn: {
        paddingRight: scale(8),
        paddingVertical: verticalScale(8),
        alignSelf: 'flex-start',
    },
    logo: {
        width: scale(65),
        height: verticalScale(70),
        resizeMode: 'contain',
        marginTop: verticalScale(12),
    },
    lable: {
        color: COLORS.BLACK,
        marginTop: verticalScale(12),
        lineHeight: verticalScale(38),
    },
    span: {
        color: COLORS.DARK,
        marginTop: verticalScale(20),
        lineHeight: verticalScale(17),
    },
});

export default AuthHeaderComponent;
