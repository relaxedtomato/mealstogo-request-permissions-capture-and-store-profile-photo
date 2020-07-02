import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';

import { Spacing } from '~/styles';
import ProfileLinks from './components/profileLinks';
import ProfileDetails from './components/profileDetails';

const styles = StyleSheet.create({
  container: {
    margin: Spacing.medium,
  },
});

const Profile = () => (
  <SafeAreaView style={styles.container}>
    <ProfileDetails />
    <ProfileLinks />
  </SafeAreaView>
);

export default Profile;
