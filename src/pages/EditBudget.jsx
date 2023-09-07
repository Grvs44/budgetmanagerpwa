import React from 'react'
import BudgetForm from '../components/BudgetForm'
import { redirect, useLoaderData } from 'react-router-dom'
import { Container, Typography } from '@mui/material'
import { getBudget, updateBudget } from '../api/budget'

export default function EditBudget() {
  const { budget } = useLoaderData()
  return (
    <Container>
      <Typography>Edit</Typography>
      <BudgetForm budget={budget} />
    </Container>
  )
}

export async function editBudgetLoader({ params }) {
  const budget = await getBudget(params.id)
  return { budget }
}

export async function editBudgetAction({ params, request }) {
  const data = Object.fromEntries(await request.formData())
  const budget = await updateBudget(params.id, data)
  console.log(budget)
  return redirect('..')
}
