import {
  generate,
  initDateInput,
  refreshCountdown,
  refreshNights,
} from './js/controller';
import './styles/style.scss';

navigator.serviceWorker.getRegistrations().then(function (registrations) {
  for (let registration of registrations) {
    registration.unregister();
  }
});

document.querySelector('#generate').addEventListener('click', generate);
document.querySelector('#start').addEventListener('change', () => {
  refreshCountdown(document.querySelector('#start').value);
  refreshNights(
    document.querySelector('#start').value,
    document.querySelector('#end').value
  );
});
document
  .querySelector('#end')
  .addEventListener('change', () =>
    refreshNights(
      document.querySelector('#start').value,
      document.querySelector('#end').value
    )
  );

initDateInput();
