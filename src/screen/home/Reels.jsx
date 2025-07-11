// import React, {useEffect, useState, useRef} from 'react';
// import {
//   View,
//   Text,
//   ActivityIndicator,
//   StyleSheet,
//   FlatList,
//   TouchableOpacity,
//   Dimensions,
// } from 'react-native';
// import Video from 'react-native-video';
// import Share from 'react-native-share';
// import RNFetchBlob from 'rn-fetch-blob';
// import {useFocusEffect, useNavigation} from '@react-navigation/native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import RNFS from 'react-native-fs';
// import axios from 'axios';

// import CameraRoll from '@react-native-camera-roll/camera-roll';
// import {PermissionsAndroid, Platform, Alert} from 'react-native';

// const {width} = Dimensions.get('window');

// const Reels = () => {
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const videoRefs = useRef({});
//   const [playingIndex, setPlayingIndex] = useState(null);
//   const navigation = useNavigation();

//   useEffect(() => {
//     fetch('https://www.brandboostindia.com/api/show_post')
//       .then(response => response.json())
//       .then(data => {
//         if (data?.data && Array.isArray(data.data)) {
//           const videoPosts = data.data.filter(item => item.type === 'Video');
//           setPosts(videoPosts);
//         } else {
//           setPosts([]);
//         }
//         setLoading(false);
//       })
//       .catch(error => {
//         console.error('Failed to fetch posts:', error.message);
//         setLoading(false);
//       });
//   }, []);

//   useFocusEffect(
//     React.useCallback(() => {
//       return () => {
//         setPlayingIndex(null);
//       };
//     }, []),
//   );

//   const onViewableItemsChanged = ({viewableItems}) => {
//     if (viewableItems.length > 0) {
//       setPlayingIndex(viewableItems[0].index);
//     }
//   };

//   const viewabilityConfig = {
//     itemVisiblePercentThreshold: 50,
//   };

// const downloadVideo = async (videoId) => {
//   try {
//     setLoading(true);

//     const userDataString = await AsyncStorage.getItem('userData');
//     const userData = JSON.parse(userDataString);
//     const userId = userData?.id;

//     const response = await axios.post(
//       `https://www.brandboostindia.com/api/overlay-video/${videoId}`,
//       { user_id: userId }
//     );

//     const videoUrl = response.data.updated_video_url;
//     console.log('🎥 Updated Video URL:', response.data.updated_video_url);
//     const fileName = videoUrl.split('/').pop();

//     // ✅ Safe path for all Android versions
//     const localPath = `${RNFS.DocumentDirectoryPath}/${fileName}`;

//     // ✅ Download to internal app directory
//     const downloadRes = await RNFS.downloadFile({
//       fromUrl: videoUrl,
//       toFile: localPath,
//     }).promise;

//     if (downloadRes.statusCode === 200) {
//       await CameraRoll.save(localPath, { type: 'video' });
//       Alert.alert('Success', 'Video saved to gallery!');
//     } else {
//       Alert.alert('Error', 'Video download failed.');
//     }

//   } catch (err) {
//     console.error('❌ API Error:', err);
//     if (err.response) {
//       console.log('Backend response data:', err.response.data);
//     }
//     Alert.alert('Error', 'Something went wrong.');
//   } finally {
//     setLoading(false);
//   }
// };

//   const renderCard = ({item, index}) => {
//     return (
//       <View style={styles.cardContainer}>
//         <View style={styles.card}>
//           <Video
//             ref={ref => (videoRefs.current[index] = ref)}
//             source={{uri: item.path_url}}
//             style={styles.media}
//             resizeMode="cover"
//             repeat
//             paused={playingIndex !== index}
//             onError={error => console.log('Video Error:', error.message)}
//           />

//           <View style={styles.buttonContainer}>
//             <TouchableOpacity
//               style={styles.button}
//               onPress={() => {
//                 console.log('Downloading video with ID:', item.id);
//                 downloadVideo(item.id);
//               }}>
//               <Text style={styles.buttonText}>Download</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </View>
//     );
//   };

//   return loading ? (
//     <ActivityIndicator size="large" color="#007bff" />
//   ) : posts.length === 0 ? (
//     <Text style={styles.noPosts}>No videos found.</Text>
//   ) : (
//     <FlatList
//       data={posts}
//       keyExtractor={item => item.id.toString()}
//       renderItem={renderCard}
//       onViewableItemsChanged={onViewableItemsChanged}
//       viewabilityConfig={viewabilityConfig}
//     />
//   );
// };

// const styles = StyleSheet.create({
//   cardContainer: {
//     paddingHorizontal: 8,
//     paddingVertical: 8,
//   },
//   card: {
//     width: '100%',
//     height: 450,
//     borderRadius: 10,
//     overflow: 'hidden',
//     backgroundColor: '#000',
//     shadowColor: '#000',
//     shadowOffset: {width: 0, height: 4},
//     shadowOpacity: 0.3,
//     shadowRadius: 6,
//     elevation: 5,
//     position: 'relative',
//   },
//   media: {
//     width: '100%',
//     height: '100%',
//   },
//   noPosts: {
//     textAlign: 'center',
//     fontSize: 18,
//     marginVertical: 20,
//   },
//   buttonContainer: {
//     position: 'absolute',
//     bottom: 6,
//     left: 0,
//     right: 0,
//     alignItems: 'center',
//   },
//   button: {
//     backgroundColor: '#E1306C',
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 10,
//     alignItems: 'center',
//     width: '80%',
//   },
//   buttonText: {
//     color: '#fff',
//     fontWeight: 'bold',
//     textAlign: 'center',
//     fontSize: 16,
//   },
// });

// export default Reels;

// import React, { useEffect, useState, useRef } from 'react';
// import {
//   View,
//   Text,
//   ActivityIndicator,
//   StyleSheet,
//   FlatList,
//   TouchableOpacity,
//   Dimensions,
//   PermissionsAndroid,
//   Platform,
//   Alert,
// } from 'react-native';
// import Video from 'react-native-video';
// import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useFocusEffect } from '@react-navigation/native';
// import RNFS from 'react-native-fs';

// const { width } = Dimensions.get('window');

// const Reels = () => {
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const videoRefs = useRef({});
//   const [playingIndex, setPlayingIndex] = useState(null);

//   useEffect(() => {
//     fetch('https://www.brandboostindia.com/api/show_post')
//       .then(response => response.json())
//       .then(data => {
//         if (data?.data && Array.isArray(data.data)) {
//           const videoPosts = data.data.filter(item => item.type === 'Video');
//           setPosts(videoPosts);
//         } else {
//           setPosts([]);
//         }
//         setLoading(false);
//       })
//       .catch(error => {
//         console.error('Failed to fetch posts:', error.message);
//         setLoading(false);
//       });
//   }, []);

//   useFocusEffect(
//     React.useCallback(() => {
//       return () => setPlayingIndex(null);
//     }, [])
//   );

//   const onViewableItemsChanged = ({ viewableItems }) => {
//     if (viewableItems.length > 0) {
//       setPlayingIndex(viewableItems[0].index);
//     }
//   };

//   const viewabilityConfig = {
//     itemVisiblePercentThreshold: 50,
//   };

// const requestStoragePermission = async () => {
//   if (Platform.OS === 'android') {
//     if (Platform.Version >= 33) {
//       const granted = await PermissionsAndroid.request(
//         PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
//         {
//           title: 'Media Permission',
//           message: 'App needs access to save videos to your gallery.',
//           buttonNeutral: 'Ask Me Later',
//           buttonNegative: 'Cancel',
//           buttonPositive: 'OK',
//         },
//       );
//       return granted === PermissionsAndroid.RESULTS.GRANTED;
//     } else {
//       const granted = await PermissionsAndroid.request(
//         PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
//         {
//           title: 'Storage Permission',
//           message: 'App needs access to save videos to your gallery.',
//           buttonNeutral: 'Ask Me Later',
//           buttonNegative: 'Cancel',
//           buttonPositive: 'OK',
//         },
//       );
//       return granted === PermissionsAndroid.RESULTS.GRANTED;
//     }
//   }
//   return true; // iOS
// };

// const downloadVideo = async (videoId) => {
//   try {
//     setLoading(true);

//     const hasPermission = await requestStoragePermission();
//     if (!hasPermission) {
//       Alert.alert('Permission Denied', 'Cannot save video without permission.');
//       return;
//     }

//     const userDataString = await AsyncStorage.getItem('userData');
//     const userData = JSON.parse(userDataString);
//     const userId = userData?.id;

//     const response = await axios.post(
//       `https://www.brandboostindia.com/api/overlay-video/${videoId}`,
//       { user_id: userId }
//     );

//     const videoUrl = response.data.updated_video_url;
//     console.log('🎥 Updated Video URL:', videoUrl);

//     const fileName = videoUrl.split('/').pop();
//     const localPath = `${RNFS.DownloadDirectoryPath}/${fileName}`; // ✅ Will save in Downloads folder

//     const options = {
//       fromUrl: videoUrl,
//       toFile: localPath,
//     };

//     const result = await RNFS.downloadFile(options).promise;

//     if (result.statusCode === 200) {
//       Alert.alert('Success', `Video saved to: ${localPath}`);
//     } else {
//       Alert.alert('Error', 'Video download failed.');
//     }

//   } catch (err) {
//     console.error('❌ API Error:', err);
//     Alert.alert('Error', 'Something went wrong while downloading.');
//   } finally {
//     setLoading(false);
//   }
// };

//   const renderCard = ({ item, index }) => (
//     <View style={styles.cardContainer}>
//       <View style={styles.card}>
//         <Video
//           ref={ref => (videoRefs.current[index] = ref)}
//           source={{ uri: item.path_url }}
//           style={styles.media}
//           resizeMode="cover"
//           repeat
//           paused={playingIndex !== index}
//           onError={error => console.log('Video Error:', error.message)}
//         />
//         <View style={styles.buttonContainer}>
//           <TouchableOpacity
//             style={styles.button}
//             onPress={() => {
//               console.log('Downloading video with ID:', item.id);
//               downloadVideo(item.id);
//             }}>
//             <Text style={styles.buttonText}>Download</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </View>
//   );

//   if (loading) {
//     return <ActivityIndicator size="large" color="#007bff" />;
//   }

//   if (posts.length === 0) {
//     return <Text style={styles.noPosts}>No videos found.</Text>;
//   }

//   return (
//     <FlatList
//       data={posts}
//       keyExtractor={item => item.id.toString()}
//       renderItem={renderCard}
//       onViewableItemsChanged={onViewableItemsChanged}
//       viewabilityConfig={viewabilityConfig}
//     />
//   );
// };

// const styles = StyleSheet.create({
//   cardContainer: {
//     paddingHorizontal: 8,
//     paddingVertical: 8,
//   },
//   card: {
//     width: '100%',
//     height: 450,
//     borderRadius: 10,
//     overflow: 'hidden',
//     backgroundColor: '#000',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.3,
//     shadowRadius: 6,
//     elevation: 5,
//     position: 'relative',
//   },
//   media: {
//     width: '100%',
//     height: '100%',
//   },
//   noPosts: {
//     textAlign: 'center',
//     fontSize: 18,
//     marginVertical: 20,
//   },
//   buttonContainer: {
//     position: 'absolute',
//     bottom: 6,
//     left: 0,
//     right: 0,
//     alignItems: 'center',
//   },
//   button: {
//     backgroundColor: '#E1306C',
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 10,
//     alignItems: 'center',
//     width: '80%',
//   },
//   buttonText: {
//     color: '#fff',
//     fontWeight: 'bold',
//     textAlign: 'center',
//     fontSize: 16,
//   },
// });

// export default Reels;

import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Alert,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import Video from 'react-native-video';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';
import RNFS from 'react-native-fs';
import RNFetchBlob from 'rn-fetch-blob';

const {width} = Dimensions.get('window');

const Reels = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const videoRefs = useRef({});
  const [playingIndex, setPlayingIndex] = useState(null);

  useEffect(() => {
    fetch('https://www.brandboostindia.com/api/show_post')
      .then(response => response.json())
      .then(data => {
        const videoPosts =
          data?.data?.filter(item => item.type === 'Video') || [];
        setPosts(videoPosts);
        setLoading(false);
      })
      .catch(error => {
        console.error('❌ Failed to fetch posts:', error.message);
        setLoading(false);
      });
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      return () => setPlayingIndex(null);
    }, []),
  );

  const onViewableItemsChanged = ({viewableItems}) => {
    if (viewableItems.length > 0) {
      setPlayingIndex(viewableItems[0].index);
    }
  };

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50,
  };

  const requestStoragePermission = async () => {
    if (Platform.OS === 'android') {
      if (Platform.Version >= 33) {
        const granted = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        ]);
        return (
          granted['android.permission.READ_MEDIA_VIDEO'] ===
          PermissionsAndroid.RESULTS.GRANTED
        );
      } else {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      }
    }
    return true;
  };

  const downloadVideo = async videoId => {
    try {
      setLoading(true);

      const hasPermission = await requestStoragePermission();
      if (!hasPermission) {
        Alert.alert(
          'Permission Denied',
          'Cannot save video without permission.',
        );
        return;
      }

      const userDataString = await AsyncStorage.getItem('userData');
      const userData = JSON.parse(userDataString);
      const userId = userData?.id;

      const response = await fetch(
        `https://www.brandboostindia.com/api/overlay-video/${videoId}`,
        {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({user_id: userId}),
        },
      );
      const result = await response.json();

      const videoUrl = result.updated_video_url;
      console.log('🎥 Updated Video URL:', videoUrl);

      const fileName = videoUrl.split('/').pop();
      const downloadDest = `${RNFS.ExternalDirectoryPath}/${fileName}`;

      const downloadRes = await RNFS.downloadFile({
        fromUrl: videoUrl,
        toFile: downloadDest,
      }).promise;

      if (downloadRes.statusCode === 200) {
        // Refresh gallery
        await RNFetchBlob.fs
          .scanFile([{path: downloadDest, mime: 'video/mp4'}])
          .then(() => {
            console.log('✅ Media scan complete');
            Alert.alert(
              'Success',
              `Video saved and visible in gallery:\n${downloadDest}`,
            );
          })
          .catch(err => {
            console.error('❌ Media scan failed:', err);
            Alert.alert(
              'Saved',
              `Video saved but not visible in gallery. Open from file manager:\n${downloadDest}`,
            );
          });
      } else {
        Alert.alert('Error', 'Download failed. Try again.');
      }
    } catch (err) {
      console.error('❌ Download Error:', err);
      Alert.alert('Error', 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

const renderCard = ({item, index}) => (
  <View style={styles.cardContainer}>
    <View style={styles.card}>
      <Video
        ref={ref => (videoRefs.current[index] = ref)}
        source={{uri: item.path_url}}
        style={styles.media}
        resizeMode="contain" // 👈 Use 'contain' to avoid cropping
        repeat
        paused={playingIndex !== index}
        onError={e => console.error('Video Error:', e)}
      />
    </View>

    {/* Download Button Outside of Video */}
    <View style={styles.buttonContainer}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => downloadVideo(item.id)}>
        <Text style={styles.buttonText}>Download</Text>
      </TouchableOpacity>
    </View>
  </View>
);


  if (loading) return <ActivityIndicator size="large" color="#E1306C" />;
  if (posts.length === 0)
    return <Text style={styles.noPosts}>No videos found.</Text>;

  return (
    <FlatList
      data={posts}
      keyExtractor={item => item.id.toString()}
      renderItem={renderCard}
      onViewableItemsChanged={onViewableItemsChanged}
      viewabilityConfig={viewabilityConfig}
    />
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    paddingHorizontal: 8,
    paddingBottom: 20,
  },
  card: {
    width: '100%',
    aspectRatio: 9 / 16, // Maintain vertical video ratio (like reels)
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#000',
    elevation: 5,
  },
  media: {
    width: '100%',
    height: '100%',
  },
  noPosts: {
    textAlign: 'center',
    fontSize: 18,
    marginVertical: 20,
  },
  buttonContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#E1306C',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    width: '80%',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
});


export default Reels;
