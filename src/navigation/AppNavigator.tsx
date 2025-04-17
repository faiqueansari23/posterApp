import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import SplashScreen from '../screen/auth/SplashScreen';
import LoginScreen from '../screen/auth/LoginScreen';
import SignupScreen from '../screen/auth/SignupScreen';
import UserProfileScreen from '../screen/user-profile/UserProfileScreen';
import DownloadShareScreen from '../screen/download-share/DownloadShareScreen';
import HomeScreen from '../screen/home/HomeScreen';
import SettingScreen from '../screen/settings/SettingScreen';
import ContactusScreen from '../screen/settings/ContactusScreen';
import AboutusScreen from '../screen/settings/AboutusScreen';
import BottomTabNavigator from './BottomTabNavigator';
import PrivacyPolicyScreen from '../screen/settings/PrivacyPolicy';
import RefundScreen from '../screen/settings/Refund';
import TermsScreen from '../screen/settings/Terms';

export type RootStackParamsList = {
    Splash: undefined,
    Login: undefined,
    Signup: undefined,
    DashBoard: undefined,
    Home: undefined,
    DownloadShare: { post: any } | undefined,
    UserProfile: undefined,
    Setting: undefined,
    ContactUs: undefined,
    AboutUs: undefined,
}

const Stack = createNativeStackNavigator<RootStackParamsList>();

export default function AppNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{ headerShown: false }}
                initialRouteName="Login"
            >
                <Stack.Screen name="Splash" component={SplashScreen} />
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Signup" component={SignupScreen} />
                <Stack.Screen name="DashBoard" component={BottomTabNavigator} />
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="UserProfile" component={UserProfileScreen} />
                <Stack.Screen name="DownloadShare" component={DownloadShareScreen} />
                <Stack.Screen name="Setting" component={SettingScreen} />
                <Stack.Screen name="ContactUs" component={ContactusScreen} />
                <Stack.Screen name="AboutUs" component={AboutusScreen} />
                <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} />
                <Stack.Screen name="Refund" component={RefundScreen} />
                <Stack.Screen name="Terms" component={TermsScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
