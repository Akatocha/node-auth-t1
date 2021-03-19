const request = require('request');

const weatherApp = (lat, long, call) => {
  const url = `http://api.weatherstack.com/current?access_key=2c148f427897477aaf108239dcf71743&query=${lat},${long}&units=m`;

  request({ url, json: true }, (err, res) => {
    if (err) return call(err, null);
    const data = res.body;
    call(null, data);
  });
};

module.exports = weatherApp;
