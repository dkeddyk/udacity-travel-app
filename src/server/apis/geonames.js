const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../../.env') });
const geonamesAPI = 'http://api.geonames.org/searchJSON?';
const geonamesApiKey = 'username=' + process.env.GEONAMES_USERNAME;
const fetch = require('node-fetch');
const log = require('../log/log');

const getCityFromApi = async (city) => {
  const url = `${geonamesAPI}name_startsWith=${city}&${geonamesApiKey}`;
  log(
    `External GET from GeoNames API: Requesting current weather in ${city} with ${url}.`
  );
  return fetch(url, {
    method: 'GET',
    mode: 'cors',
  }).then((result) => {
    log(
      'External GET from GeoNames API: Received Response. Try to unpack JSON.'
    );
    return result
      .json()
      .then((obj) => {
        log(
          'External GET from GeoNames API: Unpacking JSON sucessful. Picking first entry.'
        );
        if (obj.geonames.length > 0) {
          return obj.geonames[0];
        } else {
          log('External GET from GeoNames API: Search Array empty.');
          return null;
        }
      })
      .catch((error) => {
        return new Error('ERROR during External GET from GeoNames API');
      });
  });
};

module.exports = getCityFromApi;
