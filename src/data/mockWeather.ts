import type { CityWeather, DailyForecast, PrecipitationType, WeatherCondition } from '../types'

function dateISO(offsetDays: number): string {
  const d = new Date()
  d.setDate(d.getDate() + offsetDays)
  return d.toISOString().slice(0, 10)
}

function day(
  offsetDays: number,
  args: Omit<DailyForecast, 'dateISO'> & { dateISO?: never },
): DailyForecast {
  return { dateISO: dateISO(offsetDays), ...args }
}

function p(type: PrecipitationType, chance: number, amountMm: number) {
  return {
    precipitationType: type,
    precipitationChancePct: chance,
    precipitationAmountMm: amountMm,
  }
}

function w(direction: string, speedMps: number) {
  return { windDirection: direction, windSpeedMps: speedMps }
}

function c(condition: WeatherCondition, cloudinessPct: number) {
  return { condition, cloudinessPct }
}

export const cities: CityWeather[] = [
  {
    id: 'warszawa',
    name: 'Warszawa',
    country: 'PL',
    current: {
      tempC: 2.2,
      ...c('clear', 10),
      ...p('none', 5, 0),
      ...w('NE', 4.2),
    },
    nextDays: [
      day(1, {
        tempC: 1.0,
        tempMinC: -1.5,
        tempMaxC: 2.5,
        ...c('clouds', 55),
        ...p('none', 15, 0),
        ...w('E', 3.6),
      }),
      day(2, {
        tempC: 0.5,
        tempMinC: -2.0,
        tempMaxC: 1.8,
        ...c('clouds', 70),
        ...p('rain', 35, 1.2),
        ...w('SE', 4.9),
      }),
      day(3, {
        tempC: -0.2,
        tempMinC: -3.0,
        tempMaxC: 1.0,
        ...c('rain', 80),
        ...p('rain', 65, 3.4),
        ...w('S', 5.1),
      }),
      day(4, {
        tempC: -1.0,
        tempMinC: -4.0,
        tempMaxC: 0.5,
        ...c('fog', 90),
        ...p('none', 10, 0),
        ...w('SW', 2.5),
      }),
      day(5, {
        tempC: 0.8,
        tempMinC: -1.8,
        tempMaxC: 2.2,
        ...c('clear', 15),
        ...p('none', 5, 0),
        ...w('W', 3.0),
      }),
    ],
  },
  {
    id: 'krakow',
    name: 'Kraków',
    country: 'PL',
    current: {
      tempC: 1.1,
      ...c('clouds', 65),
      ...p('rain', 25, 0.4),
      ...w('NW', 3.1),
    },
    nextDays: [
      day(1, {
        tempC: 0.4,
        tempMinC: -1.2,
        tempMaxC: 2.0,
        ...c('clouds', 75),
        ...p('none', 20, 0),
        ...w('N', 2.8),
      }),
      day(2, {
        tempC: 0.1,
        tempMinC: -2.4,
        tempMaxC: 1.2,
        ...c('snow', 85),
        ...p('snow', 60, 2.8),
        ...w('NE', 3.4),
      }),
      day(3, {
        tempC: -1.3,
        tempMinC: -4.5,
        tempMaxC: 0.2,
        ...c('snow', 90),
        ...p('snow', 70, 4.2),
        ...w('E', 4.0),
      }),
      day(4, {
        tempC: -0.6,
        tempMinC: -3.8,
        tempMaxC: 1.0,
        ...c('clouds', 60),
        ...p('none', 15, 0),
        ...w('SE', 2.7),
      }),
      day(5, {
        tempC: 1.3,
        tempMinC: -0.8,
        tempMaxC: 2.8,
        ...c('clear', 20),
        ...p('none', 5, 0),
        ...w('S', 2.2),
      }),
    ],
  },
  {
    id: 'gdansk',
    name: 'Gdańsk',
    country: 'PL',
    current: {
      tempC: 4.8,
      ...c('rain', 95),
      ...p('rain', 75, 5.6),
      ...w('W', 8.2),
    },
    nextDays: [
      day(1, {
        tempC: 5.2,
        tempMinC: 3.8,
        tempMaxC: 6.0,
        ...c('rain', 90),
        ...p('rain', 70, 4.8),
        ...w('W', 9.4),
      }),
      day(2, {
        tempC: 4.5,
        tempMinC: 3.1,
        tempMaxC: 5.5,
        ...c('clouds', 80),
        ...p('rain', 45, 1.6),
        ...w('NW', 7.9),
      }),
      day(3, {
        tempC: 3.9,
        tempMinC: 2.0,
        tempMaxC: 4.6,
        ...c('clouds', 60),
        ...p('none', 25, 0),
        ...w('N', 6.0),
      }),
      day(4, {
        tempC: 4.2,
        tempMinC: 2.8,
        tempMaxC: 5.1,
        ...c('storm', 85),
        ...p('rain', 60, 3.2),
        ...w('NE', 10.5),
      }),
      day(5, {
        tempC: 5.0,
        tempMinC: 3.2,
        tempMaxC: 6.3,
        ...c('clear', 30),
        ...p('none', 10, 0),
        ...w('E', 5.5),
      }),
    ],
  },
  {
    id: 'wroclaw',
    name: 'Wrocław',
    country: 'PL',
    current: {
      tempC: 3.0,
      ...c('storm', 70),
      ...p('rain', 55, 2.0),
      ...w('SW', 6.8),
    },
    nextDays: [
      day(1, {
        tempC: 2.6,
        tempMinC: 1.0,
        tempMaxC: 4.2,
        ...c('clouds', 65),
        ...p('rain', 35, 1.0),
        ...w('W', 6.0),
      }),
      day(2, {
        tempC: 2.0,
        tempMinC: 0.2,
        tempMaxC: 3.8,
        ...c('rain', 85),
        ...p('rain', 60, 3.6),
        ...w('NW', 7.2),
      }),
      day(3, {
        tempC: 1.2,
        tempMinC: -0.8,
        tempMaxC: 2.4,
        ...c('clouds', 55),
        ...p('none', 20, 0),
        ...w('N', 4.1),
      }),
      day(4, {
        tempC: 0.4,
        tempMinC: -1.6,
        tempMaxC: 1.5,
        ...c('fog', 92),
        ...p('none', 10, 0),
        ...w('NE', 2.1),
      }),
      day(5, {
        tempC: 1.8,
        tempMinC: -0.5,
        tempMaxC: 3.0,
        ...c('clear', 25),
        ...p('none', 5, 0),
        ...w('E', 3.0),
      }),
    ],
  },
  {
    id: 'poznan',
    name: 'Poznań',
    country: 'PL',
    current: {
      tempC: -0.8,
      ...c('snow', 85),
      ...p('snow', 50, 1.8),
      ...w('N', 4.6),
    },
    nextDays: [
      day(1, {
        tempC: -1.2,
        tempMinC: -3.5,
        tempMaxC: 0.0,
        ...c('snow', 90),
        ...p('snow', 65, 3.5),
        ...w('N', 5.2),
      }),
      day(2, {
        tempC: -0.4,
        tempMinC: -2.6,
        tempMaxC: 1.2,
        ...c('clouds', 70),
        ...p('none', 25, 0),
        ...w('NW', 4.7),
      }),
      day(3, {
        tempC: 0.3,
        tempMinC: -1.5,
        tempMaxC: 1.8,
        ...c('clouds', 60),
        ...p('rain', 35, 1.0),
        ...w('W', 5.0),
      }),
      day(4, {
        tempC: 1.1,
        tempMinC: -0.2,
        tempMaxC: 2.6,
        ...c('rain', 80),
        ...p('rain', 60, 3.0),
        ...w('SW', 6.6),
      }),
      day(5, {
        tempC: 2.0,
        tempMinC: 0.6,
        tempMaxC: 3.6,
        ...c('clear', 18),
        ...p('none', 10, 0),
        ...w('S', 3.7),
      }),
    ],
  },
]
