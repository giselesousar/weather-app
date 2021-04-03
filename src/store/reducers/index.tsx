import { combineReducers } from 'redux';
import { WeatherState } from '../types/weather.types';
import { WeatherReducer } from './weather.reducer';

export interface RootState {
  weather: WeatherState
}
export const rootReducer = combineReducers<RootState>({
  weather: WeatherReducer,
});
