import * as firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';
import config from './config';

firebase.initializeApp(config);

const Firebase = {
  createUser: data =>
    firebase
      .firestore()
      .collection('users')
      .doc(`${data.uid}`)
      .set(data),

  createUserWithEmailAndPassword: ({ email, password }) =>
    firebase.auth().createUserWithEmailAndPassword(email, password),

  onAuthStateChanged: user => firebase.auth().onAuthStateChanged(user),

  signInWithEmailAndPassword: ({ email, password }) =>
    firebase.auth().signInWithEmailAndPassword(email, password),

  signOut: () => firebase.auth().signOut(),
};

export default Firebase;
