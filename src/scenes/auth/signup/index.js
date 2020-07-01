import React from 'react';
import { Text, SafeAreaView, StyleSheet } from 'react-native';

import { sectionHeader, Spacing, Colors } from '~/styles';
import { navigationPropTypes } from '~/types';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  formContainer: {
    margin: Spacing.large,
  },
  button: {
    backgroundColor: Colors.lightBlue,
    marginTop: Spacing.large,
    height: Spacing.xlarge,
    borderRadius: 16,
    justifyContent: 'center',
    opacity: 0.7,
  },
  buttonText: {
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  loginButton: {
    marginTop: Spacing.large,
  },
  sectionHeader,
});

const SignUp = ({ navigation }) => (
  <SafeAreaView>
    <Text> Sign up </Text>
    <Text onPress={() => navigation.goBack()}> Back to Welcome </Text>
  </SafeAreaView>
);

SignUp.propTypes = {
  navigation: navigationPropTypes.isRequired,
};

export default SignUp;
