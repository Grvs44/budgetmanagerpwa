import { configureStore } from '@reduxjs/toolkit'
import titleReducer from './titleSlice'
import userReducer from './userSlice'

export default configureStore({
  reducer: {
    title: titleReducer,
    user: userReducer,
  },
})
