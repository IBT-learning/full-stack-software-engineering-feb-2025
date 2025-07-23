const apiKey = 'd0246eda64d84adcb63211519251407'; // Replace with your OpenWeatherMap API key
const searchBtn = document.getElementById('search-btn');
const cityInput = document.getElementById('city-input');
const weatherDisplay = document.getElementById('weather-display');

searchBtn.addEventListener('click', () => {
  const city = cityInput.value.trim();
  if (city) {
    fetchWeather(city);
  } else {
    weatherDisplay.innerHTML = '<p>Please enter a city name.</p>';
  }
});

async function fetchWeather(city) {
  weatherDisplay.innerHTML = '<p>Loading...</p>';

  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?q=${encodeURIComponent(city)}&key=${apiKey}&aqi=no`
    );

    if (!response.ok) {
      throw new Error('City not found');
    }

    const data = await response.json();
    displayWeather(data);
    cityInput.value = ''; // Clear input after success
  } catch (error) {
    weatherDisplay.innerHTML = `<p>Error: ${error.message}</p>`;
  }
}

function displayWeather(data) {
  const { location, current } = data;
  

  weatherDisplay.innerHTML = `
    <h2>Weather in ${location.name}</h2>
    <img src="https:${current.condition.icon}" alt="${current.condition.text}" class="weather-icon" />
    <p><strong>Temperature:</strong> ${current.temp_c} °C</p>
    <p><strong>Condition:</strong> ${current.condition.text}</p>
    <p><strong>lattitude:</strong> ${location.lat}</p>
    <p><strong>longitude:</strong> ${location.lon}</p>
    <p><strong>localtime:</strong> ${location.localtime}</p>
   
     
  `;

  // Add fade-in animation class (retrigger animation)
  weatherDisplay.style.animation = 'none';
  weatherDisplay.offsetHeight; // trigger reflow
  weatherDisplay.style.animation = null;
}