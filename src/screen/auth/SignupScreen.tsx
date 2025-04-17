// import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// import React, { useState } from 'react';
// import { View, StyleSheet, StatusBar, Alert, KeyboardAvoidingView, Platform, ScrollView, ActivityIndicator } from 'react-native';
// import { RootStackParamsList } from '../../navigation/AppNavigator';
// import { COLORS } from '../../themes/palette';
// import AuthHeaderComponent from './components/AuthHeaderComponent';
// import AuthInputComponent from './components/AuthInputComponent';
// import { scale, verticalScale } from 'react-native-size-matters';
// import CommonButton from '../../components/buttons/CommonButton';
// import axios from 'axios';
// import { P, Span } from '../../themes/Typhography';

// interface ISignupScreenProps {
//     navigation: NativeStackNavigationProp<RootStackParamsList, 'Signup'>
// }

// export default function SignupScreen({ navigation }: ISignupScreenProps) {
//     const [name, setName] = useState<string>('');
//     const [mobile, setMobile] = useState<string>('');
//     const [password, setPassword] = useState<string>('');
//     const [isLoading, setIsLoading] = useState<boolean>(false);


//     const handleSignup = async () => {
//         if (!name || !mobile || !password) {
//             Alert.alert('Error', 'Please fill in all fields');
//             return;
//         }

//         try {
//             setIsLoading(true);
//             const response = await axios.post('https://ashhari.com/bbn/public/api/add-user', {
//                 name,
//                 phone: mobile,
//                 password,
//             });

//             console.log('signup response>>', response.status, JSON.stringify(response, null, 2));

//             if (response.status === 200) {
//                 Alert.alert('Success', 'Signup successful!');
//                 navigation.navigate('Login');
//             } else {
//                 Alert.alert('Error', response.data.message || 'Something went wrong');
//             }
//         } catch (error: any) {
//             if (axios.isAxiosError(error) && error.response) {
//                 // Handle response errors (e.g., 4xx, 5xx status codes)
//                 Alert.alert('Error', error.response.data.message || 'Signup failed');
//             } else {
//                 // Handle network or other unexpected errors
//                 Alert.alert('Error', 'Network error, please try again later.');
//             }
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
//                     <AuthHeaderComponent header="Sign In" navigation={navigation} />
//                     <AuthInputComponent
//                         value={name}
//                         onChangeText={setName}
//                         placeholder="Enter your name"
//                     // icon={<FontAwesome6 name="user-large" size={25} color={COLORS.DARK} />}
//                     />

//                     <AuthInputComponent
//                         value={mobile}
//                         onChangeText={setMobile}
//                         placeholder="Mobile Number"
//                         keyboardType="numeric"
//                     // icon={<Ionicons name="call-outline" size={25} color={COLORS.DARK} />}
//                     />

//                     <AuthInputComponent
//                         value={password}
//                         onChangeText={setPassword}
//                         placeholder="Create your password"
//                     // icon={<SimpleLineIcons name="lock" size={25} color={COLORS.DARK} />}
//                     />
//                     <P style={styles.text}>Already have an account? <Span style={styles.signupText} onPress={() => navigation.navigate('Login')}>Log In</Span></P>
//                     <View style={styles.block}>
//                         <CommonButton
//                             title="PROCEED"
//                             onPress={handleSignup}
//                             buttonStyle={styles.button}
//                         />
//                     </View>
//                 </View>
//             </ScrollView>
//         </KeyboardAvoidingView>

//     );
// }

// const styles = StyleSheet.create({
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
//     keybaordContainer: {
//         flex: 1,
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
//     button: { width: '100%', height: verticalScale(50) },
// });





import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
  Image,
} from 'react-native';
import { RootStackParamsList } from '../../navigation/AppNavigator';
import { COLORS } from '../../themes/palette';
import AuthHeaderComponent from './components/AuthHeaderComponent';
import AuthInputComponent from './components/AuthInputComponent';
import { scale, verticalScale } from 'react-native-size-matters';
import CommonButton from '../../components/buttons/CommonButton';
import axios from 'axios';
import { P, Span } from '../../themes/Typhography';

interface ISignupScreenProps {
  navigation: NativeStackNavigationProp<RootStackParamsList, 'Signup'>;
}

export default function SignupScreen({ navigation }: ISignupScreenProps) {
  const [name, setName] = useState<string>('');
  const [mobile, setMobile] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSignup = async () => {
    if (!name || !mobile || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    try {
      setIsLoading(true);
      const response = await axios.post(
        'https://ashhari.com/bbn/public/api/add-user',
        {
          name,
          phone: mobile,
          password,
        }
      );

      console.log(
        'signup response>>',
        response.status,
        JSON.stringify(response, null, 2)
      );

      if (response.status === 200) {
        Alert.alert('Success', 'Signup successful!');
        navigation.navigate('Login');
      } else {
        Alert.alert('Error', response.data.message || 'Something went wrong');
      }
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response) {
        Alert.alert('Error', error.response.data.message || 'Signup failed');
      } else {
        Alert.alert('Error', 'Network error, please try again later.');
      }
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
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <StatusBar backgroundColor={COLORS.WHITE} barStyle="dark-content" />
        <View style={styles.innerContainer}>
          <View style={styles.headerWrapper}>
            <AuthHeaderComponent
              header="Sign Up"
              navigation={navigation}
              shoBack={false}
            />
          </View>

          <Image
            source={require('./BrandBoost.jpg')}
            style={styles.logo}
            resizeMode="contain"
          />

          <AuthInputComponent
            value={name}
            onChangeText={setName}
            placeholder="Enter your name"
          />

          <AuthInputComponent
            value={mobile}
            onChangeText={setMobile}
            placeholder="Mobile Number"
            keyboardType="numeric"
          />

          <AuthInputComponent
            value={password}
            onChangeText={setPassword}
            placeholder="Create your password"
          />

          <P style={styles.text}>
            Already have an account?{' '}
            <Span
              style={styles.signupText}
              onPress={() => navigation.navigate('Login')}
            >
              Log In
            </Span>
          </P>

          <View style={styles.buttonBlock}>
            <CommonButton
              title="PROCEED"
              onPress={handleSignup}
              buttonStyle={styles.button}
            />
          </View>
        </View>
      </ScrollView>
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
    padding: scale(16),
  },
  innerContainer: {},
  headerWrapper: {
    alignItems: 'center',
  },
  logo: {
    width: scale(80),
    height: verticalScale(80),
    alignSelf: 'center',
    marginBottom: verticalScale(10),
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
