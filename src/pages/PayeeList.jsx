import React from 'react'
import { Button, Container } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { Outlet, useLoaderData, useNavigate } from 'react-router-dom'
import { createPayee, getPayees } from '../api/payee'
import PayeeForm from '../components/PayeeForm'
import List from '../components/List'
import PayeeListItem from '../components/PayeeListItem'
import { useTitle } from '../context/provider'

export default function PayeeList() {
  const { list } = useLoaderData()
  const navigate = useNavigate()
  const { setTitle } = useTitle()

  const [createOpen, setCreateOpen] = React.useState(false)

  React.useEffect(() => {
    setTitle('Payees')
  }, [])

  const onCreateSubmit = async (data) => {
    const payee = await createPayee(data)
    console.log(payee)
    return navigate(payee.id.toString())
  }

  return (
    <Container>
      <Button onClick={() => setCreateOpen(true)}>
        <AddIcon /> New
      </Button>
      {list.count ? (
        <List
          initialList={list}
          onNextPage={getPayees}
          ItemComponent={PayeeListItem}
        />
      ) : (
        <p>No payees</p>
      )}
      <PayeeForm
        onClose={() => setCreateOpen(false)}
        onSubmit={onCreateSubmit}
        open={createOpen}
        title="Add payee"
      />
      <Outlet />
    </Container>
  )
}

export async function payeeListLoader({ request, params }) {
  const searchParams = new URL(request.url).searchParams
  if (params.budgetId) searchParams.set('budget', params.budgetId)
  const list = await getPayees(searchParams)
  return { list }
}
