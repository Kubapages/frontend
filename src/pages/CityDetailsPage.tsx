import { useCallback, useMemo, useReducer } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import WeatherIcon from '../components/WeatherIcon'
import { cities } from '../data/mockWeather'
import { toggleFavorite } from '../features/preferences/preferencesSlice'
import { formatTemperature } from '../utils/temperature'

type State = { selectedDayIndex: number }

type Action = { type: 'selectDay'; index: number }

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'selectDay':
      return { ...state, selectedDayIndex: action.index }
  }
}

export default function CityDetailsPage() {
  const { cityId } = useParams()
  const dispatch = useAppDispatch()

  const unit = useAppSelector((s) => s.preferences.unit)
  const favorites = useAppSelector((s) => s.preferences.favorites)

  const city = useMemo(() => cities.find((c) => c.id === cityId), [cityId])

  const [state, uiDispatch] = useReducer(reducer, { selectedDayIndex: 0 })

  const isFavorite = city ? favorites.includes(city.id) : false

  const onToggleFavorite = useCallback(() => {
    if (!city) return
    dispatch(toggleFavorite(city.id))
  }, [dispatch, city])

  const onSelectDay = useCallback((idx: number) => {
    uiDispatch({ type: 'selectDay', index: idx })
  }, [])

  const selectedDay = city?.nextDays[state.selectedDayIndex]

  const dateFmt = useMemo(
    () =>
      new Intl.DateTimeFormat('pl-PL', {
        weekday: 'short',
        day: '2-digit',
        month: '2-digit',
      }),
    [],
  )

  if (!city) {
    return (
      <section className="card">
        <h2>Nie znaleziono miasta</h2>
        <p className="muted">Spróbuj wrócić do listy.</p>
        <Link to="/" className="btn" style={{ textDecoration: 'none', display: 'inline-block' }}>
          Wróć
        </Link>
      </section>
    )
  }

  return (
    <section className="section">
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <WeatherIcon condition={city.current.condition} size={24} />
            <h2>
              {city.name} <span className="muted">({city.country})</span>
            </h2>
          </div>

          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <button type="button" className="btn" onClick={onToggleFavorite}>
              {isFavorite ? '★ Usuń z ulubionych' : '☆ Dodaj do ulubionych'}
            </button>
            <Link to="/" className="btn" style={{ textDecoration: 'none', display: 'inline-block' }}>
              Lista
            </Link>
          </div>
        </div>
      </div>

      <div className="detailsGrid">
        <div className="card">
          <h3>Bieżące warunki</h3>
          <hr />
          <div className="forecastList">
            <div className="forecastRow">
              <WeatherIcon condition={city.current.condition} />
              <div>
                <div className="muted">Temperatura</div>
                <div style={{ fontWeight: 800, fontSize: 26 }}>{formatTemperature(city.current.tempC, unit)}</div>
              </div>
              <div className="muted" style={{ textAlign: 'right' }}>
                Zachmurzenie: {city.current.cloudinessPct}%
              </div>
            </div>

            <div className="muted">
              Opady: {city.current.precipitationChancePct}% • {city.current.precipitationType} •{' '}
              {city.current.precipitationAmountMm.toFixed(1)} mm/m²
            </div>
            <div className="muted">
              Wiatr: {city.current.windSpeedMps.toFixed(1)} m/s • kierunek: {city.current.windDirection}
            </div>
          </div>
        </div>

        <div className="card">
          <h3>Prognoza 5 dni</h3>
          <hr />

          <div className="dayButtons">
            {city.nextDays.map((d, idx) => {
              const label = dateFmt.format(new Date(d.dateISO))
              return (
                <button
                  key={d.dateISO}
                  type="button"
                  className="btn"
                  onClick={() => onSelectDay(idx)}
                  style={{
                    opacity: idx === state.selectedDayIndex ? 1 : 0.75,
                    borderColor: idx === state.selectedDayIndex ? 'rgba(255,255,255,0.35)' : undefined,
                  }}
                >
                  {label}
                </button>
              )
            })}
          </div>

          {selectedDay && (
            <div className="forecastList" style={{ marginTop: 12 }}>
              <div className="forecastRow">
                <WeatherIcon condition={selectedDay.condition} />
                <div>
                  <div className="muted">Temp. min / max</div>
                  <div style={{ fontWeight: 700 }}>
                    {formatTemperature(selectedDay.tempMinC, unit)} / {formatTemperature(selectedDay.tempMaxC, unit)}
                  </div>
                </div>
                <div className="muted" style={{ textAlign: 'right' }}>
                  Zachmurzenie: {selectedDay.cloudinessPct}%
                </div>
              </div>

              <div className="muted">
                Opady: {selectedDay.precipitationChancePct}% • {selectedDay.precipitationType} •{' '}
                {selectedDay.precipitationAmountMm.toFixed(1)} mm/m²
              </div>
              <div className="muted">
                Wiatr: {selectedDay.windSpeedMps.toFixed(1)} m/s • kierunek: {selectedDay.windDirection}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
