import { useMemo } from 'react'
import { useAppSelector } from '../app/hooks'
import CityCard from '../components/CityCard'
import { cities } from '../data/mockWeather'

export default function FavoritesPage() {
  const favorites = useAppSelector((s) => s.preferences.favorites)

  const favoriteCities = useMemo(
    () => cities.filter((c) => favorites.includes(c.id)),
    [favorites],
  )

  if (favorites.length === 0) {
    return (
      <section className="card">
        <h2>Ulubione</h2>
        <p className="muted">Nie masz jeszcze żadnych ulubionych miast.</p>
      </section>
    )
  }

  return (
    <section className="section">
      <h2>Ulubione</h2>
      <div className="grid">
        {favoriteCities.map((city) => (
          <CityCard key={city.id} city={city} />
        ))}
      </div>
    </section>
  )
}
