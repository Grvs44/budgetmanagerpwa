import React from 'react'
import { Box, Container } from '@mui/material'
import { Outlet, useLoaderData } from 'react-router-dom'

export default function App() {
  const user: any = useLoaderData()

  return (
    <Container maxWidth="sm">
      <p>Welcome, {user.username}</p>
      <Box sx={{ my: 4 }}>
        <Outlet />
      </Box>
    </Container>
  )
}
