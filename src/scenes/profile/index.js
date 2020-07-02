import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import Firebase from '~/services/Firebase';
import { Colors, Spacing, Typography } from '~/styles';
import ChevronLink from '~/assets/icons/chevron-link.svg';
import ProfileCircle from '~/assets/icons/profile-circle.svg';

const styles = StyleSheet.create({
  container: {
    margin: Spacing.medium,
  },
  sectionHeader: {
    ...Typography.sectionHeader,
    marginTop: Spacing.small,
    marginBottom: Spacing.small,
  },
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
  profileContainer: {
    marginTop: Spacing.medium,
    alignItems: 'center',
    height: '30%',
  },
});

const Profile = () => {
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
      onPress: () => {
        /* TODO: Alert for Location Input */
      },
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
        // TODO: Add Alert to confirm user wants to signout
        Firebase.signOut();
      },
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profileContainer}>
        <Text style={styles.sectionHeader}>Profile</Text>
        <ProfileCircle width={75} height={75} fill={Colors.darkGray} />
      </View>
      {profileLinks.map(({ label, onPress }) => (
        <TouchableOpacity
          onPress={onPress}
          opacity={0.2}
          style={styles.linkContainer}
          key={label}
        >
          <Text style={styles.link}>{label}</Text>
          <ChevronLink width={20} height={20} fill={Colors.mediumGray} />
        </TouchableOpacity>
      ))}
    </SafeAreaView>
  );
};

export default Profile;
