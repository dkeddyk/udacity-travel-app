const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../../.env') });
const currentWeatherApi = 'http://api.weatherbit.io/v2.0/current?';
const historicWeatherApi = 'https://api.weatherbit.io/v2.0/history/daily?';
const weatherbitApiKey = process.env.WEATHERBIT_KEY;
const fetch = require('node-fetch');
const log = require('../log/log');

const getCurrentWeatherFromApi = async (lat, lon) => {
  const url = `${currentWeatherApi}lat=${lat}&lon=${lon}&key=${weatherbitApiKey}`;
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
  log(
    `External GET from Weatherbit API: Requesting current weather for coords lat=${lat}&lon=${lon}  with ${url}.`
  );
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

const getHistoricWeatherFromApi = async (lat, lon, start, end) => {
  const url = `${historicWeatherApi}lat=${lat}&lon=${lon}&start_date=${start}&end_date=${end}&key=${weatherbitApiKey}`;
  log(
    `External GET from Weatherbit API: Requesting current weather for coords lat=${lat}, lon=${lon}, start_date=${start}, end_date=${end} with ${url}.`
  );
  return Promise.resolve({
    rh: 70.2,
    wind_spd: 3.8,
    slp: 1022,
    max_wind_spd: 6.7,
    max_wind_dir: 220,
    max_wind_spd_ts: 1483232400,
    wind_gust_spd: 12.7,
    min_temp_ts: 1483272000,
    max_temp_ts: 1483308000,
    dewpt: 1.8,
    snow: 0,
    snow_depth: 1.0,
    precip: 10.5,
    precip_gpm: 13.5,
    wind_dir: 189,
    max_dhi: 736.3,
    dhi: 88,
    max_temp: 10,
    pres: 1006.4,
    max_uv: 5,
    t_dhi: 2023.6,
    datetime: '2021-08-05',
    temp: 7.86,
    min_temp: 5,
    clouds: 43,
    ts: 1483228800,
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
        if (weatherData.data && weatherData.data.length > 0) {
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
  getHistoricWeatherFromApi,
};
