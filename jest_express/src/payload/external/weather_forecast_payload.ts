export type WeatherErrorPayload = {
  error: string
}

export type WeatherForecastCitySuccessPayload = {
  description: {
    text: string
    publicTime: string
  }
  forecasts: {
    date: string
    dateLabel: string
    chanceOfRain: {
      T00_06: string
      T06_12: string
      T12_18: string
      T18_24: string
    },
    temperature: {
      max: {
        celsius: string | null
        fahrenheit: string | null
      }
      min: {
        celsius: string | null
        fahrenheit: string | null
      }
    },
    detail: {
      weather: string
    }
  }[]
}

export type WeatherForecastCityPayload = WeatherErrorPayload | WeatherForecastCitySuccessPayload