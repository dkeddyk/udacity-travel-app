import { getCity, getData, postContent } from './middleware.js';
import { createInfo, writeRecentEntry } from './view.js';

// Event listener to add function to existing HTML DOM element

/* Function called by event listener */
const generate = () => {
  // const zip = document.querySelector('#zip').value;
  // const content = document.querySelector('#feelings').value;
  const cityString = document.querySelector('#city').value;
  if (!cityString) {
    alert('Please enter a Zipcode');
    return;
  }
  getCity(cityString)
    .then((city) => {
      console.log(city);
      if (city) {
      } else {
        alert(
          `Could not find a city, which is starts with the given string: ${cityString}`
        );
      }
      /* postContent(content, createInfo(weather))
        .then(() => {
          getData().then((projectData) => {
            writeRecentEntry(projectData);
          });
        })
        .catch((postError) => {
          alert('There was an error posting your content!');
          log(postError);
          return;
        });*/
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
