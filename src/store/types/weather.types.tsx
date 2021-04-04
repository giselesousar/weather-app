export interface Weather {
    name: string
    main: string
    icon: string
    temp: number
    feels_like: number
    temp_min: number
    temp_max: number
    humidity: number
    dt: Date
    description: string
    speed: number
}

export interface WeatherState {
    weather: Weather
    loading: boolean
    error: string
}

export interface WeatherAPIResponse {
    weather: [
        {
          main: string
          description: string
          icon: string
        }
      ],
    main: {
        temp: number
        feels_like: number
        temp_min: number
        temp_max: number
        humidity: number
    },
    wind: {
        speed: number
    }
    name: string,
}