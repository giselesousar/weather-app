import { AnyAction } from 'redux';
import { AxiosResponse } from 'axios'
import { Weather, WeatherAPIResponse } from '../types/weather.types';
import { WeatherAPI } from '../../services/WeatherAPI';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import {
    FETCH_WEATHER_SUCCESS,
    FETCH_WEATHER_STARTED,
    FETCH_WEATHER_ERROR,
    FetchWeatherAction,
    FetchStartedAction,
    FetchActionError
} from '../actions/weather.actions';

const setWeatherSuccess = (weather: Weather): FetchWeatherAction => {
    return { type: FETCH_WEATHER_SUCCESS, payload: weather };
}

const setWeatherLoading = (): FetchStartedAction => {
    return { type: FETCH_WEATHER_STARTED };
}

const setWeatherError = (error: string): FetchActionError => {
    return { type: FETCH_WEATHER_ERROR, error };
}

export const setWeather = (coordinates: { lat: number, lon: number }):
    ThunkAction<Promise<void>, {}, {}, AnyAction> => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>):
        Promise<void> => {
        return new Promise<void>((resolve) => {
            dispatch(setWeatherLoading());

            const { lat, lon } = coordinates;
            WeatherAPI.get('/', {
                params: {
                    lat, lon, appid: '1bf0061bf52f3c39dbd6f4ef13058389', units: 'metric'
                }
            })
                .then((resp: AxiosResponse<WeatherAPIResponse>) => {
                    const weather: Weather = {
                        name: resp.data.name,
                        main: resp.data.weather[0].main,
                        temp: resp.data.main.temp,
                        feels_like: resp.data.main.feels_like,
                        temp_min: resp.data.main.temp_min,
                        temp_max: resp.data.main.temp_max,
                        icon: resp.data.weather[0].icon,
                        description: resp.data.weather[0].description,
                        dt: new Date(),
                        humidity: resp.data.main.humidity,
                        speed: resp.data.wind.speed,
                    };
                    dispatch(setWeatherSuccess(weather));
                    resolve();
                })
                .catch((err: Error) => {
                    dispatch(setWeatherError(err.message))
                })
        })
    }

}