const path = require('path');
const express = require('express');
const hbs = require('hbs');

const weatherApi = require('./weather-api.js');

const app = express();
const PORT = process.env.PORT || 4000;

// ?? Define paths from Express config
const publicDir = path.join(__dirname, 'public');
const viewsPath = path.join(__dirname, 'views/templates');
const componentsPath = path.join(__dirname, 'views/components');

// ?? Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(componentsPath);

app.use(express.json());
app.use(express.static(publicDir));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Welcome',
    author: 'Roman Hudyma',
  });
});
app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    author: 'Roman Hudyma',
  });
});
app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    author: 'Roman Hudyma',
  });
});

app.get('/weather', (req, res) => {
  let { search } = req.query;
  let emptySearch = search;
  if (!search) {
    search = 'Kyiv';
  }
  weatherApi(search, (err, data) => {
    if (err) return res.send(err);
    if (data.success === false) return res.status(400).send(data.error.info);
    let weatherData = {
      title: 'Weather',
      author: 'Roman Hudyma',
      weather_descriptions: data.current.weather_descriptions,
      temperature: data.current.temperature,
      wind_speed: data.current.wind_speed,
      wind_dir: data.current.wind_dir,
      pressure: data.current.pressure,
      feelslike: data.current.feelslike,
      weather_icons: data.current.weather_icons,
      location: {
        name: data.location.name,
        country: data.location.country,
        region: data.location.region,
      },
    };
    if (!emptySearch) return res.render('weather', weatherData);
    res.send(weatherData);
  });
});

// !! Last Route
app.get('*', (req, res) => {
  res.render('not-found', {
    title: '404 Error',
    author: 'Roman Hudyma',
  });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
