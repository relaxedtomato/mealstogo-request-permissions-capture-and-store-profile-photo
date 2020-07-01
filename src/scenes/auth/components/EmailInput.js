import React from 'react';
import PropTypes from 'prop-types';
import { TextField } from 'react-native-material-textfield';

const EmailInput = ({ onChangeEmail }) => (
  <TextField
    keyboardType="email-address"
    autoCapitalize="none"
    autoCorrect={false}
    enablesReturnKeyAutomatically
    onChangeText={onChangeEmail}
    returnKeyType="next"
    label="Your Email Address"
  />
);

EmailInput.propTypes = {
  onChangeEmail: PropTypes.func.isRequired,
};

export default EmailInput;
