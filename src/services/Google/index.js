import config from './config';

const CUISINES = [
  {
    cuisine: 'Mexican',
    image: [
      /* eslint-disable */
      require('~/assets/cuisine/mexican/mexican.jpg'),
      require('~/assets/cuisine/mexican/mexican-1.jpg'),
      require('~/assets/cuisine/mexican/mexican-2.jpg'),
      require('~/assets/cuisine/mexican/mexican-3.jpg'),
      require('~/assets/cuisine/mexican/mexican-4.jpg'),
      require('~/assets/cuisine/mexican/mexican-5.jpg'),
      require('~/assets/cuisine/mexican/mexican-6.jpg'),
      require('~/assets/cuisine/mexican/mexican-7.jpg'),
      require('~/assets/cuisine/mexican/mexican-8.jpg'),
      require('~/assets/cuisine/mexican/mexican-9.jpg'),
      /* eslint-enable */
    ],
  },
  // {
  //   cuisine: 'Thai',
  //   /* eslint-disable */
  //   image: require('~assets/thai.jpg'),
  //   /* eslint-enable */
  // },
];

const GoogleMaps = {
  getLocation: async userLocation => {
    const resultsJSON = await fetch(
      `${config.GOOGLE_MAPS_GEOCODE_URL}?address=${userLocation}&key=${config.GOOGLE_MAPS_API_KEY}`
    );
    const { results } = await resultsJSON.json();

    return results[0].geometry.location;
  },
  searchPlaces: async ({ lat, lng }) => {
    async function fetchRestaurantData({ cuisine, image }) {
      const resultsJSON = await fetch(
        `${config.GOOGLE_MAPS_NEARBY_URL}?location=${lat},${lng}&radius=5000&type=restaurant&keyword=${cuisine}&key=${config.GOOGLE_MAPS_API_KEY}`
      );
      const { results } = await resultsJSON.json();

      return results.map(restaurant => ({
        image: image[Math.floor(Math.random() * 10)],
        cuisine,
        ...restaurant,
      }));
    }

    const resultsArr = await Promise.all(CUISINES.map(fetchRestaurantData));
    return {
      results: resultsArr.flat(),
    };
  },
};

export default GoogleMaps;
