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
  document.querySelector('#country').textContent = city.countryName;
  document.querySelector('#country_code').textContent = city.countryCode;
}

function setWeather(weather) {
  const weatherIcon = new Image();
  weatherIcon.src = weatherIcons.get(weather.weather.icon);
  document.querySelector('#weather_icon').replaceChildren(weatherIcon);
  document.querySelector('#weather_shorty').textContent = `${
    weather.temp
  }°C, ${Math.round(weather.wind_spd)} km/h ${weather.wind_cdir}`;
}

function setHistoricWeather(weather) {
  document.querySelector('#historic_weather_shorty').textContent = `${
    weather.min_temp
  }°C, ${weather.max_temp}°C, ${Math.round(weather.wind_spd)} km/h, ${
    weather.clouds
  }% Clouds`;
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
