import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import { COLORS } from '../../themes/palette';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamsList } from '../../navigation/AppNavigator';
import WebView from 'react-native-webview';

interface RefundScreenProps {
    navigation: NativeStackNavigationProp<RootStackParamsList>
}

export default function RefundScreen({ navigation }: RefundScreenProps) {
    return (
        <View style={styles.container}>
            <StatusBar
                backgroundColor={COLORS.BLACK}
                barStyle="light-content"
            />
            <View style={{ width: '100%', paddingHorizontal: scale(16), height: 70, backgroundColor: '#E1306C', flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => { navigation.goBack(); }}>
                        <AntDesign name="arrowleft" size={28} color={COLORS.WHITE} style={{ marginTop: verticalScale(5) }} />
                    </TouchableOpacity>
                    <Text style={{ color: COLORS.WHITE, fontSize: moderateScale(18), fontWeight: '700', marginLeft: scale(5) }}>Refund Policy</Text>
                </View>
            </View>
            <View style={styles.subContainer}>
                <WebView
                    source={{ uri: 'https://ashhari.com/pages/Refund.html' }} // Boss se mila Refund.html ka URL yahan daal
                    style={styles.webview}
                    onLoadStart={() => console.log('Loading Refund Policy...')}
                    onLoadEnd={() => console.log('Refund Policy loaded!')}
                    onError={(syntheticEvent) => {
                        const { nativeEvent } = syntheticEvent;
                        console.warn('WebView error: ', nativeEvent);
                    }}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        backgroundColor: COLORS.OFFWHITE,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        backgroundColor: COLORS.OFFWHITE,
    },
    subContainer: {
        flex: 1,
    },
    webview: {
        flex: 1,
    },
    button: { width: '100%', height: verticalScale(40), marginTop: verticalScale(30), backgroundColor: '#21cfe5' },
});