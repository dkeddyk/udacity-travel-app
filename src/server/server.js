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
app.use(cors());

/* Log Module */

const log = require('./log/log');

/* Api Module */

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

app.get('/', require('./routes').root);

// GET City based on the name
app.get('/geoname', require('./routes').geoname);

// GET Weather based on the coordinates
app.get('/weather/current', require('./routes').weather);

// GET Historic Weather
app.get('/weather/historic', require('./routes').historicWeather);

// GET Picture based on the search string
app.get('/picture', require('./routes').cityPicture);
