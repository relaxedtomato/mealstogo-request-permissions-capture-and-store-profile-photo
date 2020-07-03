import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';

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
  profileDetails: Typography.bodyText,
});

const ProfileDetails = ({ name, email, location }) => (
  <View style={styles.profileContainer}>
    <Text style={styles.sectionHeader}>Profile</Text>
    <ProfileCircle width={75} height={75} fill={Colors.darkGray} />
    <Text style={styles.profileDetails}>
      {`${name}  ${location && location}`}
    </Text>
    <Text style={styles.profileDetails}>{email}</Text>
  </View>
);

ProfileDetails.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  location: PropTypes.string,
};

ProfileDetails.defaultProps = {
  location: '',
};

export default ProfileDetails;
