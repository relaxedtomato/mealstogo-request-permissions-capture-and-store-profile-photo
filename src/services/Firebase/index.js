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
      .set({ fav: [], ...data }),

  createUserWithEmailAndPassword: ({ email, password }) =>
    firebase.auth().createUserWithEmailAndPassword(email, password),

  onAuthStateChanged: user => firebase.auth().onAuthStateChanged(user),

  signInWithEmailAndPassword: ({ email, password }) =>
    firebase.auth().signInWithEmailAndPassword(email, password),

  signOut: () => firebase.auth().signOut(),

  updateUser: data =>
    firebase
      .firestore()
      .collection('users')
      .doc(`${data.uid}`)
      .update(data),

  currentUser: () => firebase.auth().currentUser,

  getUser: uid =>
    firebase
      .firestore()
      .collection('users')
      .doc(uid)
      .get(),

  addFav: ({ uid }, placeId) =>
    firebase
      .firestore()
      .collection('users')
      .doc(uid)
      .update({
        fav: firebase.firestore.FieldValue.arrayUnion(placeId),
      }),

  removeFav: ({ uid }, placeId) =>
    firebase
      .firestore()
      .collection('users')
      .doc(uid)
      .update({
        fav: firebase.firestore.FieldValue.arrayRemove(placeId),
      }),

  addProfileImage: async ({ uid }, imageBlob) => {
    const imageRef = firebase
      .storage()
      .ref()
      .child(uid);

    return imageRef.put(imageBlob);
  },

  getProfileImage: ({ uid }) =>
    firebase
      .storage()
      .ref()
      .child(`${uid}`)
      .getDownloadURL(),
};

export default Firebase;
