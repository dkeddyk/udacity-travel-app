const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../../.env') });
const pixabayApi = 'https://pixabay.com/api/?key=' + process.env.PIXABAY_KEY;
const fetch = require('node-fetch');
const log = require('../log/log');

const getCityPictureFromApi = async (query) => {
  const url = `${pixabayApi}&q=${query}&category=places&orientation=horizontal&image_type=photo`;
  return {
    id: 1515034,
    pageURL: 'https://pixabay.com/photos/landscape-bridge-evening-1515034/',
    type: 'photo',
    tags: 'landscape, bridge, evening',
    previewURL:
      'https://cdn.pixabay.com/photo/2016/07/13/17/37/landscape-1515034_150.jpg',
    previewWidth: 150,
    previewHeight: 63,
    webformatURL:
      'https://pixabay.com/get/g2cc9d3469e6cce80531225e4ee071e7cf4a6c8950a47bbf238f24df0188d4a955493fe162ed98d9343b832c8b510d4d78096397b7378e23f5f0de52adf4651ee_640.jpg',
    webformatWidth: 640,
    webformatHeight: 272,
    largeImageURL:
      'https://pixabay.com/get/g444dcf75278bcad2cee4e17f0c5eae7f7490be2d9d019d363fe287661abddec90af7c346112feb4b87beacea6383df36245bfa96ef5dc499a4526e9611c51b97_1280.jpg',
    imageWidth: 7875,
    imageHeight: 3359,
    imageSize: 7978309,
    views: 4621,
    downloads: 1884,
    collections: 24,
    likes: 26,
    comments: 6,
    user_id: 2913757,
    user: 'jamescheney82',
    userImageURL: '',
  };
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
