const apiKey = 'f00c38e0279b7bc85480c3fe775d518c'; 
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';
const searchButton = document.getElementById('search-button');
const cityInput = document.getElementById('city-input');
const weatherDetails = document.getElementById('weather-details');
const toggleTempButton = document.getElementById('toggle-temp');
let isCelsius = true;
let currentTemperature = null;
searchButton.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) {
        fetchWeather(city);
    } else {
        alert('Please enter a city name.');
    }
});
toggleTempButton.addEventListener('click', () => {
    if (currentTemperature !== null) {
        isCelsius = !isCelsius;
        displayTemperature();
    }
});
function fetchWeather(city) {
    const url = `${apiUrl}?q=${city}&appid=${apiKey}&units=metric`;
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found');
            }
            return response.json();
        })
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            weatherDetails.innerHTML = `<p>${error.message}</p>`;
        });
}
function displayWeather(data) {
    const { name } = data;
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    const { description, icon } = data.weather[0];
    currentTemperature = temp;
    weatherDetails.innerHTML = `<h2>${name}</h2>
        <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${description}">
        <p id="temperature"></p>
        <p>${description}</p>
        <p>Humidity: ${humidity}%</p>
        <p>Wind Speed: ${speed} m/s</p>`;
    displayTemperature();
}
function displayTemperature() {
    const temperatureElement = document.getElementById('temperature');
    if (isCelsius) {
        temperatureElement.textContent = `Temperature: ${currentTemperature.toFixed(1)}°C`;
        toggleTempButton.textContent = 'Show in Fahrenheit';
    } else {
        const tempFahrenheit = (currentTemperature * 9/5) + 32;
        temperatureElement.textContent = `Temperature: ${tempFahrenheit.toFixed(1)}°F`;
        toggleTempButton.textContent = 'Show in Celsius';
    }
}