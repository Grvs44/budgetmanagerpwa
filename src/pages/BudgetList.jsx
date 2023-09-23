import React from 'react'
import { Button, Container, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { Link, useLoaderData, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { createBudget, getBudgets } from '../api/budget'
import BudgetForm from '../components/BudgetForm'
import { setTitle } from '../redux/titleSlice'
import List from '../components/List'

export default function BudgetList() {
  const { list } = useLoaderData()
  const navigate = useNavigate()

  const [createOpen, setCreateOpen] = React.useState(false)

  const dispatch = useDispatch()
  React.useEffect(() => {
    dispatch(setTitle('Budgets'))
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
        <List initialList={list} onNextPage={getBudgets} />
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
