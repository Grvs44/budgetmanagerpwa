import React from 'react'
import { Button, Container, List, ListItem, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { Link, useLoaderData, useNavigate } from 'react-router-dom'
import { createBudget, getBudgets } from '../api/budget'
import BudgetForm from '../components/BudgetForm'

export default function BudgetList() {
  const { list } = useLoaderData()
  const navigate = useNavigate()

  const [createOpen, setCreateOpen] = React.useState(false)
  const onCreateSubmit = async (data) => {
    const budget = await createBudget(data)
    console.log(budget)
    return navigate(budget.id.toString())
  }

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Budgets
      </Typography>
      <Button onClick={() => setCreateOpen(true)}>
        <AddIcon /> New
      </Button>
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
      <BudgetForm
        onClose={() => setCreateOpen(false)}
        onSubmit={onCreateSubmit}
        open={createOpen}
        title="Add budget"
      />
    </Container>
  )
}

export async function budgetListLoader({ request, params }) {
  const list = await getBudgets(new URL(request.url).searchParams)
  return { list }
}
