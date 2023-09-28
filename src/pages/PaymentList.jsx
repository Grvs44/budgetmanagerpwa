import React from 'react'
import AddIcon from '@mui/icons-material/Add'
import { Button, Container } from '@mui/material'
import { Outlet, useLoaderData, useNavigate } from 'react-router-dom'
import { createPayment, getPayments } from '../api/payment'
import PaymentForm from '../components/PaymentForm'
import List from '../components/List'
import PaymentListItem from '../components/PaymentListItem'
import { useTitle } from '../context/provider'

export default function PaymentList() {
  const { list } = useLoaderData()
  const navigate = useNavigate()
  const { setTitle } = useTitle()

  const [createOpen, setCreateOpen] = React.useState(false)

  React.useEffect(() => {
    setTitle('Payments')
  }, [])

  const onCreateSubmit = async (data) => {
    const payment = await createPayment(data)
    console.log(payment)
    return navigate(payment.id.toString())
  }

  return (
    <Container>
      <Button onClick={() => setCreateOpen(true)}>
        <AddIcon /> New
      </Button>
      {list.count ? (
        <List
          initialList={list}
          onNextPage={getPayments}
          ItemComponent={PaymentListItem}
        />
      ) : (
        <p>No payments</p>
      )}
      <PaymentForm
        onClose={() => setCreateOpen(false)}
        onSubmit={onCreateSubmit}
        open={createOpen}
        title="Add payment"
      />
      <Outlet />
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
