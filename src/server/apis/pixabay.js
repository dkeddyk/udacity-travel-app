const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../../.env') });
const pixabayApi = 'https://pixabay.com/api/?key=' + process.env.PIXABAY_KEY;
const fetch = require('node-fetch');
const log = require('../log/log');

const getCityPictureFromApi = async (query) => {
  const url = `${pixabayApi}&q=${query}&category=places&orientation=horizontal&image_type=photo`;
  log(
    `External GET from Pixabay API: Requesting picture for query ${query} with ${url}.`
  );
  return fetch(url, {
    method: 'GET',
    mode: 'cors',
  }).then((result) => {
    log(
      'External GET from Pixabay API: Received Response. Try to unpack JSON.'
    );
    return result
      .json()
      .then((obj) => {
        log(
          'External GET from Pixabay API: Unpacking JSON sucessful. Picking first entry.'
        );
        if (obj && obj.hits.length > 0) {
          log('External GET from Pixabay API: Returning first entry.');
          return obj.hits[0];
        } else {
          log('External GET from Pixabay API: Search Array empty.');
          return null;
        }
      })
      .catch((error) => {
        return new Error('ERROR during External GET from Pixabay API');
      });
  });
};

module.exports = getCityPictureFromApi;
