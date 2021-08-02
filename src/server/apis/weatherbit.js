const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../../.env') });
const currentWeatherApi = 'http://api.weatherbit.io/v2.0/current?';
const weatherbitApiKey = process.env.WEATHERBIT_KEY;
const fetch = require('node-fetch');
const log = require('../log/log');

const getCurrentWeatherFromApi = async (lat, lon) => {
  const url = `${currentWeatherApi}lat=${lat}&lon=${lon}&key=${weatherbitApiKey}`;
  log(
    `External GET from Weatherbit API: Requesting current weather for coords lat=${lat}&lon=${lon}  with ${url}.`
  );
  return Promise.resolve({
    rh: 50.8852,
    pod: 'd',
    lon: 7.4,
    pres: 995.544,
    timezone: 'Europe/Berlin',
    ob_time: '2021-07-30 09:44',
    country_code: 'DE',
    clouds: 76,
    ts: 1627638271,
    solar_rad: 484.7,
    state_code: '08',
    city_name: 'Andernach',
    wind_spd: 4.21579,
    wind_cdir_full: 'south-southwest',
    wind_cdir: 'SSW',
    slp: 1010.77,
    vis: 5,
    h_angle: -22.5,
    sunset: '19:17',
    dni: 852.64,
    dewpt: 11.7,
    snow: 0,
    uv: 3.57523,
    precip: 0,
    wind_dir: 210,
    sunrise: '03:55',
    ghi: 707.27,
    dhi: 107.68,
    aqi: 30,
    lat: 50.43,
    weather: {
      icon: 'c02d',
      code: 802,
      description: 'Scattered Clouds',
    },
    datetime: '2021-07-30:09',
    temp: 21.8,
    station: 'D8006',
    elev_angle: 45.33,
    app_temp: 21.4,
  });
  return fetch(url, {
    method: 'GET',
    mode: 'cors',
  }).then((response) => {
    log(
      'External GET from Weatherbit API: Received Response. Try to unpack JSON.'
    );
    return response
      .json()
      .then((weatherData) => {
        if (weatherData && weatherData.count > 0) {
          log('External GET from Weatherbit API: Unpacking JSON sucessful.');
          return weatherData.data[0];
        }
        throw new Error(
          'ERROR during External GET from Weatherbit API: Could not unpack or retrieve weather data from response.'
        );
      })
      .catch((error) => {
        return new Error('ERROR during External GET from Weatherbit API');
      });
  });
};

module.exports = {
  getCurrentWeatherFromApi,
};
