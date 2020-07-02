import React from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

import Firebase from '~/services/Firebase';
import { Colors, Spacing, Typography } from '~/styles';
import ChevronLink from '~/assets/icons/chevron-link.svg';

const styles = StyleSheet.create({
  linkContainer: {
    marginTop: Spacing.medium,
    marginBottom: Spacing.medium,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.mediumGray,
  },
  link: {
    ...Typography.sectionHeader,
    marginBottom: Spacing.small,
  },
});

const ProfileLinks = ({ disableOnPress, openModal }) => {
  const profileLinks = [
    {
      label: 'Favorites',
      onPress: () => {
        /* TODO: */
      },
    },
    {
      label: 'Payment',
      onPress: () => {
        /* TODO: */
      },
    },
    {
      label: 'Location',
      onPress: openModal,
    },
    {
      label: 'Past orders',
      onPress: () => {
        /* TODO: */
      },
    },
    {
      label: 'Sign Out',
      onPress: () => {
        Alert.alert(
          'Signout',
          'Are you sure you want to signout?',
          [
            {
              text: 'Cancel',
              onPress: () => {},
              style: 'cancel',
            },
            {
              text: 'OK',
              onPress: () => {
                Firebase.signOut();
              },
            },
          ],
          { cancelable: false }
        );
      },
    },
  ];

  return (
    <>
      {profileLinks.map(({ label, onPress }) => (
        <TouchableOpacity
          onPress={() => !disableOnPress && onPress()}
          activeOpacity={!disableOnPress ? 0.2 : 1}
          style={styles.linkContainer}
          key={label}
        >
          <Text style={styles.link}>{label}</Text>
          <ChevronLink width={20} height={20} fill={Colors.mediumGray} />
        </TouchableOpacity>
      ))}
    </>
  );
};

ProfileLinks.propTypes = {
  disableOnPress: PropTypes.bool.isRequired,
  openModal: PropTypes.func.isRequired,
};

export default ProfileLinks;
