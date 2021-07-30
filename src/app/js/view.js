/* Function to make an info string, containing the place, temperature and main-weather */
const createInfo = (weather) => {
  // convert from kelvin to celsius
  const tempC = Math.round(weather.main.temp - 273.15);
  const info = `${weather.name}, ${tempC}°C, ${weather.weather[0].main}`;
  return info;
};

/* DOM Manipulation */
const writeRecentEntry = (entry) => {
  document.querySelector('#date').innerHTML = new Date(
    entry.date
  ).toUTCString();
  document.querySelector('#temp').innerHTML = entry.info;
  document.querySelector('#content').innerHTML = entry.content;
};

function setDateInputs(start, end) {
  document.querySelector('#start').valueAsDate = start;
  document.querySelector('#end').valueAsDate = end;
}

function setCountdown(countdown) {
  document.querySelector('#new-countdown').textContent = countdown;
}

function setNights(nights) {
  document.querySelector('#new-nights').textContent = nights;
}

export { setDateInputs, createInfo, writeRecentEntry, setCountdown, setNights };
