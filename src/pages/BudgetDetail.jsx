import React from 'react'
import {
  getBudget,
  getBudgetTotal,
  updateBudget,
  deleteBudget,
  canEditBudget,
} from '../api/budget'
import { Link, useLoaderData, useNavigate } from 'react-router-dom'
import { Box, Button, ButtonGroup, Container, Typography } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import BudgetForm from '../components/BudgetForm'
import DeleteConfirmation from '../components/DeleteConfirmation'
import { useTitle } from '../provider'
import DetailDrawer from '../components/DetailDrawer'

export default function BudgetDetail() {
  const [initialBudget, canEdit, total] = useLoaderData()
  const navigate = useNavigate()
  const { setTitle } = useTitle()

  const [budget, setBudget] = React.useState(initialBudget)
  const [editOpen, setEditOpen] = React.useState(false)
  const [deleteOpen, setDeleteOpen] = React.useState(false)

  React.useEffect(() => {
    setTitle(budget.name)
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
    <DetailDrawer>
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
        <Box>
          <Typography>{budget.name}</Typography>
          <Typography>{budget.description}</Typography>
          <Typography>{budget.active?'active':'inactive'}</Typography>
          <Typography>Last modified at {budget.last_modified} by {budget.modified_by}</Typography>
        </Box>
        <ButtonGroup orientation="vertical">
          <Link to="payee">
            <Button>View payees</Button>
          </Link>
          <Link to="payment">
            <Button>View payments</Button>
          </Link>
        </ButtonGroup>
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
    </DetailDrawer>
  )
}

export async function budgetDetailLoader({ params }) {
  const budget = await getBudget(params.id)
  const canEdit = await canEditBudget(params.id)
  const total = await getBudgetTotal(params.id)
  return [budget, canEdit, total]
}
