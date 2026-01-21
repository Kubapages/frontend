export type TemperatureUnit = 'c' | 'f' | 'k'

export type WeatherCondition = 'clear' | 'clouds' | 'rain' | 'snow' | 'storm' | 'fog'

export type PrecipitationType = 'none' | 'rain' | 'snow'

export interface WeatherSnapshot {
  tempC: number
  condition: WeatherCondition

  precipitationChancePct: number
  precipitationType: PrecipitationType
  precipitationAmountMm: number

  windSpeedMps: number
  windDirection: string

  cloudinessPct: number
}

export interface DailyForecast extends WeatherSnapshot {
  dateISO: string
  tempMinC: number
  tempMaxC: number
}

export interface CityWeather {
  id: string
  name: string
  country: string
  current: WeatherSnapshot
  nextDays: DailyForecast[]
}
