const API_KEY = '4240c5b659f4350d4e3050d3da3c245f';

// DOM elements
const cityInput = document.getElementById('city-input');
const getWeatherBtn = document.getElementById('get-weather-btn');
const resultSection = document.getElementById('result-hidden');
const recentCities = document.querySelector('.recent-cities');
const homeButton = document.querySelector('.logo');
const searchedLocation = document.getElementById('searched-location');
const searchedWeatherIcon = document.getElementById('searched-weather-icon');
const searchedWeatherTemperature = document.getElementById('searched-weather-temperature');
const weatherStatus = document.getElementById('weather-status');
const weatherDesc = document.getElementById('weather-desc');
const lastUpdated = document.getElementById('last-updated');
const humidity = document.getElementById('percentage');
const windSpeed = document.getElementById('wind-speed-level');
const pressure = document.getElementById('pressure-level');
const visibility = document.getElementById('visibility-level');
const uvIndex = document.getElementById('uv-index-level');
const dewPoint = document.getElementById('dew-point-temp');
const sunrise = document.getElementById('sunrise-time');
const forecastDays = document.querySelectorAll('.day');

// Initialize page state (show recent cities, hide results)
window.addEventListener('load', () => {
    recentCities.style.display = 'block';
    resultSection.style.display = 'none';
});

// Function to fetch weather data
async function fetchWeather(city) {
    try {
        // Fetch current weather
        const currentWeatherResponse = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        );
        if (!currentWeatherResponse.ok) {
            throw new Error('City not found or API error');
        }
        const currentWeatherData = await currentWeatherResponse.json();

        // Fetch 5-day forecast
        const forecastResponse = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
        );
        if (!forecastResponse.ok) {
            throw new Error('Forecast data unavailable');
        }
        const forecastData = await forecastResponse.json();

        // Update DOM with current weather
        updateCurrentWeather(currentWeatherData);

        // Update DOM with 5-day forecast
        updateForecast(forecastData);

        // Show results section, hide recent cities
        resultSection.style.display = 'block';
        recentCities.style.display = 'none';
    } catch (error) {
        alert(`Error: ${error.message}. Please check the city name and try again.`);
        console.error('Error fetching weather:', error);
    }
}

// Function to update current weather data in the DOM
function updateCurrentWeather(data) {
    // Location
    searchedLocation.textContent = `${data.name}, ${data.sys.country}`;

    // Temperature (convert Celsius to Fahrenheit)
    const tempC = data.main.temp;
    const tempF = Math.round((tempC * 9/5) + 32);
    searchedWeatherTemperature.textContent = `${tempF}ºF`;

    // Weather status and description
    const weatherMain = data.weather[0].main;
    weatherStatus.textContent = weatherMain;
    weatherDesc.textContent = `Feels like ${Math.round((data.main.feels_like * 9/5) + 32)}ºF today`;

    // Update weather icon
    updateWeatherIcon(weatherMain, searchedWeatherIcon);

    // Last updated time
    const now = new Date();
    lastUpdated.textContent = `Last updated: ${now.toLocaleTimeString()}`;

    // Other info
    humidity.textContent = `${data.main.humidity}%`;
    windSpeed.textContent = `${Math.round(data.wind.speed * 3.6)} km/h`; // Convert m/s to km/h
    pressure.textContent = `${data.main.pressure} hPa`;
    visibility.textContent = `${(data.visibility / 1609.34).toFixed(1)} mi`; // Convert meters to miles
    uvIndex.textContent = 'N/A'; // Placeholder
    dewPoint.textContent = 'N/A'; // Placeholder

    // Sunrise time
    const sunriseTime = new Date(data.sys.sunrise * 1000);
    sunrise.textContent = sunriseTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

// Function to update 5-day forecast
function updateForecast(data) {
    // Filter forecast data to get one entry per day (at 12:00)
    const dailyForecasts = data.list.filter(item => item.dt_txt.includes('12:00:00')).slice(0, 5);

    forecastDays.forEach((dayElement, index) => {
        if (dailyForecasts[index]) {
            const forecast = dailyForecasts[index];
            const date = new Date(forecast.dt * 1000);
            const dayName = index === 0 ? 'Today' : date.toLocaleDateString('en-US', { weekday: 'long' });
            const weatherMain = forecast.weather[0].main;
            const tempHighC = forecast.main.temp_max;
            const tempLowC = forecast.main.temp_min;
            const tempHighF = Math.round((tempHighC * 9/5) + 32);
            const tempLowF = Math.round((tempLowC * 9/5) + 32);

            // Update day name
            dayElement.querySelector('.body-3:not(.day-desc, .temp-1, .temp-2)').textContent = dayName;

            // Update weather description
            dayElement.querySelector('.day-desc').textContent = weatherMain;

            // Update temperatures
            dayElement.querySelector('.temp-1').textContent = `${tempHighF}º`;
            dayElement.querySelector('.temp-2').textContent = `${tempLowF}º`;

            // Update weather icon
            const iconElement = dayElement.querySelector('svg');
            updateWeatherIcon(weatherMain, iconElement);
        }
    });
}

// Function to update weather icon based on condition
function updateWeatherIcon(weatherMain, iconElement) {
    const iconMap = {
        'Clear': 'bg-sun',
        'Clouds': 'bg-cloud',
        'Rain': 'bg-rain',
        'Drizzle': 'bg-rain',
        'Thunderstorm': 'bg-rain',
        'Snow': 'bg-cloud',
        'Mist': 'bg-cloud',
        'Fog': 'bg-cloud'
    };

    // Remove existing background classes
    iconElement.parentElement.classList.remove('bg-sun', 'bg-cloud', 'bg-rain');

    // Add appropriate background class
    const bgClass = iconMap[weatherMain] || 'bg-cloud';
    iconElement.parentElement.classList.add(bgClass);
}

// Event listener for search button
getWeatherBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) {
        fetchWeather(city);
    } else {
        alert('Please enter a city name.');
    }
});

// Event listener for Enter key in the input field
cityInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        const city = cityInput.value.trim();
        if (city) {
            fetchWeather(city);
        } else {
            alert('Please enter a city name.');
        }
    }
});

// Event listener for home button (logo)
homeButton.parentElement.addEventListener('click', (event) => {
    event.preventDefault(); // Prevent navigation for single-page app behavior
    resultSection.style.display = 'none';
    recentCities.style.display = 'block';
    cityInput.value = ''; // Clear input field
});