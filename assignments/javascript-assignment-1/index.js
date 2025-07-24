const apikey = "44b3c4e765bb87329ff38db755e481da";
const weatherData = document.getElementById("weather-data");
const getIput = document.getElementById("input-city");
const formEl = document.querySelector("form");
formEl.addEventListener("submit", (event) => {
    event.preventDefault();
    const city = getIput.value;
    getWeatherData(city)
})
async function getWeatherData(city){
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`);
        if(!response.ok){
            throw new Error("Network response was not ok");
        }
        const data = await response.json();
        // console.log(data);
        const temperature = Math.round(data.main.temp);
        // console.log(temperature);
        const description = data.weather[0].description
        const icon = data.weather[0].icon
        const  details = [`Feels like: ${Math.round(data.main.feels_like)}`, `Humidity: ${data.main.humidity}%`, `Wind-Speed: ${data.wind.speed} m/s`,]
    weatherData.querySelector(".icon").innerHTML = `<img src="https://openweathermap.org/img/wn/${icon}.png" alt="Weather icon">`;
    weatherData.querySelector(".weather-temperature"). textContent = `${temperature}℃`;
    weatherData.querySelector(".weather-description"). textContent = `${description}`;
    weatherData.querySelector(".weather-details").innerHTML = details.map((detail) => `<div>${detail}</div>`).join(" ");  
    } catch (error) {
        weatherData.querySelector(".icon").innerHTML = " ";
        weatherData.querySelector(".weather-temperature"). textContent = "";
        weatherData.querySelector(".weather-description"). textContent = "An error occured, pls try again later";
        weatherData.querySelector(".weather-details").innerHTML = "";
    }
}