import React, { useState } from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { TextField } from 'react-native-material-textfield';

import { sectionHeader, Spacing, Colors } from '~/styles';
import BackButton from '~/components/BackButton';
import { navigationPropTypes } from '~/types';
import EmailInput from '../components/EmailInput';
import PasswordInput from '../components/PasswordInput';

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

const Signup = ({ navigation }) => {
  const [email, onChangeEmail] = useState('');
  const [password, onChangePassword] = useState('');
  const [name, onChangeName] = useState('');

  const onSubmit = () => {
    // TODO: Integrate Firebase Auth
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.sectionHeader}>Sign Up</Text>
        <TextField
          autoCapitalize="none"
          autoCorrect={false}
          enablesReturnKeyAutomatically
          onChangeText={onChangeName}
          returnKeyType="next"
          label="What's Your Name"
        />
        <EmailInput onChangeEmail={onChangeEmail} />
        <PasswordInput onChangePassword={onChangePassword} />
        <TouchableOpacity style={styles.button} onPress={onSubmit}>
          <Text style={styles.buttonText}>SIGN UP</Text>
        </TouchableOpacity>
      </View>
      <BackButton navigation={navigation} />
    </SafeAreaView>
  );
};

Signup.propTypes = {
  navigation: navigationPropTypes.isRequired,
};

export default Signup;
