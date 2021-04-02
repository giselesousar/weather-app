import * as actionTypes from './actionTypes';

const initialState: WeatherState = {
    weather: {
        name: '',
        main: '',
        icon: '',
        temp: '',
        description: ''
    }
}

const reducer = (
    state: WeatherState = initialState,
    action: WeatherAction
  ): WeatherState => {
    switch (action.type) {
      case actionTypes.SET_WEATHER:
        const weather: Weather = action.weather;
        return {
          ...state,
          ...weather,
        }
    }
    return state
  }
  
  export default reducer;