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
} from './view.js';
import {
  getCountdown,
  getNights,
  initTrips,
  newTrip,
  saveTrip as saveTripinModel,
  deleteTrip,
  clearTrips as clearTripsinModel,
} from './model.js';

// Event listener to add function to existing HTML DOM element

/* Function called by event listener */
const search = (city, start, end) => {
  const year = new Date().getFullYear();
  const diff = new Date(end).getFullYear() - new Date(start).getFullYear();
  start = new Date(new Date(start).setFullYear(year - diff - 1))
    .toISOString()
    .slice(0, 10);
  end = new Date(new Date(end).setFullYear(year - 1))
    .toISOString()
    .slice(0, 10);
  getCity(city)
    .then((city) => {
      if (city) {
        newTrip({ city, start, end });
        setCityDetails(city);
        getWeather(city.lat, city.lng).then((weather) => setWeather(weather));
        getHistoricWeather(city.lat, city.lng, start, end).then(
          (historicWeather) => setHistoricWeather(historicWeather)
        );
        getPicture(city.name).then(async (imgObj) => {
          if (!imgObj)
            await getPicture(city.countryName).then((countryImage) => {
              imgObj = countryImage;
            });
          setCityPicture(imgObj.webformatURL);
        });
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

const refreshCountdown = (date) => {
  setCountdown(getCountdown(new Date(date)));
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
  refreshCountdown(start);
  refreshNights(start, end);
}

function initExistingTrips() {
  const trips = initTrips();
  if (trips && trips.length && trips.length > 0) {
    renderTrips(trips);
  }
}

function saveTrip() {
  renderTrips(saveTripinModel());
}

function clearTrips() {
  renderTrips(clearTripsinModel());
}

function removeTrip(trip) {
  renderTrips(deleteTrip(trip));
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
  refreshCountdown,
  refreshNights,
  log,
  search,
  saveTrip,
  removeTrip,
  clearTrips,
};
