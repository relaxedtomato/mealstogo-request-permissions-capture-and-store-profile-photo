import React from 'react';
import { Button, StyleSheet, View } from 'react-native';
import { TextField } from 'react-native-material-textfield';
import PropTypes from 'prop-types';

import { Spacing } from '~/styles';

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    backgroundColor: 'white',
    borderRadius: 4,
    elevation: 2,
    height: 200,
    justifyContent: 'center',
    position: 'absolute',
    top: '50%',
    width: '80%',
    zIndex: 1,
  },
  textField: {
    margin: Spacing.medium,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

const LocationModal = ({ closeModal, onLocationInput, location }) => (
  <View style={styles.container}>
    <View style={styles.textField}>
      <TextField
        autoCapitalize="none"
        autoCorrect={false}
        enablesReturnKeyAutomatically
        onChangeText={onLocationInput}
        onFocus={() => onLocationInput('')}
        returnKeyType="next"
        label="What's your location?"
      />
      <View style={styles.buttons}>
        <Button
          title="Set Location"
          disabled={location.length === 0}
          onPress={closeModal}
        />
        <Button
          title="Cancel"
          onPress={() => {
            onLocationInput('');
            closeModal();
          }}
        />
      </View>
    </View>
  </View>
);

LocationModal.propTypes = {
  location: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
  onLocationInput: PropTypes.func.isRequired,
};

export default LocationModal;
