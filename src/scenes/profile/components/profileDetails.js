import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Colors, Spacing, Typography } from '~/styles';
import ProfileCircle from '~/assets/icons/profile-circle.svg';

const styles = StyleSheet.create({
  sectionHeader: {
    ...Typography.sectionHeader,
    marginTop: Spacing.small,
    marginBottom: Spacing.small,
  },
  profileContainer: {
    marginTop: Spacing.medium,
    alignItems: 'center',
    height: '30%',
  },
});

const ProfileDetails = () => (
  <View style={styles.profileContainer}>
    <Text style={styles.sectionHeader}>Profile</Text>
    <ProfileCircle width={75} height={75} fill={Colors.darkGray} />
  </View>
);

export default ProfileDetails;
