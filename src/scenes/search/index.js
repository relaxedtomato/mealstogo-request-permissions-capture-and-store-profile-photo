import React, { useState, useEffect } from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';

import { Colors } from '~/styles';
import useUserData from '~/hooks/useUserData';
import useSearchPlaces from '~/hooks/useSearchPlaces';
import SearchInput from './components/SearchInput';
import SearchResults from './components/SearchResults';
import { navigationPropTypes } from '~/types';

const INITIAL_SEARCH_INPUT = 'Type a cuisine or place name';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
    backgroundColor: Colors.white,
  },
});

const Search = ({ navigation }) => {
  const [searchText, onChangeText] = useState(INITIAL_SEARCH_INPUT);
  const [restaurants, onUpdateSearchResults] = useState([]);
  const { geoLocation } = useUserData(navigation);
  const restaurantData = useSearchPlaces(geoLocation);

  useEffect(() => {
    if (searchText === INITIAL_SEARCH_INPUT) {
      onUpdateSearchResults(restaurantData);
    }
  }, [restaurantData]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      onChangeText(INITIAL_SEARCH_INPUT);
      onUpdateSearchResults(restaurantData);
    });

    return unsubscribe;
  }, [navigation, restaurantData]);

  return (
    <SafeAreaView style={styles.container}>
      <SearchInput
        onChangeText={onChangeText}
        searchText={searchText}
        onUpdateSearchResults={onUpdateSearchResults}
        restaurantData={restaurantData || []}
      />
      <SearchResults
        restaurants={restaurants || []}
        openRestaurant={details =>
          navigation.navigate('RestaurantModal', { details })
        }
      />
    </SafeAreaView>
  );
};

Search.propTypes = {
  navigation: navigationPropTypes.isRequired,
};

export default Search;
