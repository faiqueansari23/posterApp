// import React, { useEffect, useState, useRef } from 'react';
// import {
//   View,
//   Text,
//   Image,
//   ActivityIndicator,
//   StyleSheet,
//   FlatList,
//   TouchableOpacity,
// } from 'react-native';
// import Video from 'react-native-video';
// import ViewShot from 'react-native-view-shot';
// import Share from 'react-native-share';
// import RNFetchBlob from 'rn-fetch-blob';

// const PosterApp = () => {
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const videoRefs = useRef({});
//   const viewShotRefs = useRef({});
//   const [playingIndex, setPlayingIndex] = useState(null);

//   useEffect(() => {
//     fetch('https://ashhari.com/bbn/public/api/show_post')
//       .then(response => response.json())
//       .then(data => {
//         if (data?.categories && Array.isArray(data.categories)) {
//           setPosts(data.categories);
//         } else {
//           setPosts([]);
//         }
//         setLoading(false);
//       })
//       .catch(error => {
//         console.error('Error fetching posts:', error);
//         setLoading(false);
//       });
//   }, []);

//   if (loading) {
//     return <ActivityIndicator size="large" color="#007bff" />;
//   }

//   if (posts.length === 0) {
//     return <Text style={styles.noPosts}>No posts found.</Text>;
//   }

//   const getPositionStyle = (position) => {
//     switch (position) {
//       case '1': return { top: 10, left: 10 };
//       case '2': return { top: 10, right: 10 };
//       case '3': return { top: '50%', left: 10 };
//       case '4': return { top: '50%', right: 10 };
//       case '5': return { bottom: 10, left: 10 };
//       case '6': return { bottom: 10, right: 10 };
//       case '7': return { top: '30%', left: '40%' };
//       case '8': return { top: '70%', left: '40%' };
//       case '9': return { top: '10%', left: '40%' };
//       default: return {};
//     }
//   };

//   // ✅ Capture & Share Image
//   const captureAndShare = (index) => {
//     if (viewShotRefs.current[index]) {
//       viewShotRefs.current[index].capture().then(uri => {
//         const fileUri = `file://${uri}`;
//         shareFile(fileUri);
//       });
//     }
//   };

//   // ✅ Download & Share Video
//   const downloadAndShareVideo = async (videoUrl) => {
//     try {
//       const { config, fs } = RNFetchBlob;
//       let fileName = videoUrl.split('/').pop();
//       let path = `${fs.dirs.CacheDir}/${fileName}`;

//       const res = await config({ fileCache: true, path }).fetch('GET', videoUrl);
//       shareFile(`file://${res.path()}`);
//     } catch (error) {
//       console.error('Download Error:', error);
//     }
//   };

//   // ✅ Share Function
//   const shareFile = async (fileUri) => {
//     try {
//       await Share.open({
//         url: fileUri,
//         message: 'Check out this post!',
//       });
//     } catch (error) {
//       console.error('Share Error:', error);
//     }
//   };

//   return (
//     <FlatList
//       data={posts}
//       keyExtractor={(item) => item.id.toString()}
//       renderItem={({ item, index }) => (
//         <View style={styles.card}>
//           <ViewShot ref={ref => (viewShotRefs.current[index] = ref)} options={{ format: 'jpg', quality: 1 }}>
//             {item.type === 'Image' && item.image ? (
//               <View>
//                 <Image source={{ uri: item.image }} style={styles.media} />
//                 {item.logo_position && <Text style={[styles.overlayText, getPositionStyle(item.logo_position)]}>LOGO</Text>}
//                 {item.business_name_position && <Text style={[styles.overlayText, getPositionStyle(item.business_name_position)]}>Business Name</Text>}
//                 {item.tagline_position && <Text style={[styles.overlayText, getPositionStyle(item.tagline_position)]}>Tagline</Text>}
//                 {item.phone_position && <Text style={[styles.overlayText, getPositionStyle(item.phone_position)]}>Phone</Text>}
//                 {item.social_media_position && <Text style={[styles.overlayText, getPositionStyle(item.social_media_position)]}>Social Media</Text>}
//               </View>
//             ) : null}
//           </ViewShot>

//           {item.type === 'Video' && item.path_url ? (
//             <View>
//               <Video
//                 ref={(ref) => (videoRefs.current[index] = ref)}
//                 source={{ uri: item.path_url }}
//                 style={styles.media}
//                 resizeMode="cover"
//                 repeat
//                 controls={false}
//                 paused={playingIndex !== index}
//                 onError={(error) => console.log('Video Error:', error)}
//               />
//               {item.logo_position && <Text style={[styles.overlayText, getPositionStyle(item.logo_position)]}>LOGO</Text>}
//               {item.business_name_position && <Text style={[styles.overlayText, getPositionStyle(item.business_name_position)]}>Business Name</Text>}
//               {item.tagline_position && <Text style={[styles.overlayText, getPositionStyle(item.tagline_position)]}>Tagline</Text>}
//               {item.phone_position && <Text style={[styles.overlayText, getPositionStyle(item.phone_position)]}>Phone</Text>}
//               {item.social_media_position && <Text style={[styles.overlayText, getPositionStyle(item.social_media_position)]}>Social Media</Text>}
//             </View>
//           ) : null}

//           {/* ✅ Buttons for Share */}
//           <View style={styles.buttonContainer}>
//             {item.type === 'Image' ? (
//               <TouchableOpacity style={styles.button} onPress={() => captureAndShare(index)}>
//                 <Text style={styles.buttonText}>Share Image</Text>
//               </TouchableOpacity>
//             ) : item.type === 'Video' ? (
//               <TouchableOpacity style={[styles.button, styles.shareButton]} onPress={() => downloadAndShareVideo(item.path_url)}>
//                 <Text style={styles.buttonText}>Share Video</Text>
//               </TouchableOpacity>
//             ) : null}
//           </View>
//         </View>
//       )}
//     />
//   );
// };

// const styles = StyleSheet.create({
//   card: {
//     backgroundColor: '#fff',
//     borderRadius: 8,
//     padding: 16,
//     marginBottom: 10,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 5,
//   },
//   media: {
//     width: '100%',
//     height: 300,
//     borderRadius: 8,
//   },
//   overlayText: {
//     position: 'absolute',
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//     color: '#fff',
//     padding: 5,
//     borderRadius: 4,
//     fontSize: 12,
//     fontWeight: 'bold',
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginTop: 10,
//   },
//   button: {
//     backgroundColor: '#007bff',
//     padding: 10,
//     borderRadius: 8,
//     alignItems: 'center',
//     flex: 1,
//     margin: 5,
//   },
//   shareButton: {
//     backgroundColor: '#28a745',
//   },
//   buttonText: {
//     color: '#fff',
//     fontWeight: 'bold',
//   },
// });

// export default PosterApp;


import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  Image,
  ActivityIndicator,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import Video from 'react-native-video';
import ViewShot from 'react-native-view-shot';
import Share from 'react-native-share';
import RNFetchBlob from 'rn-fetch-blob';

const PosterApp = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const viewShotRefs = useRef({});

  useEffect(() => {
    fetch('https://qaswatechnologies.com/april_bb/admin/public/api/show_post')
      .then(response => response.json())
      .then(data => {
        if (data?.categories && Array.isArray(data.categories)) {
          setPosts(data.categories);
        } else {
          setPosts([]);
        }
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching posts:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#007bff" />;
  }

  if (posts.length === 0) {
    return <Text style={styles.noPosts}>No posts found.</Text>;
  }

  const getPositionStyle = (position) => {
    switch (position) {
      case '1': return { top: 10, left: 10 };
      case '2': return { top: 10, right: 10 };
      case '3': return { top: '50%', left: 10 };
      case '4': return { top: '50%', right: 10 };
      case '5': return { bottom: 10, left: 10 };
      case '6': return { bottom: 10, right: 10 };
      case '7': return { top: '30%', left: '40%' };
      case '8': return { top: '70%', left: '40%' };
      case '9': return { top: '10%', left: '40%' };
      default: return {};
    }
  };

  // ✅ Capture & Share Image
  const captureAndShare = (index) => {
    if (viewShotRefs.current[index]) {
      viewShotRefs.current[index].capture().then(uri => {
        shareFile([`file://${uri}`]);
      });
    }
  };

  // ✅ Download Video & Generate Thumbnail
  const downloadVideoAndShare = async (videoUrl, index) => {
    try {
      const { config, fs } = RNFetchBlob;
      let fileName = videoUrl.split('/').pop();
      let videoPath = `${fs.dirs.CacheDir}/${fileName}`;

      // ✅ Step 1: Download Video
      const res = await config({ fileCache: true, path: videoPath }).fetch('GET', videoUrl);

      // ✅ Step 2: Take Screenshot for Thumbnail
      if (viewShotRefs.current[index]) {
        setTimeout(() => {
          viewShotRefs.current[index].capture().then(uri => {
            const overlayPath = `file://${uri}`;

            // ✅ Step 3: Share Video + Overlay Image Together
            shareFile([`file://${res.path()}`, overlayPath]);
          });
        }, 500); // 500ms delay to ensure rendering
      }
    } catch (error) {
      console.error('Download Error:', error);
    }
  };

  // ✅ Share Function
  const shareFile = async (files) => {
    try {
      await Share.open({
        urls: files,  // ✅ Multiple files send
        // message: 'Check out this post!',
      });
    } catch (error) {
      console.error('Share Error:', error);
    }
  };

  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item, index }) => (
        <View style={styles.card}>
          <ViewShot ref={ref => (viewShotRefs.current[index] = ref)} options={{ format: 'jpg', quality: 1 }}>
            <View>
              {item.type === 'Image' && item.image ? (
                <Image source={{ uri: item.image }} style={styles.media} />
              ) : item.type === 'Video' && item.path_url ? (
                <Video
                  source={{ uri: item.path_url }}
                  style={styles.media}
                  resizeMode="cover"
                  repeat
                  controls={false}
                 
                />
              ) : null}

              {/* ✅ Overlay Details */}
              {item.logo_position && <Text style={[styles.overlayText, getPositionStyle(item.logo_position)]}>LOGO</Text>}
              {item.business_name_position && <Text style={[styles.overlayText, getPositionStyle(item.business_name_position)]}>Business Name</Text>}
              {item.tagline_position && <Text style={[styles.overlayText, getPositionStyle(item.tagline_position)]}>Tagline</Text>}
              {item.phone_position && <Text style={[styles.overlayText, getPositionStyle(item.phone_position)]}>Phone</Text>}
              {item.social_media_position && <Text style={[styles.overlayText, getPositionStyle(item.social_media_position)]}>Social Media</Text>}
            </View>
          </ViewShot>

          {/* ✅ Buttons for Share */}
          <View style={styles.buttonContainer}>
            {item.type === 'Image' ? (
              <TouchableOpacity style={styles.button} onPress={() => captureAndShare(index)}>
                <Text style={styles.buttonText}>Share Image</Text>
              </TouchableOpacity>
            ) : item.type === 'Video' ? (
              <TouchableOpacity style={[styles.button, styles.shareButton]} onPress={() => downloadVideoAndShare(item.path_url, index)}>
                <Text style={styles.buttonText}>Share Video</Text>
              </TouchableOpacity>
            ) : null}
          </View>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  media: {
    width: '100%',
    height: 300,
    borderRadius: 8,
  },
  overlayText: {
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    color: '#fff',
    padding: 5,
    borderRadius: 4,
    fontSize: 12,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    flex: 1,
    margin: 5,
  },
  shareButton: {
    backgroundColor: '#28a745',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default PosterApp;
