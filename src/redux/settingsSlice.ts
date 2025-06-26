import { createSlice } from '@reduxjs/toolkit'
import type { Settings } from './types'

const STORAGE_KEY = 'budgetmanagersettings'

const defaultSettings: Settings = {
  currency: '',
}

const getInitialState: () => Settings = () => {
  const settings = localStorage.getItem(STORAGE_KEY)
  return settings ? JSON.parse(settings) : defaultSettings
}

export const settingsSlice = createSlice({
  name: 'settings',
  initialState: getInitialState(),
  reducers: {
    saveSettings: (state, action) => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(action.payload))
      return action.payload
    },
  },
})

export const { saveSettings } = settingsSlice.actions
export default settingsSlice.reducer
