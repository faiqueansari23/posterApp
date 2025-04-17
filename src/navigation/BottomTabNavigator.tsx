import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import HomeScreen from '../screen/home/HomeScreen';
import SettingScreen from '../screen/settings/SettingScreen';
import Reels from '../screen/home/Reels';
import UserProfileScreen from '../screen/user-profile/UserProfileScreen';
import { SafeAreaView, StyleSheet } from 'react-native';
// import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

type TabParamList = {
    HomeTab: undefined;
    ProfileTab: undefined;
    SettingTab: undefined;
    Reels: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

const BottomTabNavigator: React.FC = () => {
    return (
        <SafeAreaView style={styles.container}>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ color, size }) => {
                        let iconName: string;
                        switch (route.name) {
                            case 'HomeTab':
                                iconName = 'home';
                                break;
                            case 'ProfileTab':
                                iconName = 'person';
                                break;
                            case 'SettingTab':
                                iconName = 'settings';
                                break;
                            case 'Reels':
                                iconName = 'play-circle';
                                break;
                            default:
                                iconName = 'help-circle';
                        }
                        return <Ionicons name={iconName} size={size} color={color} />;
                    },
                    tabBarActiveTintColor: '#E1306C',
                    tabBarInactiveTintColor: 'gray',
                    tabBarStyle: {
                        borderTopWidth: 0,
                    },
                    headerShown: false,
                })}
            >
                <Tab.Screen name="HomeTab" component={HomeScreen} />
                <Tab.Screen name="Reels" component={Reels} />
                <Tab.Screen name="ProfileTab" component={UserProfileScreen} />
                <Tab.Screen name="SettingTab" component={SettingScreen} />
               
            </Tab.Navigator>
        </SafeAreaView>
    );
};

export default BottomTabNavigator;
const styles = StyleSheet.create({
    container: { flex: 1 },
});