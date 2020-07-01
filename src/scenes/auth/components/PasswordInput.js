import React from 'react';
import PropTypes from 'prop-types';
import { TextField } from 'react-native-material-textfield';

const PasswordInput = ({ onChangePassword }) => (
  <TextField
    secureTextEntry
    autoCapitalize="none"
    autoCorrect={false}
    enablesReturnKeyAutomatically
    clearTextOnFocus
    onChangeText={onChangePassword}
    returnKeyType="done"
    label="Password"
    maxLength={30}
    characterRestriction={25}
  />
);

PasswordInput.propTypes = {
  onChangePassword: PropTypes.func.isRequired,
};

export default PasswordInput;
