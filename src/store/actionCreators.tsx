import * as actionTypes from './actionTypes';
import {WeatherAPI} from '../services/WeatherAPI'
import { API_KEY } from 'react-native-dotenv';
import { AxiosResponse } from 'axios'

const setWeather = (weather: Weather) => {
    const action: WeatherAction = {
        type: actionTypes.SET_WEATHER,
        weather
    }

    return (dispatch: DispatchType) => {
        dispatch(action);
    }
}

export const fetchWeather = async (coordinates: {lat: number, lon: number}) => {
    const { lat, lon } = coordinates;

    // loading

    WeatherAPI.get('/', {params: {
        lat, lon, appid: API_KEY
    }})
    .then((resp: AxiosResponse<WeatherAPIResponse>) => {
        const weather:Weather = {
            name: resp.data.name,
            main: resp.data.weather[0].main,
            temp: resp.data.main.temp,
            icon: resp.data.weather[0].icon,
            description: resp.data.weather[0].description,
        };
        
        setWeather(weather);
    })
    .catch((err) => {
        // handle error
        console.log(err);
    })

    // loading
}