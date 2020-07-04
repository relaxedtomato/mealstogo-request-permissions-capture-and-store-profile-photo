import { useEffect, useState } from 'react';
import Google from '~/services/Google';

export const useSearchPlaces = geoLocation => {
  const [restaurantData, onUpdateRestaurantData] = useState([]);

  useEffect(() => {
    async function getRestaurantData() {
      try {
        if (geoLocation) {
          const { results } = await Google.searchPlaces(geoLocation);
          onUpdateRestaurantData(results);
        }
      } catch (fetchError) {
        // eslint-disable-next-line
        console.log(fetchError);
      }
    }
    getRestaurantData();
  }, [geoLocation]);

  return restaurantData;
};

export default useSearchPlaces;
