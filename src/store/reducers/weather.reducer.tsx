import { WeatherState } from '../types/weather.types'
import { FETCH_WEATHER_STARTED, FETCH_WEATHER_SUCCESS, FETCH_WEATHER_ERROR, WeatherActionTypes } from '../actions/weather.actions';

const initial_state: WeatherState = {
    weather: {
        name: '',
        main: '',
        icon: '',
        temp: 0,
        feels_like: 0,
        temp_max: 0,
        temp_min: 0,
        humidity: 0,
        speed: 0,
        dt: null,
        description: ''
    },
    loading: false,
    error: null
};
  
  export function WeatherReducer(state: WeatherState = initial_state, action: WeatherActionTypes): WeatherState {
    switch (action.type) {
      case FETCH_WEATHER_SUCCESS: {
        return {
          ...state,
          loading: false,
          weather: action.payload
        };
      }
      case FETCH_WEATHER_STARTED:
      return {
        ...state,
        loading: true
      };
      case FETCH_WEATHER_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error
      };
      default:
        return state
    }
  };