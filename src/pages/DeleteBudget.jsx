import React from 'react'
import { redirect } from 'react-router-dom'
import { deleteBudget } from '../api/budget'
import DeleteConfirmation from '../components/DeleteConfirmation'

export default function DeleteBudget() {
  return (
    <DeleteConfirmation message="Are you sure you want to delete this budget?" />
  )
}

export async function deleteBudgetAction({ params }) {
  await deleteBudget(params.id)
  return redirect('../..')
}
