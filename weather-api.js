const geocode = require('./geocode-api');
const mapbox = require('./mapbox-api');

const weatherApi = async (location, call) => {
  if (!location) return 'Location is empty';
  geocode(location, (err, data) => {
    if (err) call(err);

    let lat = data?.features[0]?.center[1];
    let long = data?.features[0]?.center[0];

    mapbox(lat, long, (err, weatherData) => {
      if (err) return call(err);
      call(null, weatherData);
    });
  });
};

module.exports = weatherApi;
