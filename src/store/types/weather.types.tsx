export interface Weather {
    name: string
    main: string
    icon: string
    temp: number
    feels_like: number
    temp_min: number
    temp_max: number
    dt: Date
    description: string
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
    },
    name: string,
}