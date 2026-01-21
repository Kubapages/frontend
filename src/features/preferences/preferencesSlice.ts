import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { TemperatureUnit } from '../../types'

export const STORAGE_KEY = 'prognoza-pogody-react:preferences:v1'

export interface PreferencesState {
  unit: TemperatureUnit
  favorites: string[]
}

function loadInitialState(): PreferencesState {
  const fallback: PreferencesState = { unit: 'c', favorites: [] }

  if (typeof window === 'undefined') return fallback

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return fallback

    const parsed = JSON.parse(raw) as Partial<PreferencesState>

    const unit: TemperatureUnit =
      parsed.unit === 'c' || parsed.unit === 'f' || parsed.unit === 'k' ? parsed.unit : 'c'

    const favorites = Array.isArray(parsed.favorites)
      ? parsed.favorites.filter((x): x is string => typeof x === 'string')
      : []

    return { unit, favorites }
  } catch {
    return fallback
  }
}

const initialState: PreferencesState = loadInitialState()

const preferencesSlice = createSlice({
  name: 'preferences',
  initialState,
  reducers: {
    setUnit(state, action: PayloadAction<TemperatureUnit>) {
      state.unit = action.payload
    },
    toggleFavorite(state, action: PayloadAction<string>) {
      const id = action.payload
      const idx = state.favorites.indexOf(id)
      if (idx >= 0) state.favorites.splice(idx, 1)
      else state.favorites.push(id)
    },
  },
})

export const { setUnit, toggleFavorite } = preferencesSlice.actions
export default preferencesSlice.reducer
