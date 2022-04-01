import axios, { AxiosResponse } from "axios"
import { ExternalAPIFailedError } from "../model/error"
import { WeatherForecast } from "../model/weather_forecast"
import * as weatherForecastCity from "../payload/external/weather_forecast_city_payload"

export class WeatherStore {
  private endpoint: string

  constructor(config: {
    weatherAPIEndpoint: string
  }) {
    this.endpoint = config.weatherAPIEndpoint
  }

  async fetchForecasts(cityID: number): Promise<WeatherForecast[]> {
    const url = this.endpoint + `/city/${cityID}`
    let response: AxiosResponse<weatherForecastCity.Payload>
    try {
      response = await axios.get(url)
    } catch (e) {
      const message = axios.isAxiosError(e) ? e.message : "何かしらのエラー"
      throw new ExternalAPIFailedError(message)
    }
    const data = response.data

    if ("error" in data) {
      throw new ExternalAPIFailedError(data.error)
    }
    return weatherForecastCity.mapToDomainMany(data)
  }
}