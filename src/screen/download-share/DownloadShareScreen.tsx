import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  ActivityIndicator,
  Button,
  Linking,
  Alert,
} from 'react-native';
import {COLORS} from '../../themes/palette';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamsList} from '../../navigation/AppNavigator';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ViewShot, {captureRef} from 'react-native-view-shot';
import Share from 'react-native-share';
import {RouteProp} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import PlansList from './components/PlansList';
import {TouchableHighlight} from 'react-native';
import RazorpayCheckout from 'react-native-razorpay';
import Video from 'react-native-video';
import RNFetchBlob from 'rn-fetch-blob';
// import { FFmpegKit } from 'ffmpeg-kit-react-native';



interface IDownloadShareScreenProps {
  navigation: NativeStackNavigationProp<RootStackParamsList>;
  route: RouteProp<RootStackParamsList, 'DownloadShare'>;
}

const {width: screenWidth} = Dimensions.get('window');

export default function DownloadShareScreen({
  route,
  navigation,
}: IDownloadShareScreenProps) {
  const post = route.params?.post;
  console.log('post=>', JSON.stringify(post));

  const businessNamePosition = parseInt(post?.business_name_position, 10) - 1; // Convert to zero-based index
  const logoPosition = parseInt(post?.logo_position, 10) - 1; // Convert to zero-based index
  const phonePosition = parseInt(post?.phone_position, 10) - 1; // Convert to zero-based index
  const tagPosition = parseInt(post?.tagline_position, 10) - 1; // Convert to zero-based index
  const socialPosition = parseInt(post?.social_media_position, 10) - 1; // Convert to zero-based index

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [profileLogo, setProfileLogo] = useState<string>('');
  const [profileBusiness, setBusiness] = useState<string>('');
  const [profileTag, setprofileTag] = useState<string>('');
  const [profilePhone, setprofilePhone] = useState<string>('');
  const [profileSocial, setprofileSocial] = useState<string>('');
  const [subscriptionId, setSubscriptionId] = useState<any>(null);

  const viewRef = useRef<any>(null);

  const fetchProfileData = async () => {
    try {
      const userDataString = await AsyncStorage.getItem('userData');
      if (!userDataString) {
        throw new Error('No user data found.');
      }
      // console.log('uer data->', userDataString);
      const {id} = JSON.parse(userDataString);
      const {data: response} = await axios.get(
        `https://ashhari.com/bbn/public/api/getProfile/${id}`,
      );
      // console.log('get profile response=>', response.data);
      if (response.status === 'True') {
        const profile = response.data;
        setProfileLogo(profile.profile_logo);
        setBusiness(profile.bussiness_name);
        setprofilePhone(profile.whatsappno);
        setprofileTag(profile.tagline);
        setprofileSocial(profile.instagram_facebook);
      } else {
        console.log(
          'Error',
          response.message || 'Failed to load profile data.',
        );
      }
    } catch (profileError) {
      console.log(
        'Error',
        'Unable to fetch profile data. Please try again.',
        profileError,
      );
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, [post]);

  useEffect(() => {
    const fetchUserStatus = async () => {
      try {
        setLoading(true);
        const userDataString = await AsyncStorage.getItem('userData');
        if (!userDataString) {
          throw new Error('No user data found.');
        }
        // console.log('uer data->', userDataString);
        const {id} = JSON.parse(userDataString);
        const response = await axios.get(
          `https://ashhari.com/bbn/public/api/get_user_status?user_id=${id}`,
        );
        setSubscriptionId(response.data.subscription_id || null); // Assuming API response structure suits your needs
      } catch (err) {
        console.error('Error fetching user status:', err);
        setError('Failed to fetch user status.');
      } finally {
        setLoading(false);
      }
    };
    fetchUserStatus();
  }, []);

  const shareView = async () => {
    try {
      // Delay to ensure view is fully rendered before capture
      setTimeout(async () => {
        const uri = await viewRef.current.capture();
        await Share.open({
          url: uri,
          type: 'image/jpeg',
        });
      }, 1000);
    } catch (err) {
      console.error('Error sharing view:', err);
    }
  };

  const shareImage = async () => {
    try {
      const uri = await captureRef(viewRef, {
        format: 'png',
        quality: 0.7,
      });
      console.log('uri', uri);
      await Share.open({url: uri});
    } catch (e) {
      console.log(e);
    }
  };

  const shareVideo = async () => {
    try {
      const { config, fs } = RNFetchBlob;
      const videoUrl = post.path_url; // Your video URL
      const fileExt = videoUrl.split('.').pop(); // Extract file extension (e.g., mp4)
      const fileName = `shared_video.${fileExt}`;
      const filePath = `${fs.dirs.CacheDir}/${fileName}`; // Save to cache directory
  
      console.log('Downloading video to:', filePath);
  
      // Download video
      const res = await config({
        fileCache: true,
        path: filePath,
      }).fetch('GET', videoUrl);
  
      console.log('Video downloaded to:', res.path());
  
      // Process video to add text
      const processedVideoPath = await addTextToVideo(res.path());
  
      if (!processedVideoPath) {
        console.log("Error processing video.");
        return;
      }
  
      // Share the processed video
      await Share.open({
        url: `file://${processedVideoPath}`, // Local file path
        type: 'video/mp4', // Ensure correct MIME type
      });
  
    } catch (e) {
      console.log('Error sharing video:', e);
    }
  };
  

  const addTextToVideo = async (videoPath) => {
    const outputVideoPath = `${RNFetchBlob.fs.dirs.CacheDir}/final_video.mp4`; // Save in cache folder
  
    const ffmpegCommand = `-i ${videoPath} -vf "drawtext=text='My Custom Text':fontcolor=white:fontsize=30:x=10:y=H-th-10" -codec:a copy ${outputVideoPath}`;
  
    try {
      console.log("Processing video...");
      await FFmpegKit.execute(ffmpegCommand);

      console.log("Processed Video Path:", outputVideoPath);
      return outputVideoPath;
    } catch (error) {
      console.error("FFmpeg Error:", error);
      return null;
    }
  };


//   const addTextToVideo = async (videoPath) => {
//     const outputVideoPath = `${RNFS.CachesDirectoryPath}/final_video.mp4`;
  
//     const ffmpegCommand = `-i ${videoPath} -vf "drawtext=text='My Custom Text':fontcolor=white:fontsize=30:x=10:y=H-th-10" -codec:a copy ${outputVideoPath}`;
  
//     try {
//       console.log("Processing video...");
//       await RNFFmpeg.execute(ffmpegCommand);
//       console.log("Processed Video Path:", outputVideoPath);
//       return outputVideoPath;
//     } catch (error) {
//       console.error("FFmpeg Error:", error);
//       return null;
//     }
//   };
  
  // 'mjdsheikh7@okicici',
  // upi://pay?pa=mjdsheikh7@okicici&pn=Mujahid%20Sheikh&aid=uGICAgICLjJ7Wbw

  // const upiURL = 'upi://pay?pa=9545571507@ibl&pn9545571507&mc=0000&mode=02&purpose=00&am=1&cu=INR';
  const upiURL =
    'upi://pay?pa=mjdsheikh7@okicici&pn=Mujahid%20Sheikh&aid=uGICAgICLjJ7Wbw&mc=0000&mode=02&purpose=00';

  const upiOpener = () => {
    Linking.openURL(upiURL);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.WHITE} barStyle="light-content" />
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}>
        <AntDesign name="leftcircleo" size={30} color={COLORS.DARK} />
      </TouchableOpacity>
      <View style={styles.subContainer}>
        <Button
          title="change View"
          onPress={upiOpener}
          // onPress={() => { subscriptionId === null ? setSubscriptionId(1) : setSubscriptionId(null); }}
        />
        <TouchableHighlight
          onPress={() => {
            var options = {
              description: 'Credits towards consultation',
              image: 'https://i.imgur.com/3g7nmJC.jpg',
              currency: 'INR',
              key: 'rzp_test_KnBzorOzcIfifR',
              amount: '5000',
              name: 'Acme Corp',
              order_id: '', //Replace this with an order_id created using Orders API.
              prefill: {
                email: 'siddiquesheikh95951@gmail.com',
                contact: '919545571507',
                name: 'Siddique Sheikh',
              },
              theme: {color: '#53a20e'},
            };
            RazorpayCheckout.open(options)
              .then((data: any) => {
                // handle success
                Alert.alert(`Success: ${data.razorpay_payment_id}`);
                console.log(`Success: ${data.razorpay_payment_id}`);
              })
              .catch((err: any) => {
                // handle failure
                Alert.alert(`Error: ${err.code} | ${err.description}`);
                console.log(`Error: ${err.code} | ${err.description}`);
              });
          }}
          style={{
            backgroundColor: 'black',
            width: 200,
            height: 50,
            borderRadius: 20,
            marginVertical: 8,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{color: 'white', fontSize: 20}}>pay</Text>
        </TouchableHighlight>

        <View>
          <TouchableOpacity
            onPress={post.type === 'Image' ? shareImage : shareVideo}
            style={styles.button}>
            <Entypo name="share" size={18} color={COLORS.DARK} />
            <Text
              style={{
                color: COLORS.DARK,
                marginLeft: scale(5),
                fontSize: moderateScale(14),
              }}>
              Share
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={shareView} style={styles.button}>
            <Entypo name="download" size={18} color={COLORS.DARK} />

            <Text
              style={{
                color: COLORS.DARK,
                marginLeft: scale(5),
                fontSize: moderateScale(14),
              }}>
              share-view
            </Text>
          </TouchableOpacity>
          <ViewShot ref={viewRef} options={{format: 'jpg', quality: 0.9}}>
            <View style={[styles.mediaContainer]}>
              {post.type === 'Image' ? (
                <Image
                  source={{uri: post.image}}
                  style={[StyleSheet.absoluteFillObject]}
                  resizeMode="cover"
                />
              ) : (
                <Video
                  source={{uri: post.path_url}}
                  style={[StyleSheet.absoluteFillObject]}
                  resizeMode="cover"
                  controls={false}
                />
              )}

              <View style={[styles.overlay]}>
                {Array.from({length: 9}).map((_, index) => (
                  <View key={index} style={styles.gridBox}>
                    {index === businessNamePosition && (
                      <Text style={styles.businessName}>{profileBusiness}</Text>
                    )}
                    {index === logoPosition && (
                      <Image
                        source={{uri: profileLogo}}
                        style={styles.logo}
                        resizeMode="contain"
                      />
                    )}
                    {index === socialPosition && (
                      <Text style={styles.businessName}>{profileSocial}</Text>
                    )}
                    {index === phonePosition && (
                      <Text style={styles.businessName}>{profilePhone}</Text>
                    )}
                    {index === tagPosition && (
                      <Text style={styles.businessName}>{profileTag}</Text>
                    )}
                  </View>
                ))}
              </View>
            </View>
          </ViewShot>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: scale(16),
    paddingBottom: verticalScale(32),
    backgroundColor: COLORS.OFFWHITE,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.OFFWHITE,
  },
  subContainer: {
    flex: 1,
    paddingVertical: verticalScale(15),
    paddingHorizontal: scale(24),
    alignItems: 'center',
  },
  button: {
    width: '50%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    borderRadius: moderateScale(5),
    borderWidth: 1,
    borderColor: COLORS.DARK,
    padding: moderateScale(5),
    marginVertical: verticalScale(5),
  },
  mediaContainer: {
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    overflow: 'hidden',
    width: screenWidth - 20,
    height: screenWidth - 20,
    position: 'relative',
  },
  overlay: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    ...StyleSheet.absoluteFillObject, // Layer this view on top of the image
    backgroundColor: 'transparent',
  },
  gridBox: {
    width: '33.33%',
    height: '33.33%',
    // borderWidth: 1,
    // borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    width: screenWidth - 20,
    height: screenWidth - 20,
  },
  businessName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  logo: {
    width: 50,
    height: 50,
  },
});
