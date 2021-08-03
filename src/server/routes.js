const apis = {
  geonames: require('./apis/geonames'),
  weather: require('./apis/weatherbit').getCurrentWeatherFromApi,
  historicWeather: require('./apis/weatherbit').getHistoricWeatherFromApi,
  cityPicture: require('./apis/pixabay'),
};
const log = require('./log/log');

/**
 * Handles the root request and responds by shipping the index.html
 */
function root() {
  res.sendFile('dist/index.html');
}

/**
 * Handles a GET Request for a geoname. It is expected to be a city or village name, but can be something different as well.
 * @param {*} req Needs to have an attribute 'city' typeof String in its query.
 * @param {*} res Sends a response with either the city object or false, if no place could be found.
 * @returns
 */

function geoname(req, res) {
  log('GET /geoname: Request received. Try to extract query params.');
  let city;
  let cityPromise;
  try {
    city = req.query.city;
    log(`GET /geoname: Extracting successful. Request for ${city}`);
  } catch (error) {
    log(
      'GET /geoname: There was an error extracting the city string from the query.'
    );
    return;
  }
  log('GET /geoname: Requsting city from an external Api');
  cityPromise = apis.geonames(city);
  cityPromise
    .then((city) => {
      log('GET /geoname: Request from external Api successful');
      log(`GET /geoname: sending response (${city})`);
      if (city != null) res.send(city);
      else res.status(200).send(false);
      log('GET /geoname: response sent');
    })
    .catch((error) => {
      log(
        'GET /geoname: There was an error getting the City from the external Api'
      );
      log(error);
      return;
    });
}

function weather(req, res) {
  const { lat, lon } = req.query;

  if (lat && lon) {
    apis.weather(lat, lon).then((weatherData) => res.send(weatherData));
  } else res.status(200).send(false);
  log('GET /geoname: response sent');
  return;
}

function historicWeather(req, res) {
  const { lat, lon, start, end } = req.query;

  if (lat && lon && start && end) {
    apis
      .historicWeather(lat, lon, start, end)
      .then((weatherData) => res.send(weatherData));
  } else res.status(200).send(false);
  log('GET /geoname: response sent');
  return;
}

function cityPicture(req, res) {
  if (req.query.query) {
    apis.cityPicture(req.query.query).then((pictureData) => {
      if (pictureData) res.send(pictureData);
      else return res.status(200).send(false);
    });
  } else res.status(200).send(false);
  log('GET /picture: response sent');
  return;
}

module.exports.root = root;
module.exports.geoname = geoname;
module.exports.weather = weather;
module.exports.historicWeather = historicWeather;
module.exports.cityPicture = cityPicture;
