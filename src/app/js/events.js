import {
  search,
  refreshCountdown,
  refreshNights,
  saveTrip,
  clearTrips,
} from './controller';
import { toggleSearch } from './view';

// Search Button Clicked
document.querySelector('#btn-search').addEventListener('click', () => {
  const city = document.querySelector('#city').value;
  const start = document.querySelector('#start').value;
  const end = document.querySelector('#end').value;
  if (!city) {
    alert('Please enter the destination of your travel.');
    return;
  }
  search(city, start, end);
  toggleSearch(false);
});

// Start Date Changed
document.querySelector('#start').addEventListener('change', () => {
  refreshCountdown(document.querySelector('#start').value);
  refreshNights(
    document.querySelector('#start').value,
    document.querySelector('#end').value
  );
});

// End Date Changed
document
  .querySelector('#end')
  .addEventListener('change', () =>
    refreshNights(
      document.querySelector('#start').value,
      document.querySelector('#end').value
    )
  );

// Toogle Search
document
  .querySelector('#btn-reset')
  .addEventListener('click', () => toggleSearch(true));
document.querySelector('#btn-save').addEventListener('click', () => {
  saveTrip();
  toggleSearch(true);
});

document
  .querySelector('#btn-clear-trips')
  .addEventListener('click', clearTrips);
