import React from 'react'
import { useLoaderData, useNavigate } from 'react-router-dom'
import { Button, ButtonGroup, Container, Typography } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import DeleteConfirmation from '../components/DeleteConfirmation'
import { deletePayment, getPayment, updatePayment } from '../api/payment'
import PaymentForm from '../components/PaymentForm'

export default function BudgetDetail() {
  const [initialPayment] = useLoaderData()
  const navigate = useNavigate()

  const [payment, setPayment] = React.useState(initialPayment)
  const [editOpen, setEditOpen] = React.useState(false)
  const [deleteOpen, setDeleteOpen] = React.useState(false)

  const onEditSubmit = async (data) => {
    const newPayment = await updatePayment(payment.id, data)
    console.log(newPayment)
    setPayment(newPayment)
  }
  const onDeleteSubmit = async () => {
    await deletePayment(payment.id)
    navigate(-1)
  }

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        {payment.notes}
      </Typography>
      <ButtonGroup>
        <Button onClick={() => setEditOpen(true)}>
          <EditIcon /> Edit
        </Button>
          <Button onClick={() => setDeleteOpen(true)}>
            <DeleteIcon />
            Delete
          </Button>
      </ButtonGroup>
      <PaymentForm
        payment={payment}
        onClose={() => setEditOpen(false)}
        onSubmit={onEditSubmit}
        open={editOpen}
        title={`Edit ${payment.name}`}
      />
      <DeleteConfirmation
        onClose={() => setDeleteOpen(false)}
        onSubmit={onDeleteSubmit}
        open={deleteOpen}
        title="Are you sure you want to delete this payment?"
      />
    </Container>
  )
}

export async function paymentDetailLoader({ params }) {
  const payment = await getPayment(params.id)
  return [payment]
}
