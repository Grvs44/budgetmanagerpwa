import { configureStore } from '@reduxjs/toolkit'
import { apiSlice } from './apiSlice'
import installReducer from './installSlice'
import { licenseSlice } from './licenseSlice'
import settingsReducer from './settingsSlice'
import titleReducer from './titleSlice'

export default configureStore({
  reducer: {
    install: installReducer,
    title: titleReducer,
    settings: settingsReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    [licenseSlice.reducerPath]: licenseSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['install/setDeferredPrompt'],
        ignoredPaths: ['install.deferredPrompt'],
      },
    })
      .concat(apiSlice.middleware)
      .concat(licenseSlice.middleware),
})
