import React from 'react'
import BudgetForm from '../components/BudgetForm'
import { redirect } from 'react-router-dom'
import { Container, Typography } from '@mui/material'
import { createBudget } from '../api/budget'

export default function CreateBudget() {
  return (
    <Container>
      <Typography>Create</Typography>
      <BudgetForm />
    </Container>
  )
}

export async function createBudgetAction({ request }) {
  const data = Object.fromEntries(await request.formData())
  const budget = await createBudget(data)
  console.log(budget)
  return redirect(`../${budget.id}`)
}
