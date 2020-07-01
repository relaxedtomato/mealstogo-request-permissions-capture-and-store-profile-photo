import { Alert } from 'react-native';

const createAlert = authErrorMsg =>
  Alert.alert('Error', `Authentication: ${authErrorMsg}`, [
    [
      {
        text: 'OK',
      },
    ],
  ]);

export default createAlert;
