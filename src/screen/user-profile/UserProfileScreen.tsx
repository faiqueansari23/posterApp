import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Dimensions,
  Alert,
  ActivityIndicator,
  ScrollView,
  Image,
} from 'react-native';
import {COLORS} from '../../themes/palette';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamsList} from '../../navigation/AppNavigator';
import PersonalComponent from './components/PersonalComponent';
import axios from 'axios';
import {Avatar2} from '../../components/avatar/Avatar2';
import CommonButton from '../../components/buttons/CommonButton';
import {ImageOrVideo} from 'react-native-image-crop-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {launchImageLibrary} from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker';

interface UserProfileScreenProps {
  navigation: NativeStackNavigationProp<RootStackParamsList>;
}

export default function UserProfileScreen({
  navigation,
}: UserProfileScreenProps) {
  const [loading, setLoading] = useState<boolean>(true);
  const [profileType, setProfileType] = useState<string>('');
  const [profileLogo, setProfileLogo] = useState<string>('');
  const [profileId, setProfileId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    whatsappno: '',
    website: '',
    instagram_facebook: '',
    bussiness_name: '',
    tagline: '',
    address: '',
    city: '',
    state: '',
  });

  const fetchProfileData = async () => {
    try {
      const userDataString = await AsyncStorage.getItem('userData');
      if (!userDataString) throw new Error('No user data found.');
      const {id} = JSON.parse(userDataString);
      const {data: response} = await axios.get(
        `https://ashhari.com/bbn/public/api/getProfile/${id}`,
      );
      console.log('get profile response=>', response.data);
      if (response.status === 'True') {
        const profile = response.data;
        setProfileId(profile.id);
        setProfileLogo(profile.profile_logo);
        setProfileType(profile.type);
        setFormData({
          whatsappno: profile.whatsappno.toString() || '',
          website: profile.website || '',
          instagram_facebook: profile.instagram_facebook || '',
          bussiness_name: profile.bussiness_name || '',
          tagline: profile.tagline || '',
          address: profile.address || '',
          city: profile.city || '',
          state: profile.state || '',
        });
      } else {
        Alert.alert(
          'Error',
          response.message || 'Failed to load profile data.',
        );
      }
    } catch (error) {
      Alert.alert('Error', 'Unable to fetch profile data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleUserUpdate = async () => {
    if (!profileId || Object.values(formData).some(val => !val)) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    try {
      setLoading(true);
      const payload = {
        ...formData,
        type: profileType,
        profile_logo: profileLogo,
      };
      const {data: response} = await axios.put(
        `https://ashhari.com/bbn/public/api/updateProfile/${profileId}`,
        payload,
      );
      console.log('update response=>', JSON.stringify(response, null, 1));

      if (
        response.status === true &&
        response.message === 'Profile updated successfully.'
      ) {
        console.log('Success', 'Profile updated successfully!');
      } else {
        console.log('Error', response.message || 'Failed to update profile.');
      }
    } catch (error) {
      console.log('Error', 'Failed to update profile. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({...prev, [field]: value}));
  };

  const onAvatarChange = (image: ImageOrVideo) => {
    setProfileLogo(image.path);
  };

  useEffect(() => {
    fetchProfileData();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.DARK} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.BLACK} barStyle="light-content" />
      <View
        style={{
          width: '100%',
          paddingHorizontal: scale(16),
          height: 70,
          backgroundColor: '#E1306C',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}>
            <AntDesign
              name="arrowleft"
              size={28}
              color={COLORS.WHITE}
              style={{marginTop: verticalScale(5)}}
            />
          </TouchableOpacity>
          <Text
            style={{
              color: COLORS.WHITE,
              fontSize: moderateScale(18),
              fontWeight: '700',
              marginLeft: scale(7),
            }}>
            Edit Profile
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            Alert.alert('Faique', 'Are you sure you want to logout?');
          }}
          style={{flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity
            onPress={() => {
              Alert.alert('Faique', 'Are you sure you want to logout?');
            }}>
            <AntDesign
              name="logout"
              size={17}
              color={COLORS.WHITE}
              style={{marginTop: verticalScale(5)}}
            />
          </TouchableOpacity>
          <Text
            style={{
              color: COLORS.WHITE,
              fontSize: moderateScale(13),
              fontWeight: '700',
              marginLeft: scale(5),
            }}>
            Logout
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.subContainer}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{flex: 1, paddingBottom: verticalScale(16)}}>
          {/* <View style={styles.switchContainer}>
                        <TouchableOpacity onPress={() => setProfileType('personal')} style={{ paddingHorizontal: scale(20), paddingVertical: verticalScale(5), borderBottomLeftRadius: moderateScale(20), borderTopLeftRadius: moderateScale(20), backgroundColor: profileType === 'personal' ? '#21cfe5' : COLORS.SOFT_GREY, alignItems: 'center' }}>
                            <Text style={{ color: profileType === 'personal' ? COLORS.WHITE : '#21cfe5', fontWeight: '500' }}>Personal</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setProfileType('business')} style={{ paddingHorizontal: scale(20), paddingVertical: verticalScale(5), borderBottomRightRadius: moderateScale(20), borderTopRightRadius: moderateScale(20), backgroundColor: profileType === 'business' ? '#21cfe5' : COLORS.SOFT_GREY, alignItems: 'center' }}>
                            <Text style={{ color: profileType === 'business' ? COLORS.WHITE : '#21cfe5', fontWeight: '500' }}>Business</Text>
                        </TouchableOpacity>
                    </View> */}

<View
  style={{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: verticalScale(4),
  }}>
  {/* Left Side - Plus Icon */}
  <TouchableOpacity
    style={{
      width: moderateScale(50),
      height: moderateScale(50),
      borderRadius: moderateScale(8),
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: moderateScale(10),
    }}
    onPress={() =>
      ImagePicker.openPicker({
        width: 300, // Output image ka width
        height: 300, // Output image ka height (square)
        cropping: true, // Cropping enable
        cropperCircleOverlay: true, // Circle shape mein crop
        mediaType: 'photo',
      })
        .then(image => {
          setProfileLogo(image.path); // Cropped image ka path
        })
        .catch(error => {
          console.log('Image Picker Error: ', error);
        })
    }>
    <Text
      style={{
        color: '#000',
        fontSize: moderateScale(40),
      }}>
      +
    </Text>
  </TouchableOpacity>

  {/* Right Side - Image Display */}
  <View
    style={{
      width: moderateScale(65),
      height: moderateScale(65),
      borderRadius: moderateScale(32.5),
      borderWidth: 1,
      borderColor: '#E1306C',
      padding: moderateScale(1), // 1px gap ke liye padding
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
    }}>
    <Avatar2
      source={profileLogo ? {uri: profileLogo} : undefined}
      style={{
        width: moderateScale(63), // 65 - 2*padding (1px each side)
        height: moderateScale(63), // 65 - 2*padding (1px each side)
        borderRadius: moderateScale(31.5), // Circle shape ke liye half of width/height
        resizeMode: 'cover', // Crop hone ke baad fit hogi
        opacity: 0.8,
      }}
    />
  </View>
</View>

          <PersonalComponent
            number={formData.whatsappno}
            website={formData.website}
            facebook={formData.instagram_facebook}
            business={formData.bussiness_name}
            tagline={formData.tagline}
            yourState={formData.state}
            yourAddress={formData.address}
            yourCity={formData.city}
            onChange={(field: string, value: string) =>
              handleInputChange(field, value)
            }
          />
          <CommonButton
            title="SUBMIT"
            onPress={handleUserUpdate}
            buttonStyle={styles.button}
          />
        </ScrollView>
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
    paddingVertical: verticalScale(16),
    paddingHorizontal: scale(16),
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: verticalScale(16),
    paddingHorizontal: scale(16),
  },
  switchText: {
    fontFamily: 'BlinkerRegular',
    fontSize: moderateScale(23, 0.5),
    color: COLORS.DARK,
  },
  header: {
    fontFamily: 'BlinkerSemiBold',
    fontSize: moderateScale(18, 0.5),
    color: COLORS.DARK,
  },
  item: {
    fontFamily: 'BlinkerRegular',
    fontSize: moderateScale(14, 0.5), //18
    color: COLORS.DARK,
  },
  pageContainer: {
    flex: 1,
    flexDirection: 'row',
    width: Dimensions.get('window').width * 2, // 2 pages
  },
  page: {
    width: Dimensions.get('window').width,
    flex: 1,
    paddingHorizontal: scale(16),
  },
  PosBtn: {position: 'absolute', bottom: verticalScale(20), right: scale(16)},
  posImg: {width: scale(90), height: scale(90), resizeMode: 'contain'},
  button: {
    width: '90%',
    height: verticalScale(40),
    backgroundColor: '#E1306C',
    alignSelf: 'center',
    marginTop: 30,
    borderRadius:50
  },
});
