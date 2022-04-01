import { WeatherForecast } from "../../model/weather_forecast"

export type FailurePayload = {
  error: string
}

export type SuccessPayload = {
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

export const mapToDomainMany = (payload: SuccessPayload): WeatherForecast[] => {
  return payload.forecasts.map((f) => ({
    date: f.date,
    weather: f.detail.weather
  }))
}

export type Payload = SuccessPayload | FailurePayload 