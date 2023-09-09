import React from 'react'
import { Button, Container, Typography } from '@mui/material'
import { Link, useLoaderData, useNavigate } from 'react-router-dom'
import { createPayee, getPayees } from '../api/payee'
import PayeeForm from '../components/PayeeForm'

export default function PayeeList() {
  const { list } = useLoaderData()
  const navigate = useNavigate()

  const [createOpen, setCreateOpen] = React.useState(false)

  const onCreateSubmit = async (data) => {
    const payee = await createPayee(data)
    console.log(payee)
    return navigate(payee.id.toString())
  }

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Payees
      </Typography>
      <Button onClick={() => setCreateOpen(true)}>Create Payee</Button>
      {list.results.length ? (
        <ul>
          {list.results.map((item) => (
            <li key={item.id}>
              <Link to={`../payee/${item.id}`}>{item.name}</Link>
            </li>
          ))}
        </ul>
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
