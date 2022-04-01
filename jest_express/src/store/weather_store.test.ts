import { ExternalAPIFailedError } from "../model/error"
import { WeatherStore } from "./weather_store"
import config from "../config/test"

describe("fetchForecastのテスト", () => {
  test("fetchForecastが失敗したときはExternalAPIFailedErrorを投げる", async () => {
    expect.assertions(1)
    const store = new WeatherStore({ weatherAPIEndpoint: "" })
    try {
      const _ = await store.fetchForecasts(0)
    } catch (e) {
      expect(e instanceof ExternalAPIFailedError).toBe(true)
    }
  })

  test("fetchForecastが成功する", async () => {
    const store = new WeatherStore(config)
    // 福岡県・久留米の天気を取得
    const forecasts = await store.fetchForecasts(400040)
    expect(forecasts.length).toBeGreaterThanOrEqual(1)
  })
})