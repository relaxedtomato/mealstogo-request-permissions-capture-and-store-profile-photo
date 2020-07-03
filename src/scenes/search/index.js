import React, { useState, useEffect } from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';

import Firebase from '~/services/Firebase';
import Google from '~/services/Google';
import { Colors } from '~/styles';
import SearchInput from './components/SearchInput';
import SearchResults from './components/SearchResults';
import RestaurantData from '~/services/RestaurantData';
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
  const [restaurantData, onUpdateRestaurantData] = useState([]);
  const [user, onUpdateUser] = useState({});

  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      onChangeText(INITIAL_SEARCH_INPUT);
      onUpdateSearchResults(restaurantData);
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    async function getUser() {
      try {
        const { uid } = Firebase.currentUser();

        if (uid) {
          const userData = await Firebase.getUser(uid);
          const updatedUser = userData.data();

          // Set a default location as SF
          if (!updatedUser.location || !updatedUser.geoLocation) {
            updatedUser.geoLocation = {
              lat: '37.773972',
              lng: '-122.431297',
            };
            updatedUser.location = 'San Francisco';
          }

          onUpdateUser(updatedUser);
        }
      } catch (firebaseError) {
        // eslint-disable-next-line
        console.log(firebaseError);
      }
    }
    getUser();
  }, []);

  useEffect(() => {
    async function getRestaurantData() {
      try {
        if (user.geoLocation) {
          const { results } = await Google.searchPlaces(user.geoLocation);
          onUpdateRestaurantData(results);
          onUpdateSearchResults(results);
        }
      } catch (fetchError) {
        // eslint-disable-next-line
        console.log(fetchError);
      }
    }
    getRestaurantData();
  }, [user.geoLocation]);

  return (
    <SafeAreaView style={styles.container}>
      <SearchInput
        onChangeText={onChangeText}
        searchText={searchText}
        onUpdateSearchResults={onUpdateSearchResults}
        restaurantData={restaurantData.results || []}
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
