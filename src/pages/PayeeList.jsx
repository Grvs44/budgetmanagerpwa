import React from 'react'
import { Button, Container } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { useLoaderData, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { createPayee, getPayees } from '../api/payee'
import PayeeForm from '../components/PayeeForm'
import { setTitle } from '../redux/titleSlice'
import List from '../components/List'
import PayeeListItem from '../components/PayeeListItem'

export default function PayeeList() {
  const { list } = useLoaderData()
  const navigate = useNavigate()

  const [createOpen, setCreateOpen] = React.useState(false)

  const dispatch = useDispatch()
  React.useEffect(() => {
    dispatch(setTitle('Payees'))
  }, [])

  const onCreateSubmit = async (data) => {
    const payee = await createPayee(data)
    console.log(payee)
    return navigate(payee.id.toString())
  }

  return (
    <Container>
      <Button onClick={() => setCreateOpen(true)}><AddIcon /> New</Button>
      {list.count ? (
        <List initialList={list} onNextPage={getPayees} ItemComponent={PayeeListItem} />
      ) : (
        <p>No payees</p>
      )}
      <PayeeForm
        onClose={() => setCreateOpen(false)}
        onSubmit={onCreateSubmit}
        open={createOpen}
        title="Add payee"
      />
    </Container>
  )
}

export async function payeeListLoader({ request, params }) {
  const searchParams = new URL(request.url).searchParams
  if (params.budgetId) searchParams.set('budget', params.budgetId)
  const list = await getPayees(searchParams)
  return { list }
}
