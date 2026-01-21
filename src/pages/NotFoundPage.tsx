import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <section className="card">
      <h2>404</h2>
      <p className="muted">Nie znaleziono strony.</p>
      <Link to="/" className="btn" style={{ textDecoration: 'none', display: 'inline-block' }}>
        Wróć
      </Link>
    </section>
  )
}
