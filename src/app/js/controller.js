import { getWeather, getData, postContent } from './middleware.js';
import { createInfo, writeRecentEntry } from './view.js';

// Event listener to add function to existing HTML DOM element

/* Function called by event listener */
const generate = () => {
  const zip = document.querySelector('#zip').value;
  const content = document.querySelector('#feelings').value;
  const country = document.querySelector('#country').value;
  if (!zip) {
    alert('Please enter a Zipcode');
    return;
  }
  getWeather(country, zip)
    .then((weather) => {
      postContent(content, createInfo(weather))
        .then(() => {
          getData().then((projectData) => {
            writeRecentEntry(projectData);
          });
        })
        .catch((postError) => {
          alert('There was an error posting your content!');
          log(postError);
          return;
        });
    })
    .catch((weatherError) => {
      alert('There was an error gathering the current weather!');
      log(weatherError);
      return;
    });
};

// Protocol Functions
const log = (message) => {
  console.log(`${new Date().toISOString()} - App Log:`);
  console.log(message);
};

// adding click event listener to generate button

export { log, generate };
