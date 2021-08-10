var trips = [];
var currentTrip;

function calculateDayDifference(second, first = Date.now()) {
  const dayInterval = 1000 * 60 * 60 * 24;
  const floorToDay = (d) => Math.floor(d / dayInterval) * dayInterval;
  return Math.floor((floorToDay(second) - floorToDay(first)) / dayInterval);
}

function getCountdown(second, first = Date.now()) {
  const days = calculateDayDifference(second, first);
  if (days == 1) return 'Tomorrow';
  if (days == 0) return 'Today';
  if (days == -1) return 'Yesterday';
  if (days > 0) return `in ${days} days`;
  return `${Math.abs(days)} days ago`;
}

function getNights(second, first = Date.now()) {
  const days = calculateDayDifference(second, first);
  if (days == 1) return '1 Night';
  if (days >= 0) return `${days} Nights`;
  return `Back to Future?`;
}

function initTrips() {
  const json = localStorage.getItem('trips');
  if (json) {
    trips = JSON.parse(json);
  }
  return trips;
}

function saveTrip() {
  currentTrip.id = Date.now();
  trips.push(currentTrip);
  storeTrips();
  return trips;
}
function storeTrips() {
  localStorage.setItem('trips', JSON.stringify(trips));
}

function newTrip(trip) {
  if (trip) {
    currentTrip = trip;
  }
  return currentTrip;
}

function getTrips() {
  return trips;
}

function deleteTrip(id) {
  var trip = trips.find((elem) => elem.id == id);
  trips.splice(trips.indexOf(trip), 1);
  storeTrips();
  return trips;
}

function clearTrips() {
  trips = [];
  storeTrips();
  return trips;
}

export {
  getNights,
  getCountdown,
  newTrip,
  initTrips,
  saveTrip,
  getTrips,
  deleteTrip,
  clearTrips,
};
