import React from 'react'
import { Button, Container, Typography } from '@mui/material'
import { Link, useLoaderData } from 'react-router-dom'
import { getPayments } from '../api/payment'

export default function PaymentList() {
  const { list } = useLoaderData()
  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Payees
      </Typography>
      <Link to="create">
        <Button>Create Payment</Button>
      </Link>
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
