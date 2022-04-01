import axios, { AxiosResponse } from "axios"
import { ExternalAPIFailedError } from "../model/error"
import * as weatherForecast from "../model/weather_forecast"
import { WeatherForecastCityPayload } from "../payload/external/weather_forecast_payload"

export class WeatherStore {
  private endpoint: string

  constructor(config: {
    weatherAPIEndpoint: string
  }) {
    this.endpoint = config.weatherAPIEndpoint
  }

  async fetchForecasts(cityID: number): Promise<weatherForecast.Model[]> {
    const url = this.endpoint + `/city/${cityID}`
    let response: AxiosResponse<WeatherForecastCityPayload>
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
    return weatherForecast.mapToDomainMany(data)
  }
}