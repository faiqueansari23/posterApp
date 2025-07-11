import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Alert,
  ActivityIndicator,
  Image as rnImage,
} from 'react-native';
import {COLORS} from '../../themes/palette';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamsList} from '../../navigation/AppNavigator';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Svg, {
  Circle,
  Text as SvgText,
  TextPath,
  TSpan,
  G,
  Defs,
  Path,
  Image,
} from 'react-native-svg';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface SettingScreenProps {
  navigation: NativeStackNavigationProp<RootStackParamsList>;
}

export default function SettingScreen({navigation}: SettingScreenProps) {
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
        `https://qaswatechnologies.com/april_bb/admin/public/api/getProfile/${id}`,
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

  const initials = 'Qaswa Technologies Pvt Ltd'
    .split(' ')
    .filter(
      word =>
        word.length > 2 &&
        word.toLowerCase() !== 'pvt' &&
        word.toLowerCase() !== 'ltd',
    )
    .map(word => word[0])
    .join('');

  useEffect(() => {
    fetchProfileData();
  }, []);

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
              marginLeft: scale(5),
            }}>
            Settings
          </Text>
        </View>
      </View>

      <View style={styles.subContainer}>
        <View style={styles.postCard}>
          <TouchableOpacity
            onPress={() => navigation.navigate('ContactUs')}
            style={styles.button}
            activeOpacity={0.7}>
            <FontAwesome name="phone" size={18} color="#E1306C" />
            <Text style={styles.buttonText}>Contact Us</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('AboutUs')}
            style={styles.button}
            activeOpacity={0.7}>
            <Fontisto name="info" size={18} color="#E1306C" />
            <Text style={styles.buttonText}>About Us</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('PrivacyPolicy')}
            style={styles.button}
            activeOpacity={0.7}>
            <Octicons name="shield-lock" size={18} color="#E1306C" />
            <Text style={styles.buttonText}>Privacy Policy</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('Refund')}
            style={styles.button}
            activeOpacity={0.7}>
            <MaterialCommunityIcons
              name="cash-refund"
              size={18}
              color="#E1306C"
            />
            <Text style={styles.buttonText}>Refund & Cancellation</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('Terms')}
            style={styles.button}
            activeOpacity={0.7}>
            <MaterialCommunityIcons
              name="newspaper-variant-outline"
              size={18}
              color="#E1306C"
            />
            <Text style={styles.buttonText}>Terms & Condition</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              Alert.alert('Faique', 'Are you sure you want to logout?');
            }}
            style={[
              styles.button,
              {backgroundColor: 'rgba(239, 178, 178, 0.1)'},
            ]}
            activeOpacity={0.7}>
            <MaterialIcons name="logout" size={18} color="red" />
            <Text style={[styles.buttonText, {color: 'red'}]}>Logout</Text>
          </TouchableOpacity>
        </View>
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
    alignItems: 'center',
    marginTop: 20,
  },
  postCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    width: '90%',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginVertical: 5,
    backgroundColor: 'rgba(239, 178, 178, 0.1)',
  },
  buttonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 10,
  },
});
