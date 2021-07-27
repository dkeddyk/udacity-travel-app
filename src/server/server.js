// OpenWeather API
const geonamesAPI = 'http://api.geonames.org/searchJSON?';
const geonamesApiKey = 'username=dkeddyk';

// Setup empty JS object to act as endpoint for all routes
projectData = {};

/**
 *  Node and Express Environment
 */
const express = require('express');
const app = express();

/**
 * Project Dependencies
 */

/* Middleware*/
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/* Cors */
const cors = require('cors');
const fetch = require('node-fetch');
app.use(cors());

/**
 * Server Configuration
 */

// Static link to Website folder
app.use(express.static('dist'));

console.log(__dirname);

// Port Setting
const port = 5000;

// Lauchning Port Listener
app.listen(port, () => log('> Server is up and running on port : ' + port));

/**
 * Functional Behavior
 */

/* Routes */

app.get('/', (req, res) => {
  res.sendFile('dist/index.html');
});

// GET Weather based on a ZIP code
app.get('/geoname', (req, res) => {
  log('GET /geoname: Request received. Try to extract query params.');
  let city;
  let cityPromise;
  try {
    city = req.query.city;
    `GET /geoname: Extracting successful. Request for ${city}`;
  } catch (error) {
    log(
      'GET /geoname: There was an error extracting the city string from the query.'
    );
    return;
  }
  log('GET /geoname: Requsting city from an external Api');
  cityPromise = getCityFromApi(city);
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
      return;
    });
});

app.get('/data', (_, res) => {
  log('GET /data: Request received. Now serving the projectData.');
  res.send(projectData);
  log('GET /data: projectData sent.');
});

// POST Feelings
app.post('/feelings/add', (req, res) => {
  log('POST /feelings/add: Request received. Analysing body.');
  const content = req.body.content;
  const info = req.body.info;
  log('POST /feelings/add: Writing projectData.');
  projectData = {
    info: info,
    content: content,
    date: Date.now(),
  };
  res.send();
  // log('POST /feelings/add: Sending response.');
  // res.send(projectData);
  // log('POST /feelings/add: Response sent.');
});

/* API Calls */

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

// Protocol Functions
const log = (message) => {
  console.log(`Server Log at ${new Date().toISOString()}:`);
  console.log(message);
  console.log('');
};
