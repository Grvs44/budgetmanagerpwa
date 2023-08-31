import React from 'react'
import { Button, Container, Typography } from '@mui/material'
import { Link, useLoaderData } from 'react-router-dom'
import { getPayees } from '../api/payee'

export default function PayeeList() {
  const { list } = useLoaderData()
  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Payees
      </Typography>
      <Link to="create">
        <Button>Create Payee</Button>
      </Link>
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
    </Container>
  )
}

export async function payeeListLoader({ request, params }) {
  const searchParams = new URL(request.url).searchParams
  if (params.budgetId) searchParams.set('budget', params.budgetId)
  const list = await getPayees(searchParams)
  return { list }
}
