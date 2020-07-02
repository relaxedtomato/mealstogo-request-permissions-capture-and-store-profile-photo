import React, { useState } from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

import Firebase from '~/services/Firebase';
import { navigationPropTypes } from '~/types';
import { sectionHeader, Spacing, Colors } from '~/styles';
import BackButton from '~/components/BackButton';
import EmailInput from '../components/EmailInput';
import PasswordInput from '../components/PasswordInput';
import createAlert from '../components/failedAuth';

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

const Login = ({ navigation }) => {
  const [email, onChangeEmail] = useState('');
  const [password, onChangePassword] = useState('');

  const onSubmit = async () => {
    try {
      await Firebase.signInWithEmailAndPassword({
        email,
        password,
      });
    } catch (firebaseError) {
      createAlert(firebaseError);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.sectionHeader}>Log In</Text>
        <EmailInput onChangeEmail={onChangeEmail} />
        <PasswordInput onChangePassword={onChangePassword} />
        <TouchableOpacity style={styles.button} onPress={onSubmit}>
          <Text style={styles.buttonText}>LOG IN</Text>
        </TouchableOpacity>
      </View>
      <BackButton navigation={navigation} />
    </SafeAreaView>
  );
};

Login.propTypes = {
  navigation: navigationPropTypes.isRequired,
};

export default Login;
