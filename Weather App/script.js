const apiKey = 'YOUR_API_KEY_HERE'; // Get this from https://openweathermap.org/api  
let isCelsius = true; // Track current temperature unit

async function getWeather() {
  const city = document.getElementById('cityInput').value.trim();
  const resultDiv = document.getElementById('weatherResult');
  const toggleBtn = document.getElementById('toggleUnit');

  if (!city) {
    resultDiv.textContent = 'Please enter a city name.';
    return;
  }

  resultDiv.innerHTML = 'Loading...';

  try {
    const units = isCelsius ? 'metric' : 'imperial';
    const unitSymbol = isCelsius ? '°C' : '°F';

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`
    );

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('City not found. Please check the spelling.');
      } else {
        throw new Error('Unable to fetch weather data. Try again later.');
      }
    }

    const data = await response.json();
    const temperature = data.main.temp;
    const condition = data.weather[0].description;
    const iconCode = data.weather[0].icon;
    const cityName = data.name;

    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

    resultDiv.innerHTML = `
      <h2>${cityName}</h2>
      <img src="${iconUrl}" alt="${condition}" />
      <p>Temperature: <span id="tempValue">${temperature}</span> ${unitSymbol}</p>
      <p>Condition: ${condition}</p>
    `;

    toggleBtn.style.display = 'inline-block';

  } catch (error) {
    resultDiv.textContent = error.message;
    toggleBtn.style.display = 'none';
  }
}


function toggleUnit() {
  isCelsius = !isCelsius;
  getWeather();
}
