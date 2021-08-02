import {
  getCity,
  getWeather,
  getHistoricWeather,
  getData,
  postContent,
} from './middleware.js';
import {
  createInfo,
  writeRecentEntry,
  setCountdown,
  setNights,
  setDateInputs,
  setWeather,
  setHistoricWeather,
} from './view.js';
import { getCountdown, getNights } from './model.js';

// Event listener to add function to existing HTML DOM element

/* Function called by event listener */
const search = (cityString, start, end) => {
  const year = new Date().getFullYear();
  const diff = new Date(end).getFullYear() - new Date(start).getFullYear();
  start = new Date(new Date(start).setFullYear(year - diff - 1))
    .toISOString()
    .slice(0, 10);
  end = new Date(new Date(end).setFullYear(year - 1))
    .toISOString()
    .slice(0, 10);
  getCity(cityString)
    .then((city) => {
      if (city) {
        getWeather(city.lat, city.lng).then((weather) => setWeather(weather));
        getHistoricWeather(city.lat, city.lng, start, end).then(
          (historicWeather) => setHistoricWeather(historicWeather)
        );
      } else {
        alert(
          `Could not find a city, which is starts with the given string: ${cityString}`
        );
      }
      /* postContent(content, createInfo(weather))
        .then(() => {
          getData().then((projectData) => {
            writeRecentEntry(projectData);
          });
        })
        .catch((postError) => {
          alert('There was an error posting your content!');
          log(postError);
          return;
        });*/
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

// Protocol Functions
const log = (message) => {
  console.log(`${new Date().toISOString()} - App Log:`);
  console.log(message);
};

// adding click event listener to generate button

export { initDateInput, refreshCountdown, refreshNights, log, search };
