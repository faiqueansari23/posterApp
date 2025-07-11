import axios from 'axios';
import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
} from 'react-native';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {COLORS} from '../../../themes/palette';
import {useAppDispatch, useAppSelector} from '../../../store/hooks';
import {
  setCategories,
  selectCategory,
} from '../../../store/slices/categoriesSlice';
import {
  fetchPosts,
  fetchPostsByCategory,
} from '../../../store/slices/postSlice';

interface ICategoriesListProp {
  setModalVisible: (isVisible: boolean) => void;
}

const CategoriesList = ({setModalVisible}: ICategoriesListProp) => {
  const dispatch = useAppDispatch();
  const {categories, selectedCategory} = useAppSelector(
    state => state.categories,
  );
  const loading = categories.length === 1; // True if only the "All" category exists.

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoryResponse = await axios.get(
          'https://qaswatechnologies.com/april_bb/admin/public/api/categories',
        );
        // console.log('categoryResponse->', JSON.stringify(categoryResponse))
        const fetchedCategories = categoryResponse.data.data || [];
        dispatch(setCategories(fetchedCategories));
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, [dispatch]);

  const visibleCategories = categories.slice(0, 6);

  const handleFetchPostsByCategory = (categoryId?: number) => {
    if (categoryId) {
      dispatch(fetchPostsByCategory(categoryId));
    } else {
      dispatch(fetchPosts());
    }
  };

  // Story Component
  const Story = ({item}) => (
    <TouchableOpacity
      style={styles.storyContainer}
      onPress={() => {
        dispatch(selectCategory(item));
        handleFetchPostsByCategory(item.id);
      }}>
      <View
        style={[
          styles.storyBorder,
          selectedCategory?.id === item.id && {borderColor: '#E1306C'}, // highlight selected category
        ]}>
        <Image
          source={require('../../../assets/images/SalmanKhan.webp')}
          style={styles.storyImage}
        />
      </View>
      <Text
        style={[
          styles.storyUsername,
          selectedCategory?.id === item.id && {
            color: '#E1306C',
            fontWeight: 'bold',
          },
        ]}>
        {item.category}
      </Text>
    </TouchableOpacity>
  );

  const extendedCategories = [...categories];
  if (categories.length > 6) {
    extendedCategories.push({id: 'more', category: 'More'});
  }

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <View style={styles.multiRowContainer}>
          {/* First Row: First 5 Categories */}
          <View style={styles.row}>
            {categories.slice(0, 5).map(item => (
              <TouchableOpacity
                key={`row1-${item.id}`}
                style={styles.storyContainer}
                onPress={() => {
                  dispatch(selectCategory(item));
                  handleFetchPostsByCategory(item.id);
                }}>
                <View
                  style={[
                    styles.storyBorder,
                    selectedCategory?.id === item.id && {
                      borderColor: '#E1306C',
                    },
                  ]}>
                  <View
                    style={[
                      styles.storyBorder,
                      selectedCategory?.id === item.id && {
                        borderColor: '#E1306C',
                      },
                    ]}>
                    <Text style={styles.initialText}>
                      {item.category?.charAt(0).toUpperCase()}
                    </Text>
                  </View>
                </View>
                <Text
                  style={[
                    styles.storyUsername,
                    selectedCategory?.id === item.id && {
                      color: '#E1306C',
                      fontWeight: 'bold',
                    },
                  ]}>
                  {item.category}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Second Row: Next 4 Categories (6-9) + More */}
          <View style={styles.row}>
            {categories.slice(5, 9).map(item => (
              <TouchableOpacity
                key={`row2-${item.id}`}
                style={styles.storyContainer}
                onPress={() => {
                  dispatch(selectCategory(item));
                  handleFetchPostsByCategory(item.id);
                }}>
                <View
                  style={[
                    styles.storyBorder,
                    selectedCategory?.id === item.id && {
                      borderColor: '#E1306C',
                    },
                  ]}>
                  <View
                    style={[
                      styles.storyBorder,
                      selectedCategory?.id === item.id && {
                        borderColor: '#E1306C',
                      },
                    ]}>
                    <Text style={styles.initialText}>
                      {item.category?.charAt(0).toUpperCase()}
                    </Text>
                  </View>
                </View>
                <Text
                  style={[
                    styles.storyUsername,
                    selectedCategory?.id === item.id && {
                      color: '#E1306C',
                      fontWeight: 'bold',
                    },
                  ]}>
                  {item.category}
                </Text>
              </TouchableOpacity>
            ))}

            {/* More Button at the end of second row */}
            <TouchableOpacity
              key="more-button"
              style={styles.storyContainer}
              onPress={() => setModalVisible(true)}>
              <View style={[styles.storyBorder, {borderColor: '#aaa'}]}>
                <Text style={styles.initialText}>M</Text>
              </View>
              <Text style={styles.storyUsername}>More</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#fff',
    paddingHorizontal: scale(10),
    justifyContent: 'center',
    height: Dimensions.get('window').height * 0.20,
  
  },
  sectionHeader: {
    fontSize: moderateScale(18),
    fontWeight: 'bold',
    color: COLORS.DARK,
    marginVertical: verticalScale(10),
  },
  categoryContainer: {width: '100%', flexDirection: 'row', flexWrap: 'wrap'},
  card: {
    paddingHorizontal: scale(8),
    paddingVertical: verticalScale(3),
    margin: 5,
    borderRadius: moderateScale(30),
    // borderWidth: 1,
    minWidth: '20%',
    alignItems: 'center',
  },
  categoryName: {
    fontSize: moderateScale(12),
    fontWeight: '600',
  },
  moreButton: {
    backgroundColor: '#ddd',
  },

  containerStory: {
    height: 120,
    paddingTop: 5,
  },
  storiesList: {
    paddingHorizontal: 10,
  },
  storyContainer: {
    marginRight: 10,
    alignItems: 'center',
  },
  storyBorder: {
    width: 55,
    height: 55,
    borderRadius: 39,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'gray',
    overflow: 'hidden',
    // padding: 2,
  },
  storyImage: {
    width: '100%',
    height: '100%',
    borderRadius: 35,
    resizeMode: 'cover',
  },
  storyUsername: {
    marginTop: 5,
    fontSize: 10,
    textAlign: 'center',
    color: 'gray',
  },
  multiRowContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 0,
    
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  initialText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default CategoriesList;
