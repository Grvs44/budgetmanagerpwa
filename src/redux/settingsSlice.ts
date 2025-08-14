import { createSlice } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'
import type { Settings, State } from './types'

const STORAGE_KEY = 'budgetmanagersettings'

const defaultSettings: Settings = {
  currency: '',
}

const getInitialState: () => Settings = () => {
  const settings = localStorage.getItem(STORAGE_KEY)
  return settings ? JSON.parse(settings) : defaultSettings
}

const saveSettings = (data: Settings) =>
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))

export const settingsSlice = createSlice({
  name: 'settings',
  initialState: getInitialState(),
  reducers: {
    setCurrency(state, action: { payload: string }) {
      state.currency = action.payload
      saveSettings(state)
    },
  },
})

export const useCurrency = () =>
  useSelector((state: State) => state.settings.currency)

export const { setCurrency } = settingsSlice.actions
export default settingsSlice.reducer
