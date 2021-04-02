interface Weather {
    name: string
    main: string
    icon: string
    temp: number
    description: string
}

type WeatherState = {
    weather: Weather
}

type WeatherAction = {
    type: string,
    weather: Weather
}

type DispatchType = (args: WeatherAction) => WeatherAction;

type WeatherAPIResponse = {
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