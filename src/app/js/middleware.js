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

/**
 * Requests the current data from the server and returns it as an object
 *
 * @return {Object} holding the recent data provided by the server
 */
const getData = async () =>
  fetch(`/data`, {
    method: 'GET',
    mode: 'same-origin',
  }).then((response) => response.json().then((data) => data));

/* Function to POST data */

const postContent = async (content, info) =>
  fetch(`/feelings/add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    mode: 'same-origin',
    body: JSON.stringify({ content: content, info: info }),
  });

export { getCity, getWeather, getHistoricWeather, getData, postContent };
