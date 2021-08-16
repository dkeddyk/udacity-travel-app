import { removeTrip, setTrip } from './controller';
import { getCountdown, getNights } from './model';

/** @type {*} The weather icons to show according to the weather code returned by the used weather api.*/
const weatherIcons = require('../assets/weatherbit/weatherbit-icons');
/**
 * App-wide standard format for dates, depending on the clients localization.
 *
 * @param {Date} d
 */
const formatDate = (d) =>
  new Intl.DateTimeFormat(navigator.language ?? 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(d);

/* DOM Manipulation */

/**
 * Sets the given dates in the date inputs of the search mask.
 *
 * @param {Date} start The start date of the trip.
 * @param {Date} end The end date of the trip.
 */
function setDateInputs(start, end) {
  document.querySelector('#start').valueAsDate = start;
  document.querySelector('#end').valueAsDate = end;
}

/**
 * Sets the countdown field in the result area.
 *
 * @param {String} countdown The string representation of the countdown.
 */
function setCountdown(countdown) {
  document.querySelector('#countdown').textContent = countdown;
}

/**
 * Sets the duration field of the search mask. Don't confound with setNights, which sets the field in the result area.
 *
 * @param {String} nights The representation of the amount of nights, the trip expands over.
 */
function setNights(nights) {
  window.document.querySelector('#duration').textContent = nights;
}

/**
 * Sets the info field containing the trip length in nights. Don't confound with setNights, which sets the field in the search area.
 *
 * @param {String} nights The representation of the amount of nights, the trip expands over.
 */
function setStay(nights) {
  document.querySelector('#stay').textContent = nights;
}

/**
 * Sets all city detail fields in the result area.
 *
 * @param {*} city The city object of the places api. Should have the following attributes: name, lng, lat, countryName and countryCode
 */
function setCityDetails(city) {
  document.querySelector('#city_name').textContent = city.name;
  document.querySelector('#lon').textContent = city.lng;
  document.querySelector('#lat').textContent = city.lat;
  document.querySelector('#country').textContent = city.countryName;
  document.querySelector('#country_code').textContent = city.countryCode;
}

/**
 * Sets the weather fields in the result area. Don't confound with the setHisoricWeather function, which only sets the historic weather fields.
 *
 * @param {*} weather The object holding the current weather. Should contain the following attributes: weather.icon, weather.description, temp, wind_spd, wind_cdir
 */
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

/**
 * Sets the historic weather fields in the result area. Don't confound with the setWeather function, which only sets the current weather fields.
 *
 * @param {*} weather The object holding the historic weather. Should contain the following attributes: min_temp, max_temp, wind_spd, clouds
 */
function setHistoricWeather(weather) {
  document.querySelector('#hist_min').textContent = weather.min_temp;
  document.querySelector('#hist_max').textContent = weather.max_temp;
  document.querySelector('#hist_clouds').textContent = weather.clouds;
  document.querySelector('#hist_spd').textContent = weather.wind_spd.toFixed(1);
}

/**
 * Sets the src attribute of the img, which then shows the location picture
 *
 * @param {*} url
 */
function setCityPicture(url) {
  document.querySelector('#image').setAttribute('src', url);
}

/**
 * Sets the display style of the save button and sets the field. which holds the creation date of the trip.
 *
 * @param {boolean} [save=false] Wether the save button shall be visible or not. Default ist false.
 * @param {*} created The representation of the creation date of the trip. Not needed, if save is true.
 * @return {*}
 */
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

/**
 * Renders the existing trips in the travel grid area
 *
 * @param {Array} trips An array of Trips. A trip contains the city object, start and end UNIX timestamp.
 */
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
      <div class="bottom">
      <a id="a-${trip.id}">Details</a>
        <span class="subtitle">
          Created on ${formatDate(new Date(trip.id))}
        </span>
      </div>`;
    container.appendChild(item);
    item
      .querySelector(`#trp-${trip.id}`)
      .addEventListener('click', () => setTrip(trip));
    item
      .querySelector(`#a-${trip.id}`)
      .addEventListener('click', () => setTrip(trip));
    item
      .querySelector(`#del-${trip.id}`)
      .addEventListener('click', () => removeTrip(trip.id));
  }
  document.querySelector('#travel-grid').replaceChildren(container);
}

/**
 * Sets the visibility of the result and search section. In a former version, this was needed, due to alternatively displaying. Currently not used, but held for further development.
 *
 * @param {boolean} result Wether the result section shall be visible. Search section is set contrary.
 */
function setDisplayResult(result) {
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

/**
 * Scrolls to the beginning of the result section.
 *
 */
function scrollToResult() {
  window.scrollTo({
    top:
      document.querySelector('#result-section').getBoundingClientRect().top +
      window.pageYOffset,
    behavior: 'smooth',
  });
}

export {
  formatDate,
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
