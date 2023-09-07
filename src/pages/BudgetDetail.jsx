import React from 'react'
import { getBudget, getBudgetTotal } from '../api/budget'
import { Link, useLoaderData } from 'react-router-dom'
import { Button, ButtonGroup, Container, Typography } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'

export default function BudgetDetail() {
  const { budget, total } = useLoaderData()
  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        {budget.name}
      </Typography>
      <Typography>Total: {total}</Typography>
      <ButtonGroup>
        <Link to="edit">
          <Button>
            <EditIcon /> Edit
          </Button>
        </Link>
      </ButtonGroup>
      <Link to="payee">
        <Button>View payees</Button>
      </Link>
      <Link to="payment">
        <Button>View payments</Button>
      </Link>
    </Container>
  )
}

export async function budgetDetailLoader({ params }) {
  const budget = await getBudget(params.id)
  const total = await getBudgetTotal(params.id)
  return { budget, total }
}
