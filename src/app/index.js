import { initDateInput } from './js/controller';
import './js/events';
import './styles/style.scss';

navigator.serviceWorker.getRegistrations().then(function (registrations) {
  for (let registration of registrations) {
    registration.unregister();
  }
});

initDateInput();

// FOR DEBUG ONLY
document.querySelector('#search').dispatchEvent(new Event('click'));
