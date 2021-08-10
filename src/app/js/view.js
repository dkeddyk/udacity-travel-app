import { removeTrip } from './controller';

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
  document.querySelector('#duration').textContent = nights;
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

function toggleSearch(value) {
  document.querySelector('#search-section').style.display = value
    ? 'block'
    : 'none';
  document.querySelector('#result-section').style.display = value
    ? 'none'
    : 'block';
}

function renderTrips(trips) {
  const container = new DocumentFragment();
  for (const trip of trips) {
    const element = document.createElement('p');
    element.dataset.id = trip.id;
    element.textContent = `${trip.city.name} from ${trip.start} to ${trip.end}`;
    const deleteIcon = document.createElement('i');
    deleteIcon.classList.add('icon-btn', 'fas', 'fa-trash');
    deleteIcon.textContent = deleteIcon.addEventListener('click', () =>
      removeTrip(trip.id)
    );
    element.appendChild(deleteIcon);
    container.appendChild(element);
  }
  document.querySelector('#travel-grid').replaceChildren(container);
}

export {
  setDateInputs,
  setCityDetails,
  setWeather,
  setHistoricWeather,
  setCityPicture,
  setCountdown,
  setNights,
  toggleSearch,
  renderTrips,
};
