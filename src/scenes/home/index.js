import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet, View } from 'react-native';

import TopBar from '~/components/TopBar';
import useUserData from '~/hooks/useUserData';
import useSearchPlaces from '~/hooks/useSearchPlaces';
import { Colors } from '~/styles';
import { navigationPropTypes } from '~/types';
import { TAB_BAR_HEIGHT } from '~/utils/constants';

import RestaurantList from './components/RestaurantList';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topbar: {
    height: TAB_BAR_HEIGHT,
    // Note: only works on Android
    marginTop: StatusBar.currentHeight,
  },
  content: {
    flex: 1,
    backgroundColor: Colors.lightGray,
  },
});

export default function Home({ navigation }) {
  const { location, geoLocation } = useUserData(navigation);
  const restaurantData = useSearchPlaces(geoLocation);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topbar}>
        <TopBar
          location={location}
          openMap={() =>
            navigation.navigate('MapModal', { geoLocation, restaurantData })
          }
        />
      </View>
      <View style={styles.content}>
        <RestaurantList
          openRestaurant={details =>
            navigation.navigate('RestaurantModal', { details })
          }
          geoLocation={geoLocation}
          restaurantData={restaurantData}
        />
      </View>
    </SafeAreaView>
  );
}

Home.propTypes = {
  navigation: navigationPropTypes.isRequired,
};
