import React from 'react'
import { Button, Container, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { Link, useLoaderData } from 'react-router-dom'
import { getBudgets } from '../api/budget'

export default function BudgetList() {
  const { list } = useLoaderData()
  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Budgets
      </Typography>
      <Link to="new">
        <Button><AddIcon /> New</Button>
      </Link>
      {list.results.length ? (
        <ul>
          {list.results.map((item) => (
            <li key={item.id}>
              <Link to={item.id.toString()}>{item.name}</Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No budgets</p>
      )}
    </Container>
  )
}

export async function budgetListLoader({ request, params }) {
  const list = await getBudgets(new URL(request.url).searchParams)
  return { list }
}
