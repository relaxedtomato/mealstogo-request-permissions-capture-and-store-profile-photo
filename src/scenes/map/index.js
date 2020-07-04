import React, { useState } from 'react';
import { Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

import RestaurantData from '~/services/RestaurantData';
import MapMarker from '~/assets/icons/map-marker.svg';
import BackArrow from '~/assets/icons/back-arrow.svg';
import { Colors, Spacing } from '~/styles';
import { navigationPropTypes } from '~/types';
import { ICON_DIMENSIONS } from '~/utils/constants';
import RestaurantSelected from './components/RestaurantSelected';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  mapStyle: {
    ...StyleSheet.absoluteFillObject,
  },
  backButton: {
    position: 'absolute',
    left: Spacing.small,
    top: Spacing.medium,
  },
});

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;

const region = {
  latitude: 37.773972,
  longitude: -122.431297,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0922 * ASPECT_RATIO,
};

const Map = ({ navigation }) => {
  const [activeMarker, updateActiveMarker] = useState({});
  const [markers, updateMarkers] = useState(
    RestaurantData.results.map(
      ({ geometry, place_id: placeId, name, cuisine, image, vicinity }) => ({
        coordinate: {
          latitude: geometry.location.lat,
          longitude: geometry.location.lng,
        },
        color: Colors.lightBlue,
        placeId,
        name,
        cuisine,
        image,
        vicinity,
      })
    )
  );

  const { width: iconWidth, height: iconHeight } = ICON_DIMENSIONS;

  const onMapPress = pressedMarker => {
    const updatedMarkers = [...markers];

    if (activeMarker.placeId) {
      const prevMarkerIndex = markers.findIndex(
        ({ placeId }) => activeMarker.placeId === placeId
      );
      updatedMarkers[prevMarkerIndex].color = Colors.lightBlue;
    }

    const markerIndex = markers.findIndex(
      ({ placeId }) => placeId === pressedMarker.placeId
    );
    updatedMarkers[markerIndex].color = Colors.darkBlue;

    updateMarkers(updatedMarkers);
    updateActiveMarker(pressedMarker);
  };

  return (
    <View style={styles.container}>
      <MapView initialRegion={region} style={styles.mapStyle}>
        {markers.map(marker => (
          <Marker
            coordinate={marker.coordinate}
            key={marker.placeId}
            onPress={() => onMapPress(marker)}
          >
            <MapMarker
              width={iconWidth}
              height={iconHeight}
              fill={marker.color}
            />
          </Marker>
        ))}
      </MapView>
      {activeMarker.placeId ? (
        <RestaurantSelected
          restaurant={activeMarker}
          openRestaurant={details =>
            navigation.navigate('RestaurantModal', { details })
          }
        />
      ) : null}
      <View style={styles.backButton}>
        <TouchableOpacity onPress={navigation.goBack}>
          <BackArrow
            width={iconWidth}
            height={iconHeight}
            fill={Colors.black}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

Map.propTypes = {
  navigation: navigationPropTypes.isRequired,
};

export default Map;
