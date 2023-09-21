import React from 'react'
import { Button, Container, List, ListItem, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { Link, useLoaderData, useNavigate } from 'react-router-dom'
import { createBudget, getBudgets } from '../api/budget'
import BudgetForm from '../components/BudgetForm'

export default function BudgetList() {
  const { list } = useLoaderData()
  const navigate = useNavigate()

  const [budgetList, setBudgetList] = React.useState(list.results)
  const [nextPage, setNextPage] = React.useState(list.next)
  const [createOpen, setCreateOpen] = React.useState(false)

  const onNextPageClick = async () => {
    console.log(nextPage)
    const newList = await getBudgets(nextPage)
    console.log(newList)
    setBudgetList(budgetList.concat(newList.results))
    setNextPage(newList.next)
  }

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
      {budgetList.length ? (
        <Container>
          <Typography>
            Showing {budgetList.length} of {list.count}
          </Typography>
          <List>
            {list.results.map((item) => (
              <ListItem key={item.id}>
                <Link to={item.id.toString()}>{item.name}</Link>
              </ListItem>
            ))}
          </List>
          {nextPage ? (
            <Button onClick={onNextPageClick}>Load more</Button>
          ) : null}
        </Container>
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

export async function budgetListLoader({ request }) {
  const params = new URL(request.url).searchParams
  params.delete('offset')
  const list = await getBudgets(params)
  return { list }
}
