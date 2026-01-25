import axios from 'axios'

const api_key = import.meta.env.VITE_WEATHER_API_KEY;

const baseUrl = 'https://api.openweathermap.org/data/2.5'


const getWeather = (lat, long) => {
    const request = axios.get(`${baseUrl}/weather?lat=${lat}&lon=${long}&appid=${api_key}`);
    return request.then(response => response.data)

}

export default {getWeather}