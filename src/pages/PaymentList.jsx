import React from 'react'
import { Button, Container, Typography } from '@mui/material'
import { Link, useLoaderData, useNavigate } from 'react-router-dom'
import { createPayment, getPayments } from '../api/payment'
import PaymentForm from '../components/PaymentForm'

export default function PaymentList() {
  const { list } = useLoaderData()
  const navigate = useNavigate()

  const [createOpen, setCreateOpen] = React.useState(false)

  const onCreateSubmit = async (data) => {
    const payment = await createPayment(data)
    console.log(payment)
    return navigate(payment.id.toString())
  }

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Payments
      </Typography>
      <Button onClick={() => setCreateOpen(true)}>Add payment</Button>
      {list.results.length ? (
        <ul>
          {list.results.map((item) => (
            <li key={item.id}>
              <Link to={`../payment/${item.id}`}>{item.amount}</Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No payments</p>
      )}
      <PaymentForm
        onClose={() => setCreateOpen(false)}
        onSubmit={onCreateSubmit}
        open={createOpen}
        title="Add payment"
      />
    </Container>
  )
}

export async function paymentListLoader({ request, params }) {
  const searchParams = new URL(request.url).searchParams
  if (params.budgetId) searchParams.set('budget', params.budgetId)
  else if (params.payeeId) searchParams.set('payee', params.payeeId)
  const list = await getPayments(searchParams)
  return { list }
}
