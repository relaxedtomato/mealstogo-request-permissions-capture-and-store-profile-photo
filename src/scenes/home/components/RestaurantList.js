import React from 'react';
import { SectionList, StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';

import { Spacing, Typography } from '~/styles';
import CloseByRestaurant from './CloseByRestaurant';
import FavRestaurants from './FavRestaurants';

const createRestaurantData = (openRestaurant, restaurantData) => [
  {
    title: 'Favorites',
    data: [restaurantData.slice(11, 16)], // [[r1, r2, r3]]
    /* eslint-disable-next-line */
    renderItem: ({ item }) => (
      <FavRestaurants openRestaurant={openRestaurant} item={item} />
    ),
  },
  {
    title: 'Close by',
    data: restaurantData.slice(0, 10), // [r1, r2, r3]
    /* eslint-disable-next-line */
    renderItem: ({ item }) => (
      <CloseByRestaurant openRestaurant={openRestaurant} item={item} />
    ),
  },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: Spacing.medium,
  },
  sectionHeader: {
    ...Typography.sectionHeader,
  },
});

const RestaurantList = ({ openRestaurant, restaurantData }) => {
  // const restaurantData = useSearchPlaces(geoLocation);
  return (
    <View style={styles.container}>
      <SectionList
        sections={createRestaurantData(openRestaurant, restaurantData)}
        keyExtractor={restaurant => restaurant.place_id}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.sectionHeader}>{title}</Text>
        )}
        stickySectionHeadersEnabled={false}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

RestaurantList.propTypes = {
  openRestaurant: PropTypes.func.isRequired,
  geoLocation: PropTypes.shape({
    lat: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    lng: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  }),
};

RestaurantList.defaultProps = {
  geoLocation: {
    lat: 37.773972,
    lng: -122.431297,
  },
};

export default RestaurantList;
