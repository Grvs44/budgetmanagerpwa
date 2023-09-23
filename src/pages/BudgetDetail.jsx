import React from 'react'
import {
  getBudget,
  getBudgetTotal,
  updateBudget,
  deleteBudget,
  canEditBudget,
} from '../api/budget'
import { Link, useLoaderData, useNavigate } from 'react-router-dom'
import { Button, ButtonGroup, Container, Typography } from '@mui/material'
import { useDispatch } from 'react-redux'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import BudgetForm from '../components/BudgetForm'
import DeleteConfirmation from '../components/DeleteConfirmation'
import { setTitle } from '../redux/titleSlice'

export default function BudgetDetail() {
  const [initialBudget, canEdit, total] = useLoaderData()
  const navigate = useNavigate()

  const [budget, setBudget] = React.useState(initialBudget)
  const [editOpen, setEditOpen] = React.useState(false)
  const [deleteOpen, setDeleteOpen] = React.useState(false)

  const dispatch = useDispatch()
  React.useEffect(() => {
    dispatch(setTitle(budget.name))
  }, [])

  const onEditSubmit = async (data) => {
    const newBudget = await updateBudget(budget.id, data)
    console.log(newBudget)
    setBudget(newBudget)
  }
  const onDeleteSubmit = async () => {
    await deleteBudget(budget.id)
    navigate(-1)
  }

  return (
    <Container>
      <Typography>Total: {total}</Typography>
      {canEdit ? (
        <ButtonGroup>
          <Button onClick={() => setEditOpen(true)}>
            <EditIcon /> Edit
          </Button>
          <Button onClick={() => setDeleteOpen(true)}>
            <DeleteIcon />
            Delete
          </Button>
        </ButtonGroup>
      ) : null}
      <Link to="payee">
        <Button>View payees</Button>
      </Link>
      <Link to="payment">
        <Button>View payments</Button>
      </Link>
      <BudgetForm
        budget={budget}
        onClose={() => setEditOpen(false)}
        onSubmit={onEditSubmit}
        open={editOpen}
        title={`Edit ${budget.name}`}
      />
      <DeleteConfirmation
        onClose={() => setDeleteOpen(false)}
        onSubmit={onDeleteSubmit}
        open={deleteOpen}
        title="Are you sure you want to delete this budget?"
      />
    </Container>
  )
}

export async function budgetDetailLoader({ params }) {
  const budget = await getBudget(params.id)
  const canEdit = await canEditBudget(params.id)
  const total = await getBudgetTotal(params.id)
  return [budget, canEdit, total]
}
