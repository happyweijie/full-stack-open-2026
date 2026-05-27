import axios from 'axios';

const BASE = 'https://api.openweathermap.org/data/2.5'
const API_KEY = import.meta.env.VITE_OPEN_WEATHER_API_KEY;

const getWeather = (lat, long) => {
  const url = `${BASE}/weather?lat=${lat}&lon=${long}&appid=${API_KEY}&units=metric`;
  
  return axios.get(url)
    .then(response => response.data);
};

const getIconUrl = (iconCode) => {
  return `https://openweathermap.org/payload/api/media/file/${iconCode}.png`;
}

export default { getWeather, getIconUrl };
