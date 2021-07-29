const apis = {
  getCityFromApi: require('./apis/geonames'),
};
const log = require('./log/log');

/**
 * Handles the root request and responds by shipping the index.html
 */
function root() {
  res.sendFile('dist/index.html');
}

/**
 * Handles a GET Request for a geoname. It is expected to be a city or village name, but can be something different as well.
 * @param {*} req Needs to have an attribute 'city' typeof String in its query.
 * @param {*} res Sends a response with either the city object or false, if no place could be found.
 * @returns
 */

function geoname(req, res) {
  log('GET /geoname: Request received. Try to extract query params.');
  let city;
  let cityPromise;
  try {
    city = req.query.city;
    log(`GET /geoname: Extracting successful. Request for ${city}`);
  } catch (error) {
    log(
      'GET /geoname: There was an error extracting the city string from the query.'
    );
    return;
  }
  log('GET /geoname: Requsting city from an external Api');
  cityPromise = apis.getCityFromApi(city);
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
      log(error);
      return;
    });
}

module.exports.root = root;
module.exports.geoname = geoname;
