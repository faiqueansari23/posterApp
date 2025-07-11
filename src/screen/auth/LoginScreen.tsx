// import React, { useEffect, useState } from 'react';
// import { View, StyleSheet, StatusBar, Alert, ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView, BackHandler } from 'react-native';
// import { COLORS } from '../../themes/palette';
// import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// import { RootStackParamsList } from '../../navigation/AppNavigator';
// import AuthHeaderComponent from './components/AuthHeaderComponent';
// import AuthInputComponent from './components/AuthInputComponent';
// import CommonButton from '../../components/buttons/CommonButton';
// import { scale, verticalScale } from 'react-native-size-matters';
// import axios from 'axios';
// import { P, Span } from '../../themes/Typhography';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// interface ILoginScreenProps {
//     navigation: NativeStackNavigationProp<RootStackParamsList, 'Login'>
// }
// export default function LoginScreen({ navigation }: ILoginScreenProps) {
//     const [mobileNumber, setMobileNumber] = useState<string>('');
//     const [password, setPassword] = useState<string>('');
//     const [isLoading, setIsLoading] = useState<boolean>(false);

//     useEffect(() => {
//         const backAction = () => {
//             BackHandler.exitApp();
//             return true;
//         };
//         const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
//         return () => backHandler.remove();
//     }, []);

//     const handleLogin = async () => {
//         // Input validation
//         if (!mobileNumber || !password) {
//             Alert.alert('Error', 'Please fill in all fields');
//             return;
//         }

//         setIsLoading(true);

//         try {
//             const { data: responseData, status } = await axios.post('https://ashhari.com/bbn/public/api/login', {
//                 phone: mobileNumber,
//                 password,
//             });

//             console.log('login response>>', status, JSON.stringify(responseData, null, 2));
//             if (status === 200 && responseData.message === 'Login Successfully.') {
//                 Alert.alert('Success', 'Login successful!');
//                 await Promise.all([
//                     AsyncStorage.setItem('userData', JSON.stringify(responseData.data)),
//                     AsyncStorage.setItem('isLoggedIn', 'true'),
//                 ]);
//                 navigation.navigate('DashBoard');
//             } else {
//                 Alert.alert('Error', responseData.message || 'Something went wrong');
//             }
//         } catch (error: any) {
//             const errorMessage = axios.isAxiosError(error) && error.response
//                 ? error.response.data.message || 'Login failed'
//                 : 'Network error, please try again later.';
//             Alert.alert('Error', errorMessage);
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     if (isLoading) {
//         return (
//             <View style={styles.loadingContainer}>
//                 <ActivityIndicator />
//             </View>
//         );
//     }

//     return (
//         <KeyboardAvoidingView
//             style={styles.keybaordContainer}
//             behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//             keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0} // Adjust as needed
//         >
//             <ScrollView contentContainerStyle={styles.scrollviewContainer}>
//                 <View style={styles.container}>
//                     <StatusBar
//                         backgroundColor={COLORS.WHITE}
//                         barStyle="dark-content"
//                     />
//                     <AuthHeaderComponent header="Login" navigation={navigation} shoBack={false} />
//                     <AuthInputComponent
//                         value={mobileNumber}
//                         onChangeText={setMobileNumber}
//                         placeholder="Mobile number"
//                         keyboardType="numeric"
//                     // icon={<MaterialCommunityIcons name="dots-grid" size={25} color={COLORS.DARK} />}
//                     />

//                     <AuthInputComponent
//                         placeholder="Password"
//                         // secureEntry={true}
//                         value={password}
//                         onChangeText={setPassword}
//                     />
//                     <P style={styles.text}>Don't have an account? <Span style={styles.signupText} onPress={() => navigation.navigate('Signup')}>Sign up</Span></P>
//                     <View style={styles.block}>
//                         <CommonButton
//                             title="VERIFY"
//                             onPress={handleLogin}
//                             buttonStyle={styles.button}
//                         />
//                     </View>
//                 </View>
//             </ScrollView>
//         </KeyboardAvoidingView>
//     );
// }

// const styles = StyleSheet.create({
//     keybaordContainer: {
//         flex: 1,
//     },
//     container: {
//         flex: 1,
//         paddingHorizontal: scale(16),
//         paddingBottom: verticalScale(32),
//         backgroundColor: COLORS.WHITE,
//     },
//     loadingContainer: {
//         flex: 1,
//         alignItems: 'center',
//         justifyContent: 'center',
//         backgroundColor: COLORS.WHITE,
//     },
//     scrollviewContainer: { flexGrow: 1 },
//     block: {
//         flex: 1,
//         justifyContent: 'flex-end',
//     },
//     text: {
//         color: COLORS.BLACK,
//     },
//     signupText: {
//         color: COLORS.DARK,
//     },
//     button: { width: '100%', height: verticalScale(50), backgroundColor:"#E1306C", borderRadius:50 },
// });

import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  BackHandler,
  Image,
} from 'react-native';
import {COLORS} from '../../themes/palette';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamsList} from '../../navigation/AppNavigator';
import AuthHeaderComponent from './components/AuthHeaderComponent';
import AuthInputComponent from './components/AuthInputComponent';
import CommonButton from '../../components/buttons/CommonButton';
import {scale, verticalScale} from 'react-native-size-matters';
import axios from 'axios';
import {P, Span} from '../../themes/Typhography';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AwesomeAlert from 'react-native-awesome-alerts';

interface ILoginScreenProps {
  navigation: NativeStackNavigationProp<RootStackParamsList, 'Login'>;
}

export default function LoginScreen({navigation}: ILoginScreenProps) {
  const [mobileNumber, setMobileNumber] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  useEffect(() => {
    const backAction = () => {
      BackHandler.exitApp();
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  }, []);

  const handleLogin = async () => {
    if (!mobileNumber || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setIsLoading(true);

    try {
      const {data: responseData, status} = await axios.post(
        'https://www.brandboostindia.com/api/login',
        {
          phone: mobileNumber,
          password,
        },
      );

      console.log(
        'login response>>',
        status,
        JSON.stringify(responseData, null, 2),
      );
      if (status === 200 && responseData.message === 'Login Successfully.') {
        setShowSuccessAlert(true);

        await Promise.all([
          AsyncStorage.setItem('userData', JSON.stringify(responseData.data)),
          AsyncStorage.setItem('isLoggedIn', 'true'),
        ]);
      } else {
        Alert.alert('Error', responseData.message || 'Something went wrong');
      }
    } catch (error: any) {
      const errorMessage =
        axios.isAxiosError(error) && error.response
          ? error.response.data.message || 'Login failed'
          : 'Network error, please try again later.';
      Alert.alert('Error', errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.DARK} />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.keyboardContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled">
        <StatusBar backgroundColor={COLORS.WHITE} barStyle="dark-content" />
        <View style={styles.innerContainer}>
          <View style={styles.headerWrapper}>
            <AuthHeaderComponent
              header="Login"
              navigation={navigation}
              shoBack={false}
            />
          </View>
          <Image
            source={require('./BrandBoost.jpg')} // Replace with your logo path
            style={styles.logo}
            resizeMode="contain"
          />

          <AuthInputComponent
            value={mobileNumber}
            onChangeText={setMobileNumber}
            placeholder="Mobile number"
            keyboardType="numeric"
          />
          <AuthInputComponent
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
          />
          <P style={styles.text}>
            Don't have an account?{' '}
            <Span
              style={styles.signupText}
              onPress={() => navigation.navigate('Signup')}>
              Sign up
            </Span>
          </P>
          <View style={styles.buttonBlock}>
            <CommonButton
              title="VERIFY"
              onPress={handleLogin}
              buttonStyle={styles.button}
            />
          </View>
        </View>
      </ScrollView>

      <AwesomeAlert
  show={showSuccessAlert}
  showProgress={false}
  title="Success"
  message="Login successful!"
  closeOnTouchOutside={true}
  closeOnHardwareBackPress={false}
  showConfirmButton={true}
  confirmText="OK"
  confirmButtonColor="#E1306C"
  contentContainerStyle={{
    width: 320,
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
  }}
  titleStyle={{
    fontSize: 20,
    fontWeight: '600',
    color: '#222',
    // marginBottom: 10,
    textAlign: 'center',
  }}
  messageStyle={{
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 15, 
  }}
  confirmButtonStyle={{
    width: 120,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: '#E1306C',
  }}
  confirmButtonTextStyle={{
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  }}
  onConfirmPressed={() => {
    setShowSuccessAlert(false);
    navigation.navigate('DashBoard');
  }}
/>


    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboardContainer: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  scrollContainer: {
    flexGrow: 1,
    // justifyContent: 'center',
    padding: scale(16),
  },
  innerContainer: {
    // flex: 1,
    // justifyContent: 'center',
  },
  headerWrapper: {
    alignItems: 'center',
    // marginBottom: verticalScale(10),
  },
  logo: {
    width: scale(80),
    height: verticalScale(80),
    alignSelf: 'center',
    marginBottom: verticalScale(10), // reduced gap
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.WHITE,
  },
  text: {
    color: COLORS.BLACK,
    marginTop: verticalScale(12),
    textAlign: 'center',
  },
  signupText: {
    color: '#E1306C',
    fontWeight: 'bold',
  },
  buttonBlock: {
    marginTop: verticalScale(24),
  },
  button: {
    width: '100%',
    height: verticalScale(50),
    backgroundColor: '#E1306C',
    borderRadius: 50,
  },
});
