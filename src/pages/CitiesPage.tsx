import { type ChangeEvent, useCallback, useMemo, useState } from 'react'
import CityCard from '../components/CityCard'
import { cities } from '../data/mockWeather'

export default function CitiesPage() {
  const [query, setQuery] = useState('')

  const onQueryChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
  }, [])

  const visibleCities = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return cities
    return cities.filter((c) => c.name.toLowerCase().includes(q))
  }, [query])

  return (
    <section className="section">
      <div className="card">
        <div className="muted">Szukaj miasta</div>
        <input
          className="search"
          value={query}
          onChange={onQueryChange}
          placeholder="np. Warszawa"
          aria-label="Szukaj miasta"
        />
      </div>

      <div className="grid">
        {visibleCities.map((city) => (
          <CityCard key={city.id} city={city} />
        ))}
      </div>

      {visibleCities.length === 0 && <div className="muted">Brak wyników dla “{query}”.</div>}
    </section>
  )
}
