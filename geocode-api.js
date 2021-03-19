const request = require('request');

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoiYWthdG9jaGEiLCJhIjoiY2ttNHF4eDc5MDdhZDJxanh5c29yOXl3YSJ9.8R9sCsIGfEbwe7uUN34snQ`;

  request({ url, json: true }, (err, res) => {
    if (err) {
      callback('GEO: Ups! Something is wrong (err from api)');
    } else if (!res.body.features) {
      callback('GEO: Ups! Location is not found');
    } else {
      callback(null, res.body);
    }
  });
};

module.exports = geocode;
