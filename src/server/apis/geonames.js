const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../../.env') });
const geonamesApi = 'http://api.geonames.org/searchJSON?';
const geonamesApiKey = 'username=' + process.env.GEONAMES_USERNAME;
const fetch = require('node-fetch');
const log = require('../log/log');

const getCityFromApi = async (city) => {
  const url = `${geonamesApi}name_startsWith=${city}&${geonamesApiKey}`;
  return {
    adminCode1: '08',
    lng: '7.40425',
    geonameId: 2956206,
    toponymName: 'Andernach',
    countryId: '2921044',
    fcl: 'P',
    population: 29599,
    countryCode: 'DE',
    name: 'Andernach',
    fclName: 'city, village,...',
    adminCodes1: { ISO3166_2: 'RP' },
    countryName: 'Germany',
    fcodeName: 'populated place',
    adminName1: 'Rheinland-Pfalz',
    lat: '50.43109',
    fcode: 'PPL',
  };
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
