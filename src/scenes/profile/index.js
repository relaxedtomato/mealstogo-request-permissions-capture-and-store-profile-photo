import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';

import { Spacing } from '~/styles';
import ProfileLinks from './components/profileLinks';
import ProfileDetails from './components/profileDetails';
import LocationModal from './components/locationModal';

const styles = StyleSheet.create({
  container: {
    margin: Spacing.medium,
  },
});

const Profile = () => {
  const [isLocationModalOpen, toggleLocationModal] = useState(false);
  const [updateLocation, onLocationInput] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ zIndex: 0 }}>
        <ProfileDetails />
        <ProfileLinks
          disableOnPress={isLocationModalOpen}
          openModal={() => toggleLocationModal(!isLocationModalOpen)}
        />
      </View>
      {isLocationModalOpen && (
        <LocationModal
          closeModal={() => toggleLocationModal(!isLocationModalOpen)}
          onLocationInput={onLocationInput}
          location={updateLocation}
        />
      )}
    </SafeAreaView>
  );
};

export default Profile;
