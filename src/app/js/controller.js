import {
  getCity,
  getWeather,
  getHistoricWeather,
  getPicture,
} from './middleware.js';
import {
  setCountdown,
  setNights,
  setDateInputs,
  setWeather,
  setHistoricWeather,
  setCityPicture,
  setCityDetails,
  renderTrips,
  setStay,
  showBottom,
  scrollToResult,
  setDisplayResult,
} from './view.js';
import {
  getCountdown,
  getNights,
  initTrips,
  newTrip,
  saveTrip as saveTripinModel,
  deleteTrip,
  clearTrips as clearTripsinModel,
  getTrips,
} from './model.js';

/**
 * Starts the search for the given city and, if a location like that is found, hands over the city and the start and end date of the trip, to setTrip().
 * @param {String} city The search query string, normally a city, village or different location name.
 * @param {Number} start The start date of the trip, given as a UNIX timestamp.
 * @param {Number} end The end date of the trip, given as a UNIX timestamp.
 */
const search = (city, start, end) => {
  getCity(city)
    .then((city) => {
      if (city) {
        setTrip(newTrip({ city, start, end }), true);
      } else {
        alert(
          `Could not find a city, which is starts with the given string: ${city}`
        );
      }
    })
    .catch((weatherError) => {
      alert('There was an error gathering the current weather!');
      log(weatherError);
      return;
    });
};

/**
 * Gathers all nessessary information for the given trip and let the view render the data.
 * @param {*} trip The trip object, containing the city object, start and end UNIX-timestamp.
 * @param {boolean} unsaved Tells wether the trip is already saved or a newly searched. Accordingly shows a save button or the timestamp of trip creation.
 */
const setTrip = async (trip, unsaved = false) => {
  setDisplayResult(true);
  const city = trip.city;
  setCountdown(getCountdown(new Date(trip.start)));
  setStay(getNights(new Date(trip.end), new Date(trip.start)));
  setCityDetails(city);
  getWeather(city.lat, city.lng).then((weather) => setWeather(weather));
  // Subtracting one year of the start and end date for historc weather
  const year = new Date().getFullYear();
  const diff =
    new Date(trip.end).getFullYear() - new Date(trip.start).getFullYear();
  const historicStart = new Date(
    new Date(trip.start).setFullYear(year - diff - 1)
  )
    .toISOString()
    .slice(0, 10);
  const historicEnd = new Date(new Date(trip.end).setFullYear(year - 1))
    .toISOString()
    .slice(0, 10);
  getHistoricWeather(city.lat, city.lng, historicStart, historicEnd).then(
    (historicWeather) => setHistoricWeather(historicWeather)
  );
  getPicture(city.name).then(async (imgObj) => {
    if (!imgObj)
      await getPicture(city.countryName).then((countryImage) => {
        console.log(countryImage);
        imgObj = countryImage;
      });
    setCityPicture(imgObj.webformatURL);
  });
  showBottom(unsaved, trip.id);
  scrollToResult();
};

/**
 * Requests the amount of nights by the model and lets the view set the corresponding field in the search mask.
 * @param {Number} start A UNIX timestamp, which shall be the start date of the trip.
 * @param {Number} end A UNIX timestamp, which shall be the start date of the trip.
 */
const refreshNights = (start, end) => {
  setNights(getNights(new Date(end), new Date(start)));
};

/**
 * Lets the view initialise the date inputs with the current date (as start date) and tomorrow (as end date).
 */
function initDateInput() {
  const start = new Date();
  start.setDate(start.getDate() + 1);
  const end = new Date();
  end.setDate(start.getDate() + 1);
  setDateInputs(start, end);
  refreshNights(start, end);
}

/**
 * Lets the model check for existing trips in the local storage and, if existing, lets the view render them.
 */
function initExistingTrips() {
  const trips = initTrips();
  if (trips && trips.length && trips.length > 0) {
    setTrip(trips[0]);
    renderTrips(trips);
  } else {
    setDisplayResult(false);
  }
}

/**
 * Lets the model save the current trip and updates the view accordingly.
 *
 */
function saveTrip() {
  setTrip(saveTripinModel());
  renderTrips(getTrips());
}

/**
 * Lets the model clear all saved trips and updates the view accordingly.
 *
 */
function clearTrips() {
  renderTrips(clearTripsinModel());
  setDisplayResult(false);
}

/**
 * Lets the model remove the given trip by its id and updates the view accordingly.
 *
 * @param {Number} trip The id of the trip, which shall get removed.
 */
function removeTrip(trip) {
  renderTrips(deleteTrip(trip));
  if (getTrips.length > 0) {
    setTrip(getTrips[0]);
  } else {
    setDisplayResult(false);
  }
}

/**
 * Function to initialise the controller and thus all corresponding model and view tasks.
 *
 */
function initController() {
  initDateInput();
  initExistingTrips();
}

/**
 * A shorthand for logging, esspeacially during development. Adds a timestamp to the message.
 *
 * @param {String} message The message to log.
 */
const log = (message) => {
  console.log(`${new Date().toISOString()} - App Log:`);
  console.log(message);
};

// adding click event listener to generate button

export {
  initController,
  initDateInput,
  initExistingTrips,
  refreshNights,
  log,
  search,
  saveTrip,
  removeTrip,
  clearTrips,
  setTrip,
};
