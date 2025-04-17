import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { COLORS } from '../../themes/palette';
import { Label } from '../../themes/Typhography';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamsList } from '../../navigation/AppNavigator';
interface ICommonHeaderProps {
    isHomeHeader?: boolean;
    headerLabel?: string;
    navigation?: NativeStackNavigationProp<RootStackParamsList>
}


const CommonHeader = ({ isHomeHeader = false, headerLabel, navigation }: ICommonHeaderProps) => {
    return (
        <View style={styles.container}>
            <View style={styles.block}>
                {isHomeHeader ? <Image source={require('../../assets/images/display-pic.png')} style={styles.picture} /> :
                    <TouchableOpacity onPress={() => navigation?.goBack()}>
                        <Feather name="chevron-left" size={25} color={COLORS.WHITE} style={{ marginTop: verticalScale(5), marginRight: scale(5) }} />
                    </TouchableOpacity>
                }
                <Label style={styles.label}>{headerLabel}</Label>
            </View>
            {isHomeHeader ? <View style={styles.block}>
                <Ionicons name="search-outline" size={25} color={COLORS.WHITE} style={{ marginRight: scale(20) }} />
                <MaterialCommunityIcons name="bell" size={25} color={COLORS.WHITE} />
            </View> : null}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: verticalScale(70),
        paddingHorizontal: scale(24),
        marginBottom: verticalScale(10),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: COLORS.PRIMARY,
    },
    block: {
        flexDirection: 'row',
        // justifyContent: 'center',
        alignItems: 'center',
    },
    picture: {
        width: moderateScale(36),
        height: moderateScale(36),
        overflow: 'hidden',
        borderRadius: moderateScale(18),
        marginRight: scale(8),
    },
    label: {
        color: COLORS.WHITE,
    },
});

export default CommonHeader;
