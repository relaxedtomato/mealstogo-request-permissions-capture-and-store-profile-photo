import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

import { Spacing, Colors } from '~/styles';
import BackArrow from '~/assets/icons/back-arrow.svg';
import { ICON_DIMENSIONS } from '~/utils/constants';

const styles = StyleSheet.create({
  backButton: {
    position: 'absolute',
    left: Spacing.small,
    top: Spacing.medium,
  },
});

const BackButton = ({ navigation, color }) => (
  <TouchableOpacity
    onPress={() => navigation.goBack()}
    activeOpacity={0.5}
    style={styles.backButton}
  >
    <BackArrow
      width={ICON_DIMENSIONS.width}
      height={ICON_DIMENSIONS.height}
      fill={color}
    />
  </TouchableOpacity>
);

BackButton.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
  }).isRequired,
  color: PropTypes.string,
};

BackButton.defaultProps = {
  color: Colors.black,
};

export default BackButton;
