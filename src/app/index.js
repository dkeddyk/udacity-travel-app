import { initDateInput, initExistingTrips } from './js/controller';
import './js/events';
import './styles/style.scss';

navigator.serviceWorker.getRegistrations().then(function (registrations) {
  for (let registration of registrations) {
    registration.unregister();
  }
});

initDateInput();
initExistingTrips();
