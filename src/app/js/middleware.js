const host = 'http://localhost:5000';

/* Function to GET Web API Data*/

/**
 * Requests the current weather from the server based on the zip and returns an object containing the weather info
 *
 * @param {String} zip Common postal-zip codes which should be handeled by Weather APIs.
 * @return {Object} representing the weather info provided by the server
 */
const getCity = async (city) =>
  fetch(`${host}/geoname?&city=${city}`, {
    method: 'GET',
    mode: 'cors',
  }).then((response) => response.json().then((cityObj) => cityObj));

const getWeather = async (lat, lon) =>
  fetch(`${host}/weather/current?&lat=${lat}&lon=${lon}`, {
    method: 'GET',
    mode: 'cors',
  }).then((response) => response.json().then((weatherObj) => weatherObj));

const getHistoricWeather = async (lat, lon, start, end) =>
  fetch(
    `${host}/weather/historic?&lat=${lat}&lon=${lon}&start=${start}&end=${end}`,
    {
      method: 'GET',
      mode: 'cors',
    }
  ).then((response) => response.json().then((weatherObj) => weatherObj));

const getPicture = async (query) => {
  query = query.trim().replaceAll(' ', '+');
  return fetch(`${host}/picture?query=${query}`, {
    method: 'GET',
    mode: 'cors',
  }).then((response) => response.json().then((pictureObj) => pictureObj));
};

export { getCity, getWeather, getHistoricWeather, getPicture };
