import { useState, useEffect } from 'react';
import Firebase from '~/services/Firebase';

export const useUserData = navigation => {
  const [user, onUpdateUser] = useState({});
  const [focused, onFocus] = useState(true);

  useEffect(() => {
    const unsubscribeBlur = navigation.addListener('blur', () =>
      onFocus(false)
    );
    const unsubscribeFocus = navigation.addListener('focus', () =>
      onFocus(true)
    );

    return () => {
      unsubscribeBlur();
      unsubscribeFocus();
    };
  }, []);

  useEffect(() => {
    async function getUser() {
      try {
        const { uid } = Firebase.currentUser();

        if (uid) {
          const userData = await Firebase.getUser(uid);
          const updatedUser = userData.data();

          // Set a default location as SF
          if (!updatedUser.location) {
            updatedUser.geoLocation = {
              lat: '37.773972',
              lng: '-122.431297',
            };
            updatedUser.location = 'San Francisco';
          }

          if (user.location !== updatedUser.location) {
            onUpdateUser(updatedUser);
          }
        }
      } catch (firebaseError) {
        // eslint-disable-next-line
        console.log(firebaseError);
      }
    }
    getUser();
  }, [focused]);

  return user;
};

export default useUserData;
