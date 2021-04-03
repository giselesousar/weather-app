import { Weather } from '../types/weather.types';

export const FETCH_WEATHER_SUCCESS = "FETCH_WEATHER_SUCCESS"
export const FETCH_WEATHER_STARTED = "FETCH_WEATHER_STARTED"
export const FETCH_WEATHER_ERROR = "FETCH_WEATHER_ERROR"

export interface FetchWeatherAction {
    type: typeof FETCH_WEATHER_SUCCESS
    payload: Weather
}

export interface FetchStartedAction {
    type: typeof FETCH_WEATHER_STARTED,
}

export interface FetchActionError {
    type: typeof FETCH_WEATHER_ERROR,
    error: string
}

export type WeatherActionTypes = FetchWeatherAction | FetchStartedAction | FetchActionError;