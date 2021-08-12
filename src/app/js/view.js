import { removeTrip, setTrip } from './controller';
import { getCountdown, getNights } from './model';

const weatherIcons = require('../assets/weatherbit/weatherbit-icons');

const formatDate = (d) =>
  new Intl.DateTimeFormat(navigator.language ?? 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(d);

/* DOM Manipulation */

function setDateInputs(start, end) {
  document.querySelector('#start').valueAsDate = start;
  document.querySelector('#end').valueAsDate = end;
}

function setCountdown(countdown) {
  document.querySelector('#countdown').textContent = countdown;
}

function setNights(nights) {
  document.querySelector('#duration').textContent = nights;
}

function setStay(nights) {
  document.querySelector('#stay').textContent = nights;
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

function showBottom(save = false, created) {
  if (save) {
    document.querySelector('#btn-save').style.display = 'block';
    document.querySelector('#created').textContent = '';
    return;
  }
  document.querySelector('#btn-save').style.display = 'none';
  if (created)
    document.querySelector(
      '#created'
    ).textContent = `Trip created on ${formatDate(new Date(created))}`;
}

function renderTrips(trips) {
  const container = new DocumentFragment();
  for (const trip of trips) {
    const item = document.createElement('div');
    item.classList.add('piece', 'list-item');
    const start = new Date(trip.start);
    const end = new Date(trip.end);
    item.innerHTML = `    
      <div class="heading">
        <h3 id="trp-${trip.id}">${getNights(end, start)} in ${
      trip.city.name
    }        
        </h3>
        <span id="del-${trip.id}" class="icon-btn fas fa-trash"></span>
      </div>
      <span class="subtitle">Starting ${getCountdown(start)}</span>
      <p class="body">
        
        From ${formatDate(start)} to ${formatDate(end)}
      </p>
      <p class="bottom subtitle">
        Created on ${formatDate(new Date(trip.id))}
      </p>`;
    container.appendChild(item);
    item
      .querySelector(`#trp-${trip.id}`)
      .addEventListener('click', () => setTrip(trip));
    item
      .querySelector(`#del-${trip.id}`)
      .addEventListener('click', () => removeTrip(trip.id));
  }
  document.querySelector('#travel-grid').replaceChildren(container);
}

function setDisplayResult(result) {
  console.log('hide: ', result);
  if (result) {
    document.querySelector('#result-section .grid').classList.remove('hide');
    document.querySelector('#result-section .bottom').classList.remove('hide');
    document.querySelector('#result-section .no-trip').classList.add('hide');
  } else {
    document.querySelector('#result-section .grid').classList.add('hide');
    document.querySelector('#result-section .bottom').classList.add('hide');
    document.querySelector('#result-section .no-trip').classList.remove('hide');
  }
}

function scrollToResult() {
  window.scrollTo({
    top:
      document.querySelector('#result-section').getBoundingClientRect().top +
      window.pageYOffset,
    behavior: 'smooth',
  });
}

export {
  setDateInputs,
  setCityDetails,
  setWeather,
  setHistoricWeather,
  setCityPicture,
  setCountdown,
  setNights,
  setStay,
  showBottom,
  renderTrips,
  setDisplayResult,
  scrollToResult,
};
