// Initialising MVC code
import { initController } from './js/controller';

// Event Handlers
import './js/events';

// Style Sheet
import './styles/style.scss';

// Needed in .scss for as backgrouund-image
import NoTrip from './assets/no-trip.jpg';

initController();

/* Only during development */
// Deleting all Service Workers
navigator.serviceWorker.getRegistrations().then(function (registrations) {
  for (let registration of registrations) {
    registration.unregister();
  }
});
