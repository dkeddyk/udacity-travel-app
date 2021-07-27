/* Function to GET Web API Data*/

/**
 * Requests the current weather from the server based on the zip and returns an object containing the weather info
 *
 * @param {String} zip Common postal-zip codes which should be handeled by Weather APIs.
 * @return {Object} representing the weather info provided by the server
 */
const getWeather = async (country, zip) =>
  fetch(`/weather?zip=${zip}&country=${country}`, {
    method: 'GET',
    mode: 'same-origin',
  }).then((response) => response.json().then((weatherObj) => weatherObj));

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

export { getWeather, getData, postContent };
