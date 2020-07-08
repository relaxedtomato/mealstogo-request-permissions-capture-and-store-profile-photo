import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import PropTypes from 'prop-types';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';

import Firebase from '~/services/Firebase';
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
  profileImage: { width: 100, height: 100, borderRadius: 100 / 2 },
});

const ProfileDetails = ({ name, email, location, uid }) => {
  const [imageUrl, setImageUrl] = useState();

  useEffect(() => {
    async function getImageUrl() {
      try {
        if (uid) {
          const imageLocation = await Firebase.getProfileImage({ uid });
          setImageUrl(imageLocation);
        }
      } catch (error) {
        // error will always occur if no profile image
        // eslint-disable-next-line
        console.log(error);
      }
    }
    getImageUrl();
  }, [uid]);

  const takeAndStorePhoto = async () => {
    const options = {
      base64: true,
      allowEditing: true,
    };

    const image = await ImagePicker.launchCameraAsync(options);

    if (!image.cancelled) {
      try {
        setImageUrl(image.uri);
        const imageToUpload = await fetch(image.uri);
        const imageBlob = await imageToUpload.blob();
        await Firebase.addProfileImage({ uid }, imageBlob);
      } catch (error) {
        // eslint-disable-next-line
        console.log(error);
      }
    }
  };

  const checkIOSPermission = async () => {
    if (Constants.platform.ios) {
      const { status: cameraRollStatus } = await Permissions.getAsync(
        Permissions.CAMERA_ROLL
      );

      const { status: cameraStatus } = await Permissions.getAsync(
        Permissions.CAMERA
      );

      if (cameraRollStatus === 'granted' && cameraStatus === 'granted') {
        return true;
      }

      if (cameraStatus !== 'granted') {
        await Permissions.askAsync(Permissions.CAMERA);
      }

      if (cameraRollStatus !== 'granted') {
        await Permissions.askAsync(Permissions.CAMERA_ROLL);
      }

      const { status } = await Permissions.getAsync(
        Permissions.CAMERA_ROLL,
        Permissions.CAMERA
      );

      if (status !== 'granted') {
        return false;
      }
    }
    return true;
  };

  const onChangeProfileImage = async () => {
    try {
      const iOSPermissions = await checkIOSPermission();
      if (!iOSPermissions) {
        // exit out of onChangeProfileImage
        return;
      }
      takeAndStorePhoto();
    } catch (error) {
      // eslint-disable-next-line
      console.log(error);
    }
  };

  return (
    <View style={styles.profileContainer}>
      <Text style={styles.sectionHeader}>Profile</Text>
      <TouchableOpacity onPress={onChangeProfileImage}>
        {imageUrl ? (
          <Image source={{ uri: imageUrl }} style={styles.profileImage} />
        ) : (
          <ProfileCircle width={100} height={100} fill={Colors.darkGray} />
        )}
      </TouchableOpacity>
      <Text style={styles.profileDetails}>
        {`${name}  ${location && location}`}
      </Text>
      <Text style={styles.profileDetails}>{email}</Text>
    </View>
  );
};

ProfileDetails.propTypes = {
  name: PropTypes.string,
  email: PropTypes.string,
  location: PropTypes.string,
  uid: PropTypes.string,
};

ProfileDetails.defaultProps = {
  uid: '',
  name: '',
  email: '',
  location: '',
};

export default ProfileDetails;
