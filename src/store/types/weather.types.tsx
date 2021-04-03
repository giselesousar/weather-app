export interface Weather {
    name: string
    main: string
    icon: string
    temp: number
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
        temp: number,
    },
    name: string,
}