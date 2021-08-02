import { search, refreshCountdown, refreshNights } from './controller';

// Search Button Clicked
document.querySelector('#search').addEventListener('click', () => {
  const city = document.querySelector('#city').value;
  const start = document.querySelector('#start').value;
  const end = document.querySelector('#end').value;
  if (!city) {
    alert('Please enter the destination of your travel.');
    return;
  }
  search(city, start, end);
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
