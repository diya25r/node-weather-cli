// Weather CLI Applicationconst axios = require("axios");

const city = process.argv[2];

if (!city) {
  console.log("Please provide a city name.");
  process.exit(1);
}

async function getWeather(cityName) {
  try {
    const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${cityName}&count=1`;
    const geoResponse = await axios.get(geoUrl);

    if (!geoResponse.data.results) {
      console.log("City not found.");
      return;
    }

    const { latitude, longitude, name, country } =
      geoResponse.data.results[0];

    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;
    const weatherResponse = await axios.get(weatherUrl);

    const temperature =
      weatherResponse.data.current_weather.temperature;

    console.log(
      `Weather in ${name}, ${country}: ${temperature}°C`
    );
  } catch (error) {
    console.log("Error fetching weather data.");
  }
}

getWeather(city);