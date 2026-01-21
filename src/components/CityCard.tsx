import { type MouseEvent, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { toggleFavorite } from '../features/preferences/preferencesSlice'
import type { CityWeather } from '../types'
import { formatTemperature } from '../utils/temperature'
import WeatherIcon from './WeatherIcon'

export default function CityCard({ city }: { city: CityWeather }) {
  const dispatch = useAppDispatch()
  const unit = useAppSelector((s) => s.preferences.unit)
  const favorites = useAppSelector((s) => s.preferences.favorites)

  const isFavorite = favorites.includes(city.id)

  const onToggleFavorite = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault()
      e.stopPropagation()
      dispatch(toggleFavorite(city.id))
    },
    [dispatch, city.id],
  )

  return (
    <Link to={`/city/${city.id}`} style={{ textDecoration: 'none' }}>
      <article className="card">
        <div className="card__row">
          <div className="card__title">
            <WeatherIcon condition={city.current.condition} />
            <span>
              {city.name} <span className="muted">({city.country})</span>
            </span>
          </div>

          <button
            type="button"
            className="btn btn--icon"
            aria-label={isFavorite ? 'Usuń z ulubionych' : 'Dodaj do ulubionych'}
            onClick={onToggleFavorite}
            title={isFavorite ? 'Ulubione' : 'Dodaj do ulubionych'}
          >
            {isFavorite ? '★' : '☆'}
          </button>
        </div>

        <div className="card__row" style={{ marginTop: 10, alignItems: 'center' }}>
          <div>
            <div className="muted">Bieżąca temp.</div>
            <div style={{ fontSize: 22, fontWeight: 700 }}>{formatTemperature(city.current.tempC, unit)}</div>
          </div>
          <div className="muted" style={{ textAlign: 'right' }}>
            <div>Zachmurzenie: {city.current.cloudinessPct}%</div>
            <div>
              Wiatr: {city.current.windSpeedMps.toFixed(1)} m/s {city.current.windDirection}
            </div>
          </div>
        </div>
      </article>
    </Link>
  )
}
