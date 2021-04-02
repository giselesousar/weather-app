import axios from 'axios';

export const WeatherAPI = axios.create({
    baseURL: 'https://api.openweathermap.org/data/2.5/weather'
})