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