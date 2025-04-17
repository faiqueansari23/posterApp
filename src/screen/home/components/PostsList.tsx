// import React, { useEffect, useRef, useState } from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, FlatList, Dimensions, Image, ViewToken } from 'react-native';
// import Entypo from 'react-native-vector-icons/Entypo';
// import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
// import Video from 'react-native-video';
// import { useAppDispatch, useAppSelector } from '../../../store/hooks';
// import { fetchPosts } from '../../../store/slices/postSlice';
// import { COLORS } from '../../../themes/palette';
// import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// import { RootStackParamsList } from '../../../navigation/AppNavigator';

// const { height: windowHeight, width: screenWidth } = Dimensions.get('window');

// interface IPostsListProp {
//     navigation: NativeStackNavigationProp<RootStackParamsList>;
//     profileLogo: any;
//     profileBusiness: any;
//     profileTag: any;
//     profilePhone: any;
//     profileSocial: any;
// }

// // Instagram Post Card
// const InstagramCard = ({ imageUrl, postDescription }) => (
//     <View style={styles.card}>
//         <Image source={imageUrl} style={styles.postImage} />
//         <Text style={styles.postDescription}>{postDescription}</Text>

//         <View style={styles.actions}>
//             {/* Share Button */}
//             <TouchableOpacity style={styles.button}>
//                 <Text style={styles.buttonText}>Share</Text>
//                 <Ionicons name="share-social-outline" size={18} color="#FFF" style={styles.iconRight} />
//             </TouchableOpacity>

//             {/* Download Button */}
//             <TouchableOpacity style={styles.button}>
//                 <Ionicons name="download-outline" size={18} color="#FFF" style={styles.iconLeft} />
//                 <Text style={styles.buttonText}>Download</Text>
//             </TouchableOpacity>
//         </View>

//     </View>
// );

// const PostsList = ({ navigation, profileBusiness, profileLogo, profileTag, profileSocial, profilePhone }: IPostsListProp) => {
//     const dispatch = useAppDispatch();
//     const { posts, loading, error } = useAppSelector((state) => state.posts);

//     // const businessNamePosition = parseInt(posts., 10) - 1; // Convert to zero-based index
//     // const logoPosition = parseInt(posts?.logo_position, 10) - 1; // Convert to zero-based index
//     // const phonePosition = parseInt(posts?.phone_position, 10) - 1; // Convert to zero-based index
//     // const tagPosition = parseInt(posts?.tagline_position, 10) - 1; // Convert to zero-based index
//     // const socialPosition = parseInt(posts?.social_media_position, 10) - 1; // Convert to zero-based index
//     const [visibleIndex, setVisibleIndex] = useState<number | null>(null);

//     const viewabilityConfig = {
//         itemVisiblePercentThreshold: 50, // Trigger when 50% of the item is visible
//     };

//     const onViewableItemsChanged = useRef(({ viewableItems }: { viewableItems: ViewToken[] }) => {
//         if (viewableItems.length > 0) {
//             setVisibleIndex(viewableItems[0].index); // Track the visible item's index
//         }
//     }).current;

//     useEffect(() => {
//         dispatch(fetchPosts());
//     }, [dispatch]);

//     return (
//         <View style={styles.container}>
//             {loading && <View style={styles.loadingContainer}><ActivityIndicator /></View>}
//             {error && <Text style={styles.errorText}>{error}</Text>}
//             {!loading && !error && (
//                 <View>
//                     {posts.length > 0 ? (
//                         <FlatList
//                             data={posts}
//                             renderItem={({ item, index }) => {
//                                 const businessNamePosition = parseInt(item.business_name_position, 10) - 1; // Convert to zero-based index
//                                 const logoPosition = parseInt(item.logo_position, 10) - 1; // Convert to zero-based index
//                                 const phonePosition = parseInt(item.phone_position, 10) - 1; // Convert to zero-based index
//                                 const tagPosition = parseInt(item.tagline_position, 10) - 1; // Convert to zero-based index
//                                 const socialPosition = parseInt(item.social_media_position, 10) - 1; // Convert to zero-based index
//                                 return (
//                                     <View
//                                         style={styles.listView}
//                                     >
//                                         {item.type === 'Video' && item.path_url ? (
//                                             <View style={styles.postCard}>
//                                                 <View style={[styles.mediaContainer]}>
//                                                     <Video
//                                                         source={{ uri: item.path_url }}
//                                                         style={styles.video}
//                                                         paused={visibleIndex !== index} // Play only if this item is visible
//                                                         resizeMode="cover"
//                                                         repeat // Repeat the video
//                                                     />
//                                                     <View style={[styles.overlay]}>
//                                                         {Array.from({ length: 9 }).map((_, index) => (
//                                                             <View key={index} style={styles.gridBox}>
//                                                                 {index === businessNamePosition && (
//                                                                     <Text style={styles.businessName}>{profileBusiness}</Text>
//                                                                 )}
//                                                                 {index === logoPosition && (
//                                                                     profileLogo ? <Image
//                                                                         source={{ uri: profileLogo }}
//                                                                         style={styles.logo}
//                                                                         resizeMode="contain"
//                                                                     /> : null
//                                                                 )}
//                                                                 {index === socialPosition && (
//                                                                     <Text style={styles.businessName}>{profileSocial}</Text>
//                                                                 )}
//                                                                 {index === phonePosition && (
//                                                                     <Text style={styles.businessName}>{profilePhone}</Text>
//                                                                 )}
//                                                                 {index === tagPosition && (
//                                                                     <Text style={styles.businessName}>{profileTag}</Text>
//                                                                 )}
//                                                             </View>
//                                                         ))}
//                                                     </View>
//                                                 </View>
//                                                 <View style={styles.buttonBlock}>
//                                                     <TouchableOpacity onPress={() => { navigation.navigate('DownloadShare', { post: item }); }} style={styles.btnStyles}>
//                                                         <Text style={{ color: COLORS.WHITE, marginLeft: scale(5), fontSize: moderateScale(14) }}>Share</Text>
//                                                         <Entypo name="share" size={18} color={COLORS.WHITE} />
//                                                     </TouchableOpacity>

//                                                     <TouchableOpacity onPress={() => { navigation.navigate('DownloadShare', { post: item }); }} style={styles.btnStyles}>
//                                                         <Entypo name="download" size={18} color={COLORS.WHITE} />

//                                                         <Text style={{ color: COLORS.WHITE, marginLeft: scale(5), fontSize: moderateScale(14) }}>download</Text>
//                                                     </TouchableOpacity>
//                                                 </View>
//                                             </View>
//                                         ) : item.type === 'Image' && item.image && item.image.includes('https://') ? (
//                                             <View style={styles.postCard}>
//                                                 <View style={[styles.mediaContainer]}>
//                                                     <Image
//                                                         source={{ uri: item.image }}
//                                                         style={[StyleSheet.absoluteFillObject]}
//                                                         resizeMode="cover"
//                                                     />
//                                                     <View style={[styles.overlay]}>
//                                                         {Array.from({ length: 9 }).map((_, index) => (
//                                                             <View key={index} style={styles.gridBox}>
//                                                                 {index === businessNamePosition && (
//                                                                     <Text style={styles.businessName}>{profileBusiness}</Text>
//                                                                 )}
//                                                                 {index === logoPosition && (
//                                                                     profileLogo ? <Image
//                                                                         source={{ uri: profileLogo }}
//                                                                         style={styles.logo}
//                                                                         resizeMode="contain"
//                                                                     /> : null
//                                                                 )}
//                                                                 {index === socialPosition && (
//                                                                     <Text style={styles.businessName}>{profileSocial}</Text>
//                                                                 )}
//                                                                 {index === phonePosition && (
//                                                                     <Text style={styles.businessName}>{profilePhone}</Text>
//                                                                 )}
//                                                                 {index === tagPosition && (
//                                                                     <Text style={styles.businessName}>{profileTag}</Text>
//                                                                 )}
//                                                             </View>
//                                                         ))}
//                                                     </View>
//                                                 </View>
//                                                 <View style={styles.buttonBlock}>
//                                                     <TouchableOpacity onPress={() => { navigation.navigate('DownloadShare', { post: item }); }} style={styles.btnStyles}>
//                                                         <Text style={{ color: COLORS.WHITE, marginLeft: scale(5), fontSize: moderateScale(14) }}>Share</Text>
//                                                         <Entypo name="share" size={18} color={COLORS.WHITE} />
//                                                     </TouchableOpacity>

//                                                     <TouchableOpacity onPress={() => { navigation.navigate('DownloadShare', { post: item }); }} style={styles.btnStyles}>
//                                                         <Entypo name="download" size={18} color={COLORS.WHITE} />
//                                                         <Text style={{ color: COLORS.WHITE, marginLeft: scale(5), fontSize: moderateScale(14) }}>download</Text>
//                                                     </TouchableOpacity>
//                                                 </View>
//                                             </View>
//                                         ) : (
//                                             <View style={styles.mediaContainer}>
//                                                 <Text style={styles.errorText}>No media available</Text>
//                                             </View>
//                                         )}
//                                     </View>
//                                 );
//                             }}
//                             keyExtractor={(item) => item.id.toString()}
//                             nestedScrollEnabled
//                             pagingEnabled
//                             onViewableItemsChanged={onViewableItemsChanged}
//                             viewabilityConfig={viewabilityConfig}
//                         />
//                     ) : (
//                         <Text style={styles.title}>No posts available</Text>
//                     )}
//                 </View>
//             )}
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//     },
//     loadingContainer: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     title: {
//         textAlign: 'center',
//         fontSize: 16,
//         color: '#777',
//     },
//     listView: {
//         height: windowHeight * 0.77,
//         backgroundColor: '#AQUA',
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     mediaContainer: {
//         backgroundColor: '#f0f0f0',
//         alignItems: 'center',
//         // overflow: 'hidden',
//         width: screenWidth - 30,
//         height: screenWidth - 10,
//         position: 'relative',
//     },
//     overlay: {
//         flexDirection: 'row',
//         flexWrap: 'wrap',
//         justifyContent: 'center',
//         alignItems: 'center',
//         ...StyleSheet.absoluteFillObject, // Layer this view on top of the image
//         backgroundColor: 'transparent',
//     },
//     gridBox: {
//         width: '33.33%',
//         height: '33.33%',
//         // borderWidth: 1,
//         // borderColor: 'black',
//         justifyContent: 'center', alignItems: 'center',
//     },
//     video: {
//         width: screenWidth - 20,
//         height: screenWidth - 20,
//     },
//     image: {
//         width: screenWidth - 20,
//         height: screenWidth - 20,
//     },
//     errorText: {
//         textAlign: 'center',
//         padding: 20,
//         color: 'red',
//     },
//     postCard: {
//         width: screenWidth - 20,
//         height: windowHeight * 0.60,
//         backgroundColor: COLORS.WHITE,
//         borderRadius: moderateScale(8),
//         alignItems: 'center',
//         padding: moderateScale(10),
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 1 },
//         shadowOpacity: 0.2,
//         shadowRadius: 1.41,
//         elevation: 2,
//         marginHorizontal: scale(16),
//     },
//     buttonBlock: { width: '100%', flexDirection: 'row', alignItems: 'center', marginTop: verticalScale(8) },
//     btnStyles: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#E1306C', borderRadius: moderateScale(25), paddingVertical: verticalScale(5), paddingHorizontal: scale(15), marginRight: moderateScale(5) },
//     businessName: {
//         fontSize: 16,
//         fontWeight: 'bold',
//         color: 'black',
//     },
//     logo: {
//         width: 50,
//         height: 50,
//     },
//     ///////////////////////////////////////////////////////////
//     card: {
//         backgroundColor: 'white',
//         borderRadius: 10,
//         margin: 10,
//         shadowColor: '#000',
//         shadowOpacity: 0.1,
//         shadowRadius: 5,
//         shadowOffset: { width: 0, height: 5 },
//     },
//     postImage: {
//         width: '100%',
//         height: 300,
//         borderBottomWidth: 1,
//         borderBottomColor: '#f1f1f1',
//     },
//     postDescription: {
//         padding: 10,
//         fontSize: 14,
//     },
//     actions: {
//         flexDirection: 'row',
//         justifyContent: 'flex-start',
//         gap: 10,
//         paddingVertical: 5,
//         paddingLeft: 10,
//     },
//     button: {
//         backgroundColor: '#E1306C',
//         paddingHorizontal: 15,
//         paddingVertical: 6,
//         borderRadius: 25,
//         flexDirection: 'row',
//         alignItems: 'center',
//         elevation: 5,
//     },
//     buttonText: {
//         fontSize: 14,
//         fontWeight: 'bold',
//         color: '#FFFFFF',
//     },
//     iconRight: {
//         marginLeft: 5,  // Icon right me shift hoga
//     },
//     iconLeft: {
//         marginRight: 5, // Icon left me shift hoga
//     },
// });

// export default PostsList;





import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  Dimensions,
  Image,
  ViewToken,
  Platform,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {useAppDispatch, useAppSelector} from '../../../store/hooks';
import {fetchPosts} from '../../../store/slices/postSlice';
import {COLORS} from '../../../themes/palette';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamsList} from '../../../navigation/AppNavigator';

import ViewShot from 'react-native-view-shot';
import Share from 'react-native-share';
import RNFS from 'react-native-fs';

const {height: windowHeight, width: screenWidth} = Dimensions.get('window');

interface IPostsListProp {
  navigation: NativeStackNavigationProp<RootStackParamsList>;
  profileLogo: any;
  profileBusiness: any;
  profileTag: any;
  profilePhone: any;
  profileSocial: any;
}

const PostsList = ({
  navigation,
  profileBusiness,
  profileLogo,
  profileTag,
  profileSocial,
  profilePhone,
}: IPostsListProp) => {
  const dispatch = useAppDispatch();
  const {posts, loading, error} = useAppSelector(state => state.posts);
  const [visibleIndex, setVisibleIndex] = useState<number | null>(null);
  const viewRefs = useRef<ViewShot[]>([]);

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50,
  };

  const onViewableItemsChanged = useRef(
    ({viewableItems}: {viewableItems: ViewToken[]}) => {
      if (viewableItems.length > 0) {
        setVisibleIndex(viewableItems[0].index);
      }
    },
  ).current;

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const shareImage = async (index: number) => {
    try {
      const uri = await viewRefs.current[index].capture?.();
      const shareOptions = {
        url: Platform.OS === 'android' ? 'file://' + uri : uri,
        type: 'image/jpeg',
      };
      await Share.open(shareOptions);
    } catch (err) {
      console.log('Share error:', err);
    }
  };

  return (
    <View style={styles.container}>
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator />
        </View>
      )}
      {error && <Text style={styles.errorText}>{error}</Text>}
      {!loading && !error && (
        <View>
          {posts.length > 0 ? (
            <FlatList
              data={posts}
              renderItem={({item, index}) => {
                if (item.type === 'Image' && item.image?.includes('https://')) {
                  const businessNamePosition = parseInt(item.business_name_position, 10) - 1;
                  const logoPosition = parseInt(item.logo_position, 10) - 1;
                  const phonePosition = parseInt(item.phone_position, 10) - 1;
                  const tagPosition = parseInt(item.tagline_position, 10) - 1;
                  const socialPosition = parseInt(item.social_media_position, 10) - 1;

                  const textColor = item.text_color || 'black';
                  const textSize = item.text_size?.toString() || '2';

                  const fontSizeMap: {[key: string]: number} = {
                    '1': 12,
                    '2': 15,
                    '3': 16,
                    '4': 20,
                  };

                  const logoSizeMap: {[key: string]: number} = {
                    '1': 50,
                    '2': 60,
                    '3': 70,
                    '4': 80,
                  };
                  const logoSize = logoSizeMap[item.logo_size?.toString()] || 40;

                  const textStyle = {
                    fontSize: fontSizeMap[textSize] || 20,
                    color: textColor,
                    fontFamily: item.font_family && item.font_family !== 'null' ? item.font_family : undefined,
                    marginLeft: 10,
                  };

                  const renderContent = (position: number) => (
                    <>
                      {logoPosition === position && profileLogo && (
                        <Image
                          source={{uri: profileLogo}}
                          style={{
                            width: logoSize,
                            height: logoSize,
                          }}
                          resizeMode="contain"
                        />
                      )}
                      {businessNamePosition === position && (
                        <Text style={textStyle}>{profileBusiness}</Text>
                      )}
                      {tagPosition === position && (
                        <Text style={textStyle}>{profileTag}</Text>
                      )}
                      {phonePosition === position && (
                        <Text style={textStyle}>{profilePhone}</Text>
                      )}
                      {socialPosition === position && (
                        <Text style={textStyle}>{profileSocial}</Text>
                      )}
                    </>
                  );

                  return (
                    <View style={styles.listView}>
                      <View style={styles.postCard}>
                        <ViewShot
                          ref={(ref: ViewShot) => {
                            viewRefs.current[index] = ref;
                          }}
                          options={{format: 'jpg', quality: 0.9}}>
                          <View style={styles.mediaContainer}>
                            <Image
                              source={{uri: item.image}}
                              style={StyleSheet.absoluteFillObject}
                              resizeMode="cover"
                            />
                            <View style={styles.overlay}>
                              <View style={styles.topOverlay}>{renderContent(0)}</View>
                              <View style={styles.bottomOverlay}>{renderContent(1)}</View>
                            </View>
                          </View>
                        </ViewShot>

                        <View style={styles.buttonBlock}>
                          <TouchableOpacity onPress={() => shareImage(index)} style={styles.btnStyles}>
                            <Text style={styles.btnText}>Share</Text>
                            <Entypo name="share" size={18} color={COLORS.WHITE} />
                          </TouchableOpacity>

                          <TouchableOpacity
                            onPress={() => navigation.navigate('DownloadShare', {post: item})}
                            style={styles.btnStyles}>
                            <Entypo name="download" size={18} color={COLORS.WHITE} />
                            <Text style={styles.btnText}>Download</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  );
                }
                return null;
              }}
              keyExtractor={item => item.id.toString()}
              nestedScrollEnabled
              onViewableItemsChanged={onViewableItemsChanged}
              viewabilityConfig={viewabilityConfig}
            />
          ) : (
            <Text style={styles.title}>No posts available</Text>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    textAlign: 'center',
    padding: 20,
    color: 'red',
  },
  title: {
    textAlign: 'center',
    fontSize: 16,
    color: '#777',
  },
  listView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  postCard: {
    flex: 1,
    width: screenWidth - 20,
    backgroundColor: COLORS.WHITE,
    borderRadius: moderateScale(8),
    padding: moderateScale(10),
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    marginHorizontal: scale(16),
    justifyContent: 'space-between',
  },
  mediaContainer: {
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    width: screenWidth - 40,
    height: screenWidth - 10,
    position: 'relative',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'transparent',
  },
  topOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexWrap: 'wrap',
    flexDirection: 'column',
    maxHeight: 25,
    padding: 0,
    margin: 0,
  },
  bottomOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    maxHeight: 70,
    width: 330,
  },
  buttonBlock: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  btnStyles: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E1306C',
    borderRadius: moderateScale(25),
    paddingVertical: verticalScale(5),
    paddingHorizontal: scale(15),
    marginRight: moderateScale(5),
  },
  btnText: { 
    color: COLORS.WHITE,
    marginLeft: scale(5),
    fontSize: moderateScale(14),
  },
});

export default PostsList;
