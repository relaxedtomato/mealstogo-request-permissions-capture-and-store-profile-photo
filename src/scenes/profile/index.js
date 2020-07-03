import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';

import Firebase from '~/services/Firebase';
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
  const [user, onUpdateUser] = useState({});

  useEffect(() => {
    const getUser = async () => {
      try {
        const { uid } = Firebase.currentUser();

        if (uid) {
          const userData = await Firebase.getUser(uid);
          onUpdateUser(userData.data());
        }
      } catch (firebaseError) {
        // eslint-disable-next-line
        console.log(firebaseError);
      }
    };
    getUser();
  }, []);

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
