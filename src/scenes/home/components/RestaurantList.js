import React from 'react';
import { SectionList, StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';

import { restaurantPropTypes } from '~/types';
import { Spacing, Typography } from '~/styles';
import CloseByRestaurant from './CloseByRestaurant';
import FavRestaurants from './FavRestaurants';

const createRestaurantData = (openRestaurant, restaurantData, fav) => {
  const favRestaurants = restaurantData.filter(({ place_id: placeId }) =>
    fav.includes(placeId)
  );

  const closeByRestaurants = restaurantData.filter(
    ({ place_id: placeId }) => !fav.includes(placeId)
  );

  return [
    ...(favRestaurants.length > 0
      ? [
          {
            title: 'Favorites',
            // [[r1, r2, r3]]
            data: [favRestaurants],
            /* eslint-disable-next-line */
            renderItem: ({ item }) => (
              <FavRestaurants openRestaurant={openRestaurant} item={item} />
            ),
          },
        ]
      : []),
    {
      title: 'Close by',
      // [r1, r2, r3]
      data: closeByRestaurants,
      /* eslint-disable-next-line */
      renderItem: ({ item }) => (
        <CloseByRestaurant openRestaurant={openRestaurant} item={item} />
      ),
    },
  ];
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: Spacing.medium,
  },
  sectionHeader: {
    ...Typography.sectionHeader,
  },
});

const RestaurantList = ({ openRestaurant, restaurantData, fav }) => {
  return (
    <View style={styles.container}>
      <SectionList
        sections={createRestaurantData(openRestaurant, restaurantData, fav)}
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
  restaurantData: PropTypes.arrayOf(restaurantPropTypes).isRequired,
  fav: PropTypes.arrayOf(PropTypes.string),
};

RestaurantList.defaultProps = {
  geoLocation: {
    lat: 37.773972,
    lng: -122.431297,
  },
  fav: [],
};

export default RestaurantList;
