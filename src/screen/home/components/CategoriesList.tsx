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
          'https://ashhari.com/bbn/public/api/categories',
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
    extendedCategories.push({ id: 'more', category: 'More' });
}


  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <View>
          <View style={styles.containerStory}>
            <FlatList
              data={extendedCategories}
              renderItem={({item}) =>
                item.id === 'more' ? (
                  <TouchableOpacity
                    style={styles.storyContainer}
                    onPress={() => setModalVisible(true)}>
                    <View style={[styles.storyBorder, {borderColor: '#aaa'}]}>
                      <Image
                        source={require('../../../assets/images/SalmanKhan.webp')}
                        style={styles.storyImage}
                      />
                    </View>
                    <Text style={styles.storyUsername}>More</Text>
                  </TouchableOpacity>
                ) : (
                  <Story item={item} />
                )
              }
              keyExtractor={(item, index) => `${index}- ${item.id}`}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.storiesList}
            />
          </View>

          {/* <View style={styles.categoryContainer}>
                    {visibleCategories.map((categoryItem: any, index: any) => {
                        return (
                            <TouchableOpacity
                                onPress={() => dispatch(selectCategory(categoryItem), handleFetchPostsByCategory(categoryItem.id))}
                                key={index} style={[styles.card, { backgroundColor: selectedCategory?.id === categoryItem.id ? '#21cfe5' : COLORS.OFFWHITE }]}>
                                <Text style={[styles.categoryName, { color: selectedCategory?.id === categoryItem.id ? COLORS.WHITE : COLORS.DARK }]}>{categoryItem.category}</Text>
                            </TouchableOpacity>
                        );
                    })}
                    {categories.length > visibleCategories.length && <TouchableOpacity
                        style={[styles.card, styles.moreButton]}
                        onPress={() => setModalVisible(true)}
                    >
                        <Text style={styles.categoryName}>{'More'}</Text>
                    </TouchableOpacity>}
                </View> */}
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
    height: Dimensions.get('window').height * 0.12,
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
  ///////////////////////////////////
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
    width: 78, // Adjust size to account for padding
    height: 78, // Adjust size to account for padding
    borderRadius: 39, // Half of width/height for perfect circle
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'gray',
    overflow: 'hidden',
    padding: 4, // Add padding to create gap
  },
  storyImage: {
    width: '100%',
    height: '100%',
    borderRadius: 35, // Make inner image circular
    resizeMode: 'cover',
  },
  storyUsername: {
    marginTop: 5,
    fontSize: 12,
    textAlign: 'center',
    color: 'gray',
  },
});

export default CategoriesList;
