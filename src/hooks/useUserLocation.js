import { useState, useEffect } from 'react';
import Firebase from '~/services/Firebase';

export const useUserLocation = () => {
  const [user, onUpdateUser] = useState({});

  useEffect(() => {
    async function getUser() {
      try {
        const { uid } = Firebase.currentUser();

        if (uid) {
          const userData = await Firebase.getUserData(uid);
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
  }, []);

  return user;
};

export default useUserLocation;
