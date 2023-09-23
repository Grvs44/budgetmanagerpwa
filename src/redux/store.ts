import { configureStore } from '@reduxjs/toolkit'
import budgetReducer from './budgetSlice'
import titleReducer from './titleSlice'
import userReducer from './userSlice'

export default configureStore({
  reducer: {
    budget: budgetReducer,
    title: titleReducer,
    user: userReducer,
  },
})
