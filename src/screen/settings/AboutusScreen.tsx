import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import { COLORS } from '../../themes/palette';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamsList } from '../../navigation/AppNavigator';
import WebView from 'react-native-webview';

interface AboutusScreenProps {
    navigation: NativeStackNavigationProp<RootStackParamsList>
}

export default function AboutusScreen({ navigation }: AboutusScreenProps) {

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
                    <Text style={{ color: COLORS.WHITE, fontSize: moderateScale(18), fontWeight: '700', marginLeft: scale(5) }}>About Us</Text>
                </View>
            </View>
            {/* <View style={styles.subContainer}>

                <Text style={{ color: COLORS.DARK, fontWeight: '600', fontSize: moderateScale(18), textAlign: 'left', marginVertical: verticalScale(10) }}>About Us Screen</Text>
            </View> */}
            <View style={styles.subContainer}>
      <WebView
        source={{ uri: 'https://ashhari.com/pages/About.html' }} 
        style={styles.webview}
        // Optional: WebView ke events
        onLoadStart={() => console.log('Loading About Us...')}
        onLoadEnd={() => console.log('About Us loaded!')}
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
    // subContainer: {
    //     flex: 1,
    //     paddingVertical: verticalScale(16),
    //     paddingHorizontal: scale(16),
    // },
    subContainer: {
        flex: 1, // Full screen le
      },
      webview: {
        flex: 1, // WebView ko bhi full space do
      },
    button: { width: '100%', height: verticalScale(40), marginTop: verticalScale(30), backgroundColor: '#21cfe5' },
});

