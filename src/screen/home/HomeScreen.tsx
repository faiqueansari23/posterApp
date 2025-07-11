import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, StatusBar, Text, TouchableOpacity, Image, Dimensions, Modal, ScrollView, Alert, ImageBackground, Platform, SafeAreaView } from 'react-native';
import { RootStackParamsList } from '../../navigation/AppNavigator';
import { COLORS } from '../../themes/palette';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import axios from 'axios';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CategoriesList from './components/CategoriesList';
import PostsList from './components/PostsList';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectCategory, setCategories } from '../../store/slices/categoriesSlice';
import { fetchPosts, fetchPostsByCategory } from '../../store/slices/postSlice';

const { height: windowHeight, width: screenWidth } = Dimensions.get('window');


interface HomeScreenProps {
    navigation: NativeStackNavigationProp<RootStackParamsList>
}

export default function HomeScreen({ navigation }: HomeScreenProps) {
    const [modalVisible, setModalVisible] = useState(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [profileLogo, setProfileLogo] = useState<string>('');
    const [profileBusiness, setBusiness] = useState<string>('');
    const [profileTag, setprofileTag] = useState<string>('');
    const [profilePhone, setprofilePhone] = useState<string>('');
    const [profileSocial, setprofileSocial] = useState<string>('');
    const dispatch = useAppDispatch();
    const { categories, selectedCategory } = useAppSelector((state) => state.categories);

    const fetchProfileData = async () => {
        try {
            const userDataString = await AsyncStorage.getItem('userData');
            if (!userDataString) { throw new Error('No user data found.'); }
            const { id } = JSON.parse(userDataString);
            const { data: response } = await axios.get(
                `https://www.brandboostindia.com/api/getProfile/${id}`
            );
            console.log('get profile response=>', response.data);
            if (response.status === 'True') {
                const profile = response.data;
                setProfileLogo(profile.profile_logo);
                setBusiness(profile.bussiness_name);
                setprofileTag(profile.tagline);
                setprofilePhone(profile.whatsappno);
                setprofileSocial(profile.instagram_facebook);

            } else {
                Alert.alert('Error', response.message || 'Failed to load profile data.');
            }
        } catch (error) {
            Alert.alert('Error', 'Unable to fetch profile data. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProfileData();
    }, []);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const categoryResponse = await axios.get('https://www.brandboostindia.com/api/categories');
                const fetchedCategories = categoryResponse.data.data || [];
                dispatch(setCategories(fetchedCategories));
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, [dispatch]);

    const handleFetchPostsByCategory = (categoryId?: number) => {
        setModalVisible(!modalVisible);
        if (categoryId) {
            dispatch(fetchPostsByCategory(categoryId));
        } else {
            dispatch(fetchPosts());
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.containerHeader}>
                <Text style={styles.containerHeaderText}>BrandBoast</Text>
            </View>
            {/* </ImageBackground> */}
            <View style={{ flex: 1 }}>
                <CategoriesList setModalVisible={setModalVisible} />
                <PostsList
                    navigation={navigation}
                    profileLogo={profileLogo}
                    profileBusiness={profileBusiness}
                    profileTag={profileTag}
                    profilePhone={profilePhone}
                    profileSocial={profileSocial}
                />
            </View>
            <Modal
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
                animationType="slide"
            >
                <View style={styles.modalContainer}>
                    <View style={styles.bottomSheet}>
                        <View style={styles.modalHeader}>
                            <TouchableOpacity
                                style={styles.dashedLine}
                                onPress={() => setModalVisible(false)}
                            />
                            <Text style={styles.modalTitle}>More Categories</Text>
                        </View>
                        <ScrollView contentContainerStyle={styles.categoryContainer}>
                            {categories.map((categoryItem: any, index: any) => (
                                <TouchableOpacity
                                    onPress={() => dispatch(selectCategory(categoryItem), handleFetchPostsByCategory(categoryItem.id))}
                                    key={index} style={styles.card}>
                                    <Text style={styles.categoryName}>{categoryItem.category}</Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>
                </View>
            </Modal>
        </SafeAreaView >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#f8f8f8',
        backgroundColor: COLORS.OFFWHITE,
    },
    containerHeader: {
        height: 50,
        width: '100%',
        justifyContent: 'center',
        marginLeft: 10,
        // marginTop: 10,
        marginBottom:5
    }
    ,
    containerHeaderText: {
        color: '#000',
        fontSize: 25,
        fontFamily: 'Billabong',
    },
    block: {
        marginTop: verticalScale(100),
        justifyContent: 'center',
        alignItems: 'center',
    },
    heading: {
        color: COLORS.DARK,
        marginTop: verticalScale(30),
        lineHeight: verticalScale(29),
    },
    subHeading: {
        color: COLORS.DARK,
        textAlign: 'center',
        lineHeight: verticalScale(20),
        marginTop: verticalScale(20),
    },
    categoryContainer: { width: '100%', flexDirection: 'row', flexWrap: 'wrap', padding: 10 },
    // card: {
    //     backgroundColor: COLORS.WHITE,
    //     borderWidth: 1,
    //     paddingHorizontal: scale(12),
    //     paddingVertical: scale(1),
    //     borderRadius: moderateScale(20),
    //     marginVertical: verticalScale(5),
    //     marginRight: scale(8),
    // },
    // categoryName: {
    //     fontSize: moderateScale(11),
    //     fontWeight: '500',
    //     color: COLORS.DARK,
    // },
    card: {
        backgroundColor: '#f5f5f5',
        paddingHorizontal: 10,
        paddingVertical: 5,
        margin: 5,
        borderRadius: 30,
        borderWidth: 1,
        minWidth: '20%',
        alignItems: 'center',
    },
    categoryName: {
        fontSize: 12,
        fontWeight: '600',
        color: COLORS.DARK,
    },
    moreButton: {
        backgroundColor: '#ddd',
    },
    postCard: {
        width: screenWidth - 20,
        height: screenWidth,
        backgroundColor: COLORS.WHITE,
        borderRadius: moderateScale(8),
        alignItems: 'center',
        padding: moderateScale(10),
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
        marginHorizontal: scale(16),
    },
    postImage: {
        width: '100%',
        height: verticalScale(150),
        borderRadius: moderateScale(8),
        resizeMode: 'cover',
    },
    videoText: {
        color: COLORS.DARK,
        textDecorationLine: 'underline',
    },
    postType: {
        fontSize: moderateScale(14),
        fontWeight: 'bold',
        color: COLORS.DARK,
        marginTop: verticalScale(5),
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    bottomSheet: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        maxHeight: '80%',
    },
    modalHeader: {
        alignItems: 'center',
        marginBottom: 10,
        paddingBottom: 5,
        borderBottomWidth: 1,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.DARK,
    },
    dashedLine: {
        width: 50,
        height: 5,
        backgroundColor: '#ccc',
        borderRadius: 10,
        alignSelf: 'center',
        marginVertical: 10,
    },
    //////
    mediaContainer: {
        backgroundColor: '#f0f0f0',
        alignItems: 'center',
        // overflow: 'hidden',
        width: screenWidth - 30,
        height: screenWidth - 10,
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
        borderWidth: 1,
        borderColor: 'black',
    },
    video: {
        width: screenWidth - 20,
        height: screenWidth - 20,
    },
    image: {
        width: screenWidth - 20,
        height: screenWidth - 20,
    },
    errorText: {
        textAlign: 'center',
        padding: 20,
        color: 'red',
    },
});

