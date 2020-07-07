import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';

import Google from '~/services/Google';
import Firebase from '~/services/Firebase';
import useUserData from '~/hooks/useUserData';
import { Spacing } from '~/styles';
import { navigationPropTypes } from '~/types';

import ProfileLinks from './components/profileLinks';
import ProfileDetails from './components/profileDetails';
import LocationModal from './components/locationModal';

const styles = StyleSheet.create({
  container: {
    margin: Spacing.medium,
  },
});

const Profile = ({ navigation }) => {
  const [isLocationModalOpen, toggleLocationModal] = useState(false);
  const [updateLocation, onLocationInput] = useState('');
  const user = useUserData(navigation);

  async function onSubmitLocationChange() {
    try {
      const geoLocation = await Google.getLocation(updateLocation);

      await Firebase.updateUser({
        uid: user.uid,
        location: updateLocation,
        geoLocation,
      });
    } catch (firebaseError) {
      // eslint-disable-next-line
      console.log(firebaseError);
    }
  }

  const { name, email, location, uid } = user;

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ zIndex: 0 }}>
        <ProfileDetails
          name={name}
          email={email}
          location={!isLocationModalOpen ? updateLocation || location : ''}
          uid={uid}
        />
        <ProfileLinks
          disableOnPress={isLocationModalOpen}
          openModal={() => toggleLocationModal(!isLocationModalOpen)}
        />
      </View>
      {isLocationModalOpen && (
        <LocationModal
          closeModal={() => toggleLocationModal(!isLocationModalOpen)}
          onLocationInput={onLocationInput}
          onSetLocation={onSubmitLocationChange}
          location={updateLocation}
        />
      )}
    </SafeAreaView>
  );
};

Profile.propTypes = {
  navigation: navigationPropTypes.isRequired,
};

export default Profile;
