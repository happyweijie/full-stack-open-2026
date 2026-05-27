import { useState, useEffect } from 'react';
import weatherService from '../services/weather';

const WeatherDetail = ({ country }) => {

  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    weatherService
      .getWeather(
        country.capitalInfo.latlng[0],
        country.capitalInfo.latlng[1]
      )
      .then(data => setWeatherData(data));
  }, [country]);

  const displayName = country.capital.length >= 1 
    ? country.capital[0] 
    : country.name.common;
  
  if (!weatherData) {
    return <p>Loading weather...</p>;
  }

  return (
    <div>
      <h2>
        Weather in {displayName}
      </h2>
      <p>Temperature: {weatherData.main.temp} Celsius</p>

      <img 
        src={weatherService.getIconUrl(weatherData.weather[0].icon)} 
        alt={weatherData.weather[0].description} 
      />

      <p>Wind Speed: {weatherData.wind.speed} m/s</p>
    </div>  
  );
};

export default WeatherDetail;
