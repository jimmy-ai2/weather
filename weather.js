const weatherCodeMap = {
  0: ["Clear Sky", "assets/sun.png"],
  1: ["Mainly Clear", "assets/sun.png"],
  2: ["Partly Cloudy", "assets/cloudy.png"],
  3: ["Overcast", "assets/overcast.png"],
  45: ["Fog", "assets/fog.png"],
  48: ["Depositing Rime Fog", "assets/fog.png"],
  51: ["Light Drizzle", "assets/rain.png"],
  53: ["Moderate Drizzle", "assets/rain.png"],
  55: ["Dense Drizzle", "assets/rain.png"],
  56: ["Light Freezing Drizzle", "assets/rain.png"],
  57: ["Dense Freezing Drizzle", "assets/rain.png"],
  61: ["Slight Rain", "assets/rain.png"],
  63: ["Moderate Rain", "assets/rain.png"],
  65: ["Heavy Rain", "assets/rain.png"],
  66: ["Light Freezing Rain", "assets/rain.png"],
  67: ["Dense Freezing Rain", "assets/rain.png"],
  71: ["Light Snow", "assets/snow.png"],
  73: ["Moderate Snow", "assets/snow.png"],
  75: ["Heavy Snow", "assets/snow.png"],
  77: ["Snow Grains", "assets/snow.png"],
  80: ["Slight Rain Showers", "assets/rain.png"],
  81: ["Moderate Rain Showers", "assets/rain.png"],
  82: ["Violent Rain Showers", "assets/rain.png"],
  85: ["Slight Snow Showers", "assets/snow.png"],
  86: ["Heavy Snow Showers", "assets/snow.png"],
  95: ["Thunderstorm", "assets/thunderstorm.png"],
  96: ["Thunderstorm With Slight Hail", "assets/thunderstorm.png"],
  99: ["Thunderstorm With Heavy Hail", "assets/thunderstorm.png"],
};

const cityInput = document.getElementById("city-input");
const searchButton = document.getElementById("search-button");
searchButton.addEventListener("click", getWeather);
cityInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    searchButton.click();
  }
});

async function getWeather() {
  const city = cityInput.value.trim();
  console.log(city);

  //   Geocoding API
  const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${city}`;
  const geoResponse = await fetch(geoUrl);
  const geoData = await geoResponse.json();
  console.log(geoData);

  const latitude = geoData.results[0].latitude;
  const longitude = geoData.results[0].longitude;
  const country = geoData.results[0].country;

  //   Weather API
  const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;
  const weatherResponse = await fetch(weatherUrl);
  const weatherData = await weatherResponse.json();
  console.log(weatherData);

  const temperature = weatherData.current_weather.temperature;
  const windSpeed = weatherData.current_weather.windspeed;
  const weatherCode = weatherData.current_weather.weathercode;
  const [weatherCondition, weatherImage] = weatherCodeMap[weatherCode];

  if (country && city != country) {
    document.getElementById("city").innerText = `${city}, ${country}`;
  } else {
    document.getElementById("city").innerText = city;
  }

  document.getElementById("weather-image").src = weatherImage;
  document.getElementById("temperature").innerText = temperature;
  document.getElementById("weather-condition").innerText = weatherCondition;
  document.getElementById("wind-speed").innerText = windSpeed;
}
