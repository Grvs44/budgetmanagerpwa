import React from 'react'
import { Button, Container } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { useLoaderData, useNavigate } from 'react-router-dom'
import { createBudget, getBudgets } from '../api/budget'
import BudgetForm from '../components/BudgetForm'
import List from '../components/List'
import BudgetListItem from '../components/BudgetListItem'
import { useTitle } from '../provider'

export default function BudgetList() {
  const { list } = useLoaderData()
  const navigate = useNavigate()
  const { setTitle } = useTitle()

  const [createOpen, setCreateOpen] = React.useState(false)

  React.useEffect(() => {
    setTitle('Budgets')
  }, [])

  const onCreateSubmit = async (data) => {
    const budget = await createBudget(data)
    console.log(budget)
    return navigate(budget.id.toString())
  }

  return (
    <Container>
      <Button onClick={() => setCreateOpen(true)}>
        <AddIcon /> New
      </Button>
      {list.count ? (
        <List
          initialList={list}
          onNextPage={getBudgets}
          ItemComponent={BudgetListItem}
        />
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
