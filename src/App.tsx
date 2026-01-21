import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import CityDetailsPage from './pages/CityDetailsPage'
import CitiesPage from './pages/CitiesPage'
import FavoritesPage from './pages/FavoritesPage'
import NotFoundPage from './pages/NotFoundPage'
import './App.css'

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<CitiesPage />} />
        <Route path="/city/:cityId" element={<CityDetailsPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Layout>
  )
}
