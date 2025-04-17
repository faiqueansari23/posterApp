// import React, { useEffect, useState, useRef } from 'react';
// import {
//   View,
//   Text,
//   ActivityIndicator,
//   StyleSheet,
//   FlatList,
//   TouchableOpacity,
// } from 'react-native';
// import Video from 'react-native-video';
// import ViewShot from 'react-native-view-shot';
// import Share from 'react-native-share';
// import RNFetchBlob from 'rn-fetch-blob'

// const Reels = () => {
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const videoRefs = useRef({});
//   const [playingIndex, setPlayingIndex] = useState(null);

//   useEffect(() => {
//     fetch('https://ashhari.com/bbn/public/api/show_post')
//       .then((response) => response.json())
//       .then((data) => {
//         if (data?.categories && Array.isArray(data.categories)) {
//           setPosts(data.categories.filter(item => item.type === 'Video')); // 🛑 Sirf videos fetch kar raha hoon
//         } else {
//           setPosts([]);
//         }
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error('Failed to fetch posts:', error.message);
//         setLoading(false);
//       });
//   }, []);

//   if (loading) {
//     return <ActivityIndicator size="large" color="#007bff" />;
//   }

//   if (posts.length === 0) {
//     return <Text style={styles.noPosts}>No videos found.</Text>;
//   }

//   // 🛑 Ye function identify karega ke kaunsa item screen ke center me hai
//   const onViewableItemsChanged = ({ viewableItems }) => {
//     if (viewableItems.length > 0) {
//       setPlayingIndex(viewableItems[0].index); // Center wala video play hoga
//     }
//   };

//   const viewabilityConfig = {
//     itemVisiblePercentThreshold: 50, // Agar 50% se zyada dikhe to active hoga
//   };

//   const captureAndShareVideo = async (index, videoUrl) => {
//     try {
//       const { config, fs } = RNFetchBlob;
//       const fileName = `Captured_Video_${Date.now()}.mp4`;
//       const filePath = `${fs.dirs.DownloadDir}/${fileName}`;
  
//       // Download video
//       const res = await config({ fileCache: true, path: filePath }).fetch('GET', videoUrl);
//       console.log('Saved Video Path:', res.path());
  
//       // Share the downloaded video (with text/logo overlays already added)
//       await shareFile(`file://${res.path()}`);
//     } catch (error) {
//       console.error('Capture or Download Error:', error.message);
//     }
//   };
  
//   const shareFile = async (fileUri) => {
//   try {
//     await Share.open({
//       url: fileUri,
//       message: 'Check out this custom video with text/logo!',
//     });
//   } catch (error) {
//     console.error('Share Error:', error);
//   }
// };


//   const downloadAndShareVideo = (videoUrl) => {
//     const { config, fs } = RNFetchBlob;
//     const fileName = videoUrl.split('/').pop().replace(/[^a-zA-Z0-9.]/g, '');
//     const path = `${fs.dirs.CacheDir}/${fileName}`;

//     config({ fileCache: true, path })
//       .fetch('GET', videoUrl)
//       .then((res) => {
//         shareFile(`file://${res.path()}`);
//       })
//       .catch((error) => console.error('Download Error:', error.message));
//   };

//   const renderCard = ({ item, index }) => (
//     <View style={styles.card}>
//       <Video
//         ref={(ref) => (videoRefs.current[index] = ref)}
//         source={{ uri: item.path_url }}
//         style={styles.media}
//         resizeMode="cover"
//         repeat
//         paused={playingIndex !== index}
//         onError={(error) => console.log('Video Error:', error.message)}
//       />
//       {item.type === 'Video' && item.path_url && (
//         <View style={styles.buttonContainer}>
//           <TouchableOpacity
//             style={styles.button}
//             onPress={() => captureAndShareVideo(index, item.path_url)}>
//             <Text style={styles.buttonText}>Download & Share Video</Text>
//           </TouchableOpacity>
//         </View>
//       )}
//     </View>
//   );
  
//   return (
//     <FlatList
//       data={posts}
//       keyExtractor={(item) => item.id.toString()}
//       renderItem={renderCard}
//       pagingEnabled
//       onViewableItemsChanged={onViewableItemsChanged} // ✅ Track karega ke kaunsi video visible hai
//       viewabilityConfig={viewabilityConfig}
//     />
//   );
// };

// const styles = StyleSheet.create({
//   card: {
//     width: '100%',
//     height: 600, // Adjust according to screen size
//     justifyContent: 'center',
//     alignItems: 'center',
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
//     bottom: 20,  // ✅ Video ke neeche fix karne ke liye
//     left: 0,
//     right: 0,
//     alignItems: 'center', // ✅ Center me rakhne ke liye
//   },
//   button: {
//     backgroundColor: '#007bff',
//     paddingVertical: 12, 
//     paddingHorizontal: 20,
//     borderRadius: 8,
//     alignItems: 'center',
//     width: '80%', // ✅ Button ka width thoda adjust kiya
//   },
//   buttonText: {
//     color: '#fff',
//     fontWeight: 'bold',
//     textAlign: 'center',
//     fontSize: 16,
//   },
// });
// export default Reels;

import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import Video from 'react-native-video';
import Share from 'react-native-share';
import RNFetchBlob from 'rn-fetch-blob';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

const Reels = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const videoRefs = useRef({});
  const [playingIndex, setPlayingIndex] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    fetch('https://ashhari.com/bbn/public/api/show_post')
      .then((response) => response.json())
      .then((data) => {
        if (data?.categories && Array.isArray(data.categories)) {
          setPosts(data.categories.filter((item) => item.type === 'Video'));
        } else {
          setPosts([]);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error('Failed to fetch posts:', error.message);
        setLoading(false);
      });
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        setPlayingIndex(null);
      };
    }, [])
  );

  const onViewableItemsChanged = ({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setPlayingIndex(viewableItems[0].index);
    }
  };

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50,
  };

  const downloadAndShareVideo = async (videoUrl) => {
    try {
      const { config, fs } = RNFetchBlob;
      const fileName = `Captured_Video_${Date.now()}.mp4`;
      const filePath = `${fs.dirs.DownloadDir}/${fileName}`;

      const res = await config({ fileCache: true, path: filePath }).fetch('GET', videoUrl);
      console.log('Saved Video Path:', res.path());

      await Share.open({
        url: `file://${res.path()}`,
        message: 'Check out this video!',
      });
    } catch (error) {
      console.error('Download or Share Error:', error.message);
    }
  };

  const renderCard = ({ item, index }) => {
    const businessNamePosition = item.business_name_position ? parseInt(item.business_name_position, 10) - 1 : 0;
    const logoPosition = item.logo_position ? parseInt(item.logo_position, 10) - 1 : 1;
    const phonePosition = item.phone_position ? parseInt(item.phone_position, 10) - 1 : 2;
    const tagPosition = item.tagline_position ? parseInt(item.tagline_position, 10) - 1 : 3;
    const socialPosition = item.social_media_position ? parseInt(item.social_media_position, 10) - 1 : 4;

    return (
      <View style={styles.card}>
        <Video
          ref={(ref) => (videoRefs.current[index] = ref)}
          source={{ uri: item.path_url }}
          style={styles.media}
          resizeMode="cover"
          repeat
          paused={playingIndex !== index}
          onError={(error) => console.log('Video Error:', error.message)}
        />

        <View style={styles.overlay}>
          {Array.from({ length: 9 }).map((_, idx) => (
            <View key={idx} style={styles.gridBox}>
              {idx === businessNamePosition && <Text style={styles.overlayText}>profileBusiness</Text>}
              {/* {idx === logoPosition && profileLogo && <Image source={{ uri: profileLogo }} style={styles.logo} />} */}
              {idx === socialPosition && <Text style={styles.overlayText}>profileSocial</Text>}
              {idx === phonePosition && <Text style={styles.overlayText}>profilePhone</Text>}
              {idx === tagPosition && <Text style={styles.overlayText}>profileTag</Text>}
            </View>
          ))}
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => downloadAndShareVideo(item.path_url)}>
            <Text style={styles.buttonText}>Download & Share Video</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return loading ? (
    <ActivityIndicator size="large" color="#007bff" />
  ) : posts.length === 0 ? (
    <Text style={styles.noPosts}>No videos found.</Text>
  ) : (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderCard}
      pagingEnabled
      onViewableItemsChanged={onViewableItemsChanged}
      viewabilityConfig={viewabilityConfig}
    />
  );
};

const styles = StyleSheet.create({
  card: {
    width: '100%',
    height: 600,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
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
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    width: '80%',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
  overlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gridBox: {
    width: '33.33%',
    height: '33.33%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 5,
    borderRadius: 5,
  },
  logo: {
    width: 50,
    height: 50,
  },
});

export default Reels;
