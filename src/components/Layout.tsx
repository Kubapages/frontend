import { type ChangeEvent, type ReactNode, useCallback, useEffect, useMemo } from 'react'
import { NavLink } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { STORAGE_KEY, setUnit } from '../features/preferences/preferencesSlice'
import type { TemperatureUnit } from '../types'

export default function Layout({ children }: { children: ReactNode }) {
  const dispatch = useAppDispatch()
  const preferences = useAppSelector((s) => s.preferences)

  const favoritesCount = preferences.favorites.length

  const options = useMemo(
    () => [
      { value: 'c' as const, label: 'Celsjusz (°C)' },
      { value: 'f' as const, label: 'Fahrenheit (°F)' },
      { value: 'k' as const, label: 'Kelvin (K)' },
    ],
    [],
  )

  const onUnitChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      dispatch(setUnit(e.target.value as TemperatureUnit))
    },
    [dispatch],
  )

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences))
    } catch {
      // ignore
    }
  }, [preferences])

  return (
    <div className="container">
      <header className="header">
        <div className="brand">
          <h1 className="brand__title">Prognoza pogody</h1>
          <span className="brand__subtitle">React + Router + Redux</span>
        </div>

        <nav className="nav">
          <NavLink to="/" end>
            Miasta
          </NavLink>
          <NavLink to="/favorites">Ulubione ({favoritesCount})</NavLink>
        </nav>

        <div className="toolbar">
          <label className="muted" htmlFor="unitSelect">
            Jednostki:
          </label>
          <select
            id="unitSelect"
            className="select"
            value={preferences.unit}
            onChange={onUnitChange}
          >
            {options.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
      </header>

      <main className="section">{children}</main>
    </div>
  )
}
