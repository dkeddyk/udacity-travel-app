var trips = [];
var currentTrip;

/**
 * Calculates the difference between the given dates in days.
 *
 * @param {Date} second The second date of the interval.
 * @param {Date} [first=Date.now()] The first date of the interval. If not set, current date is used instead.
 * @return {Number} Returns 0 or positive values, if second is after first and thus negative values, if second is before first.
 */
function calculateDayDifference(second, first = Date.now()) {
  const dayInterval = 1000 * 60 * 60 * 24;
  const floorToDay = (d) => Math.floor(d / dayInterval) * dayInterval;
  return Math.floor((floorToDay(second) - floorToDay(first)) / dayInterval);
}

/**
 * Returns a representation if the countdown torwards the second date.
 *
 * @param {*} second The date the countdown counts torwards.
 * @param {*} [first=Date.now()] The date the countdown begins to count from. If not set, current date is used instead.
 * @return {String} Returns a 'Tomorrow', 'Today', Yesterday', 'in <difference> days' or '<difference> days ago'
 */
function getCountdown(second, first = Date.now()) {
  const days = calculateDayDifference(second, first);
  if (days == 1) return 'Tomorrow';
  if (days == 0) return 'Today';
  if (days == -1) return 'Yesterday';
  if (days > 0) return `in ${days} days`;
  return `${Math.abs(days)} days ago`;
}

/**
 * Return a representation of the nights a date interval expands over.
 *
 * @param {*} second
 * @param {*} [first=Date.now()]
 * @return {*} Return '1 Night' or <nights> Nights if second is after first and 'Back to Future' if second is before first ;-)
 */
function getNights(second, first = Date.now()) {
  const days = calculateDayDifference(second, first);
  if (days == 1) return '1 Night';
  if (days >= 0) return `${days} Nights`;
  return `Back to Future?`;
}

/**
 * Checks the local storage for saved trips and sets the trips variable accordingly.
 *
 * @return {Array} Return an array containing the trips. Is empty if no trips were found in the local storage.
 */
function initTrips() {
  const json = localStorage.getItem('trips');
  if (json) {
    trips = JSON.parse(json);
  }
  return trips;
}

/**
 * Pushes the current trip to the trips variable and stores it in the local storage.
 *
 * @return {Array} Return an array containing the trips. At least contains the momentarily saved trip.
 */
function saveTrip() {
  currentTrip.id = Date.now();
  trips.push(currentTrip);
  storeTrips();
  return currentTrip;
}

/**
 * Stores the trips variable in the local storage. Just before that trips in the trips array are sorted by the starting date and by that immediatly effects the view, if refreshed.
 *
 */
function storeTrips() {
  trips = trips.sort(function (a, b) {
    return new Date(a.start) - new Date(b.start);
  });
  localStorage.setItem('trips', JSON.stringify(trips));
}

/**
 * Sets the current trip variable or returns it, if no parameter ist handed over.
 *
 * @param {*} trip The trip, which shall replace the current trip.
 * @return {*} The current trip.
 */
function newTrip(trip) {
  if (trip) {
    currentTrip = trip;
  }
  return currentTrip;
}

/**
 * Returns the trips variable.
 *
 * @return {Array} An array containing all trips.
 */
function getTrips() {
  return trips;
}

/**
 * Deletes the trip by the given id. Updates the local storage accordingly.
 *
 * @param {Number} id The id of the trip, which shall be deleted.
 * @return {Array} The array containing all trips, after deletion is exected.
 */
function deleteTrip(id) {
  var trip = trips.find((elem) => elem.id == id);
  trips.splice(trips.indexOf(trip), 1);
  storeTrips();
  return trips;
}

/**
 * Clears the trips array, its entry in the local storage and returns the (empty) array
 *
 * @return {*} The empty array, after exection.
 */
function clearTrips() {
  trips = [];
  storeTrips();
  return trips;
}

export {
  calculateDayDifference,
  getNights,
  getCountdown,
  newTrip,
  initTrips,
  saveTrip,
  getTrips,
  deleteTrip,
  clearTrips,
};
