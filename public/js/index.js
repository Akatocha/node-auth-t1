const form = document.querySelector('form');
const search = document.querySelector('input');

const country = document.querySelector('#country');
const region = document.querySelector('#region');
const name = document.querySelector('#name');
const temperature = document.querySelector('#temperature');
const feelslike = document.querySelector('#feelslike');
const pressure = document.querySelector('#pressure');
const wind_dir = document.querySelector('#wind_dir');
const wind_speed = document.querySelector('#wind_speed');
const weather_descriptions = document.querySelector('#weather_descriptions');

const weather_icons = document.querySelector('#weather_icons');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const location = search.value;
  if (location) {
    fetch(`/weather?search=${location}`).then((res) => {
      if (res.status == 400) return console.log('Error search Location');
      res.json().then((data) => {
        weather_icons.src = data.weather_icons;

        country.textContent = data.location.country;
        region.textContent = data.location.region;
        name.textContent = data.location.name;
        temperature.textContent = data.temperature;
        feelslike.textContent = data.feelslike;
        pressure.textContent = data.pressure;
        wind_dir.textContent = data.wind_dir;
        wind_speed.textContent = data.wind_speed;
        weather_descriptions.textContent = data.weather_descriptions;
      });
    });
  }
});
