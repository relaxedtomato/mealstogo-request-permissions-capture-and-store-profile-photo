import React from 'react';
import { Text, SafeAreaView, StyleSheet } from 'react-native';

import { navigationPropTypes } from '~/types';
import { sectionHeader, Spacing, Colors } from '~/styles';

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
  sectionHeader,
  buttonText: {
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  loginButton: {
    marginTop: Spacing.large,
  },
});

const Login = ({ navigation }) => (
  <SafeAreaView>
    <Text> Login </Text>
    <Text onPress={() => navigation.goBack()}> Back to Welcome </Text>
  </SafeAreaView>
);

Login.propTypes = {
  navigation: navigationPropTypes.isRequired,
};

export default Login;
