const weatherIcons = require('../assets/weatherbit/weatherbit-icons');

/* DOM Manipulation */

function setDateInputs(start, end) {
  document.querySelector('#start').valueAsDate = start;
  document.querySelector('#end').valueAsDate = end;
}

function setCountdown(countdown) {
  document.querySelector('#new-countdown').textContent = countdown;
}

function setNights(nights) {
  document.querySelector('#new-nights').textContent = nights;
}

function setCityDetails(city) {
  document.querySelector('#city_name').textContent = city.name;
  document.querySelector('#lon').textContent = city.lng;
  document.querySelector('#lat').textContent = city.lat;
  document.querySelector('#country').textContent = city.countryName;
  document.querySelector('#country_code').textContent = city.countryCode;
}

function setWeather(weather) {
  const weatherIcon = new Image();
  weatherIcon.src = weatherIcons.get(weather.weather.icon);
  document.querySelector('#icon').replaceChildren(weatherIcon);
  document.querySelector('#weather_text').textContent =
    weather.weather.description;
  document.querySelector('#temp').textContent = weather.temp;
  document.querySelector('#wind_spd').textContent = weather.wind_spd.toFixed(1);
  document.querySelector('#wind_dir').textContent = weather.wind_cdir;
}

function setHistoricWeather(weather) {
  document.querySelector('#hist_min').textContent = weather.min_temp;
  document.querySelector('#hist_max').textContent = weather.max_temp;
  document.querySelector('#hist_clouds').textContent = weather.clouds;
  document.querySelector('#hist_spd').textContent = weather.wind_spd.toFixed(1);
}

function setCityPicture(url) {
  document.querySelector('#image').setAttribute('src', url);
}

export {
  setDateInputs,
  setCityDetails,
  setWeather,
  setHistoricWeather,
  setCityPicture,
  setCountdown,
  setNights,
};
