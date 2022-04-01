import { WeatherForecastCitySuccessPayload } from "../payload/external/weather_forecast_payload";

export type Model = {
  date: string
  weather: string
}

export const mapToDomainMany = (payload: WeatherForecastCitySuccessPayload): WeatherForecast[] => {
  return payload.forecasts.map((f) => ({
    date: f.date,
    weather: f.detail.weather
  }))
}