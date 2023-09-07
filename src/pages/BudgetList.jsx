import React from 'react'
import { Button, Container, List, ListItem, Typography } from '@mui/material'
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
        <List>
          {list.results.map((item) => (
            <ListItem key={item.id}>
              <Link to={item.id.toString()}>{item.name}</Link>
            </ListItem>
          ))}
        </List>
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
