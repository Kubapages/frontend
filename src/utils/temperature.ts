import type { TemperatureUnit } from '../types'

export function fromCelsius(tempC: number, unit: TemperatureUnit): number {
  switch (unit) {
    case 'c':
      return tempC
    case 'f':
      return tempC * (9 / 5) + 32
    case 'k':
      return tempC + 273.15
  }
}

export function unitLabel(unit: TemperatureUnit): string {
  switch (unit) {
    case 'c':
      return '°C'
    case 'f':
      return '°F'
    case 'k':
      return 'K'
  }
}

export function formatTemperature(tempC: number, unit: TemperatureUnit): string {
  const value = fromCelsius(tempC, unit)
  const digits = unit === 'k' ? 1 : 1
  return `${value.toFixed(digits)}${unitLabel(unit)}`
}
