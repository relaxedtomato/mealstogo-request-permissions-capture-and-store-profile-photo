import React from 'react';
import {
  Dimensions,
  ImageBackground,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';

import { Colors, Typography, Spacing } from '~/styles';
import { navigationPropTypes } from '~/types';

const welcomeImage = require('~/assets/images/welcome.jpg');

const styles = StyleSheet.create({
  imageBackground: {
    height: Dimensions.get('window').height,
    justifyContent: 'center',
  },
  linkContainer: {
    backgroundColor: Colors.lightGray,
    borderRadius: 10,
    elevation: 2,
    justifyContent: 'center',
    margin: Spacing.large,
    opacity: 0.75,
    padding: Spacing.medium,
  },
  login: {
    fontFamily: 'sanchez-regular',
    fontSize: Typography.largeFontSize,
    marginTop: Spacing.medium,
    textAlign: 'center',
  },
  signUp: {
    fontFamily: 'sanchez-regular',
    fontSize: Typography.largeFontSize,
    margin: Spacing.medium,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  signUpButton: {
    alignSelf: 'center',
    backgroundColor: Colors.lightBlue,
    borderRadius: 10,
    width: '80%',
  },
  welcome: {
    fontFamily: 'oswald-regular',
    fontSize: 48,
    margin: Spacing.large,
    position: 'absolute',
    top: Spacing.xlarge,
  },
});

const Welcome = ({ navigation }) => (
  <SafeAreaView>
    <ImageBackground
      source={welcomeImage}
      style={styles.imageBackground}
      opacity={0.8}
    >
      <Text style={styles.welcome}>Meals To Go</Text>
      <View style={styles.linkContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate('SignUp')}
          style={styles.signUpButton}
          activeOpacity={0.7}
        >
          <Text style={styles.signUp}>Signup with Email</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.login}>Have an account? Log In.</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  </SafeAreaView>
);

Welcome.propTypes = {
  navigation: navigationPropTypes.isRequired,
};

export default Welcome;
