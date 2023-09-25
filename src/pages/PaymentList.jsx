import React from 'react'
import AddIcon from '@mui/icons-material/Add'
import { Button, Container, Typography } from '@mui/material'
import { Link, useLoaderData, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { createPayment, getPayments } from '../api/payment'
import PaymentForm from '../components/PaymentForm'
import { setTitle } from '../redux/titleSlice'
import List from '../components/List'
import PaymentListItem from '../components/PaymentListItem'

export default function PaymentList() {
  const { list } = useLoaderData()
  const navigate = useNavigate()

  const [createOpen, setCreateOpen] = React.useState(false)

  const dispatch = useDispatch()
  React.useEffect(() => {
    dispatch(setTitle('Payments'))
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
