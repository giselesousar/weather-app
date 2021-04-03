import { WeatherState } from '../types/weather.types'
import { FETCH_WEATHER_STARTED, FETCH_WEATHER_SUCCESS, FETCH_WEATHER_ERROR, WeatherActionTypes } from '../actions/weather.actions';

const initial_state: WeatherState = {
    weather: {
        name: '',
        main: '',
        icon: '',
        temp: 0,
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
        error: action.error
      };
      default:
        return state
    }
  };