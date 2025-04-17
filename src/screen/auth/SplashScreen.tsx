import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootStackParamsList } from '../../navigation/AppNavigator';
import { COLORS } from '../../themes/palette';
import { verticalScale } from 'react-native-size-matters';
import { H1 } from '../../themes/Typhography';

interface SplashScreenProps {
    navigation: NativeStackNavigationProp<RootStackParamsList, 'Splash'>
}

export default function SplashScreen({ navigation }: SplashScreenProps) {

    useEffect(() => {
        setTimeout(async () => {
            const loggedInStatus = await AsyncStorage.getItem('isLoggedIn');
            if (loggedInStatus === 'true') {
                navigation.navigate('Home');
            } else {
                navigation.navigate('Login');
            }
        }, 2000);
    }, [navigation]);

    return (
        <View style={styles.container}>
            <StatusBar
                backgroundColor={COLORS.BLACK}
                barStyle="light-content"
            />
            {/* <Image source={require('../../assets/images/splash-logo.png')} /> */}
            <H1 style={styles.heading}>Brand Boost</H1>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
    },
    heading: {
        color: COLORS.WHITE,
        marginTop: verticalScale(40),
        textTransform: 'uppercase',
    },
});

