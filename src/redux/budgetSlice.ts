import { createSlice } from '@reduxjs/toolkit'
import { BudgetState } from './types'

const initialState: BudgetState = {
  budgets: [],
}

export const budgetSlice = createSlice({
  name: 'budget',
  initialState,
  reducers: {
    addBudgets: (state, action) => {
      state.budgets = state.budgets.concat(action.payload)
    },
    clearBudgets: (state) => {
      state.budgets = []
    },
  },
})

export const { addBudgets, clearBudgets } = budgetSlice.actions

export default budgetSlice.reducer
