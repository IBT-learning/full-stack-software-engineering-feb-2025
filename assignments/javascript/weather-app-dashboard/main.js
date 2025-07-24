const API_KEY = "ae82d1ed376d430fa41192351251407"
const WEATHER_API = "http://api.weatherapi.com/v1";

document.addEventListener("DOMContentLoaded", () => {
    let heroIcon = document.querySelector(".left-content #icon");
    let temperature = document.querySelector(".left-content #temperature-value");
    let city = document.querySelector(".left-content #location");
    let sunriseTime = document.querySelector(".right-content #time");
    let weatherType = document.querySelector(".weather-highlight h2");
    let uvIndex = document.querySelector("#uv-index h3");
    let uvIndexLabel = document.querySelector("#uv-index .bottom-label");
    let windStatus = document.querySelector("#wind-status h3");
    let windDirection = document.querySelector("#wind-status .bottom-label");
    let sunrise = document.querySelector(".sunsetting #sunrise span");
    let sunset = document.querySelector(".sunsetting #sunset span");
    let humidity = document.querySelector("#humidity h3");
    let humidityLabel = document.querySelector("#humidity .bottom-label");
    let visibility = document.querySelector("#visibility h3");
    let visibilityLabel = document.querySelector("#visibility .bottom-label");
    let airQuality = document.querySelector("#air-quality h3");
    let airQualityLabel = document.querySelector("#air-quality .bottom-label");
    const parentElement = document.querySelector(".daily-forecast_data");
    const userInput = document.querySelector("nav input");
    const searchBtn = document.querySelector("form button");

    // submit user input
    searchBtn.addEventListener("click", (event) => {
        event.preventDefault();
        getData(userInput.value);
    })

    // clear and replace weekly forecast data based on user's input
    userInput.addEventListener("change", ()=> {
        parentElement.innerHTML = ""
    })

    async function getData(userInput) {
        try {
            // Show loading message
            let loading = true;
            let loadingText = document.querySelector("#delay-text");

            {
                loading && loadingText.classList.add("show");
            }

            // Fetch Weather Data
            let forecast = await fetch(`${WEATHER_API}/forecast.json?key=${API_KEY}&q=${userInput}&aqi=yes&days=7`);
            let forecastData = await forecast.json();

            // Fetch Sunrise and Sunset Data
            let astronomy = await fetch(`${WEATHER_API}/astronomy.json?key=${API_KEY}&q=${userInput}`);
            let astronomyData = await astronomy.json();

            const DATA = [forecastData, astronomyData];

            // Remove loading message
            loading = false;
            {
                !loading && document.querySelector("#delay-text").classList.remove("show");
            }

            // Render Data
            showData(DATA);

        } catch (err) {
            console.log(err)
        }
    }

    // Compile and Render Data
    function showData(DATA) {

        const forecastData = DATA[0];
        const astronomyData = DATA[1];

        const todayData = forecastData.current;
        const weeklyData = (forecastData.forecast.forecastday);

        const compiledData = {
            icon: todayData.condition.icon,
            temperature: todayData.temp_c,
            cityName: forecastData.location.name,
            weatherStatus: todayData.condition.text,
            uv: todayData.uv,
            windStatus: `${todayData.wind_kph}km/h`,
            windDirection: todayData.wind_dir,
            sunrise: astronomyData.astronomy.astro.sunrise,
            sunset: astronomyData.astronomy.astro.sunset,
            humidity: todayData.humidity,
            visibility: todayData.vis_km,
            airQuality: todayData.air_quality["us-epa-index"]
        }

        // HTML text content set to dynamic data
        heroIcon.setAttribute("src", compiledData.icon);
        temperature.textContent = `${compiledData.temperature}°C`;
        city.textContent = compiledData.cityName;
        sunriseTime.textContent = compiledData.sunrise;
        weatherType.textContent = compiledData.weatherStatus;
        uvIndex.textContent = compiledData.uv;
        windStatus.textContent = compiledData.windStatus;
        windDirection.textContent = compiledData.windDirection;
        sunrise.textContent = compiledData.sunrise;
        sunset.textContent = compiledData.sunset;
        humidity.textContent = `${compiledData.humidity}%`;
        visibility.textContent = `${compiledData.visibility}km`;
        airQuality.textContent = compiledData.airQuality;

        // show summary data for other days in the week
        thisWeekData(weeklyData)

        const output = {
            uv: compiledData.uv,
            humidity: compiledData.humidity,
            visibility: compiledData.visibility,
            airQuality: compiledData.airQuality
        }
        levelChecker(output);
    }

    function levelChecker({ uv, humidity, visibility, airQuality }) {

        let uvLevel;
        if (uv <= 2) {
            uvLevel = "Low"
        } else if (uv > 2 && uv <= 7) {
            uvLevel = "Moderate High"
        } else {
            uvLevel = "Very High/Extreme"
        }

        let humidityLevel;
        if (humidity <= 30) {
            humidityLevel = "Low"
        } else if (humidity > 30 && humidity <= 60) {
            humidityLevel = "Moderate"
        } else if (humidity > 60 && humidity <= 70) {
            humidityLevel = "High"
        } else {
            humidityLevel = "Very High"
        }

        let visibilityLevel;
        if (visibility <= 2) {
            visibilityLevel = "Poor"
        } else if (visibility > 2 && visibility <= 10) {
            visibilityLevel = "Low"
        } else if (visibility > 10 && visibility <= 30) {
            visibilityLevel = "Moderate"
        } else {
            visibilityLevel = "Clear"
        }

        let airQualityLevel;
        switch (airQuality) {
            case 1:
                airQualityLevel = "Good"
                break;
            case 2:
                airQualityLevel = "Moderate"
                break;
            case 3:
                airQualityLevel = "Unhealthy for sensitive group"
                break;
            case 4:
                airQualityLevel = "Unhealthy"
                break;
            case 5:
                airQualityLevel = "Very Unhealthy"
                break;
            case 6:
                airQualityLevel = "Hazardous"
                break;
            default:
                break;
        }

        uvIndexLabel.textContent = uvLevel;
        humidityLabel.textContent = humidityLevel;
        visibilityLabel.textContent = visibilityLevel;
        airQualityLabel.textContent = airQualityLevel;
    }

     //show summary data for other days in the week
    function thisWeekData(data) {
        data.map((item, index) => {
            if (index > 0) {
                const formatted_day_of_the_week = new Date(item.date).toLocaleString('en-us', { weekday: "long" })

                const li = document.createElement("li");
                li.innerHTML = `
                            <p class="day_of_the_week">${formatted_day_of_the_week}</p>
                            <img src=${item.day.condition.icon} alt="">
                            <p>${item.day.condition.text}</p>
                    `
                parentElement.appendChild(li)
            }
        })
    }




});



