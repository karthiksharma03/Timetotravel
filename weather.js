document.addEventListener('DOMContentLoaded', function() {
    const searchBtn = document.getElementById('search-btn');
    searchBtn.addEventListener('click', function() {
      const cityInput = document.getElementById('city-input');
      const city = cityInput.value.trim();
      
      if (city !== '') {
        getWeather(city);
      }
    });
  });
  
  function getWeather(city) {
    // Replace 'YOUR_API_KEY' with your actual API key
    const apiKey = '5d885a8a0531582ff188a6c4470d8e5b';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        displayWeather(data);
      })
      .catch(error => {
        console.log('Error:', error);
      });
  }
  
  function displayWeather(weatherData) {
    const weatherCards = document.getElementById('weather-cards');
    
    // Create a new weather card
    const card = document.createElement('div');
    card.classList.add('col-md-4', 'weather-card');
    
    // Set card content
    card.innerHTML = `
      <div class="card">
        <div class="card-body">
          <h5 class="card-title text-center">${weatherData.name} <img src="https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png" alt="Weather Icon" />
          </h5>
          <div class="weather-section">
            <h6 class="section-title"><center>Temperature</center></h6>
            <p class="section-text">${Math.round(weatherData.main.temp - 273.15)}°C</p>
            <p class="section-text">Temp is: ${Math.round(weatherData.main.temp_min - 273.15)}°C - ${Math.round(weatherData.main.temp_max - 273.15)}°C</p>
            <p class="section-text">Feels like: ${Math.round(weatherData.main.feels_like - 273.15)}°C</p>
          </div>
          <div class="weather-section">
            <h6 class="section-title"><center>Humidity</center></h6>
            <p class="section-text">Humidity is: ${weatherData.main.humidity}%</p>
            <p class="section-text">Pressure is: ${weatherData.main.pressure} hPa</p>
            <p class="section-text">Sunrise at: ${new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString()}</p>
            <p class="section-text">Sunset at: ${new Date(weatherData.sys.sunset * 1000).toLocaleTimeString()}</p>
          </div>
          <div class="weather-section">
            <h6 class="section-title"><center>Wind Info</center></h6>
            <p class="section-text">Wind degrees: ${weatherData.wind.deg}°</p>
            <p class="section-text">Wind speed: ${weatherData.wind.speed} m/s</p>
          </div>
        </div>
      </div>
    `;
    
    // Append the card to the weather cards container
    weatherCards.appendChild(card);
  }
  // Weather data for countries
const countries = [
    { name: "Italy", code: "IT" },
    { name: "France", code: "FR" },
    { name: "UK", code: "GB" },
    { name: "South Africa", code: "ZA" },
    { name: "Sydney", code: "AU" },
  ];
  
  // Function to fetch and display weather for countries
  function displayCountryWeather() {
    const tableBody = document.querySelector("#country-weather tbody");
  
    countries.forEach((country) => {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${country.name}&appid=5d885a8a0531582ff188a6c4470d8e5b`;
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          const row = document.createElement("tr");
          row.innerHTML = `
            <td>${country.name}</td>
            <td>${Math.round(data.main.temp - 273.15)}°C</td>
            <td>${data.main.humidity}%</td>
            <td>${data.main.pressure} hPa</td>
            <td>${new Date(data.sys.sunrise * 1000).toLocaleTimeString()}</td>
            <td>${new Date(data.sys.sunset * 1000).toLocaleTimeString()}</td>
            <td>${data.wind.speed} m/s</td>
            <td>${data.wind.deg}°</td>
            <td>${data.weather[0].description}</td>
            <td><img src="https://openweathermap.org/img/w/${data.weather[0].icon}.png" alt="Weather Icon"></td>
          `;
          tableBody.appendChild(row);
        })
        .catch((error) => {
          console.log(`Error fetching weather data for ${country.name}: ${error}`);
        });
    });
  }
  
  // Call the function to display country weather
  displayCountryWeather();
  