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

// Event listener to add function to existing HTML DOM element

/* Function called by event listener */
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
        imgObj = countryImage;
      });
    setCityPicture(imgObj.webformatURL);
  });
  showBottom(unsaved, trip.id);
  scrollToResult();
};

const refreshNights = (start, end) => {
  setNights(getNights(new Date(end), new Date(start)));
};

function initDateInput() {
  const start = new Date();
  start.setDate(start.getDate() + 1);
  const end = new Date();
  end.setDate(start.getDate() + 1);
  setDateInputs(start, end);
  refreshNights(start, end);
}

function initExistingTrips() {
  const trips = initTrips();
  if (trips && trips.length && trips.length > 0) {
    setTrip(trips[0]);
    renderTrips(trips);
  } else {
    setDisplayResult(false);
  }
}

function saveTrip() {
  setTrip(saveTripinModel());
  renderTrips(getTrips());
}

function clearTrips() {
  renderTrips(clearTripsinModel());
  setDisplayResult(false);
}

function removeTrip(trip) {
  renderTrips(deleteTrip(trip));
  if (getTrips.length > 0) {
    setTrip(getTrips[0]);
  } else {
    setDisplayResult(false);
  }
}

// Protocol Functions
const log = (message) => {
  console.log(`${new Date().toISOString()} - App Log:`);
  console.log(message);
};

// adding click event listener to generate button

export {
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
