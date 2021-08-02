const weatherIcons = require('../assets/weatherbit/weatherbit-icons');

/* Function to make an info string, containing the place, temperature and main-weather */
const createInfo = (weather) => {
  // convert from kelvin to celsius
  const tempC = Math.round(weather.main.temp - 273.15);
  const info = `${weather.name}, ${tempC}°C, ${weather.weather[0].main}`;
  return info;
};

/* DOM Manipulation */
const writeRecentEntry = (entry) => {
  document.querySelector('#date').innerHTML = new Date(
    entry.date
  ).toUTCString();
  document.querySelector('#temp').innerHTML = entry.info;
  document.querySelector('#content').innerHTML = entry.content;
};

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

function setWeather(weather) {
  console.log(weather);

  const weatherIcon = new Image();
  weatherIcon.src = weatherIcons.get(weather.weather.icon);
  document.querySelector('#weather_icon').replaceChildren(weatherIcon);
  document.querySelector('#weather_shorty').textContent = `${
    weather.temp
  }°C, ${Math.round(weather.wind_spd)} km/h ${weather.wind_cdir}`;
}

export {
  setDateInputs,
  setWeather,
  createInfo,
  writeRecentEntry,
  setCountdown,
  setNights,
};
