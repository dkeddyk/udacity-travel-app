import { generate } from './js/controller';

import './styles/style.scss';

navigator.serviceWorker.getRegistrations().then(function (registrations) {
  for (let registration of registrations) {
    registration.unregister();
  }
});

document.querySelector('#generate').addEventListener('click', generate);