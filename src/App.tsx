import React from 'react'
import { Box, Container } from '@mui/material'
import { Outlet, redirect, useLoaderData } from 'react-router-dom'
import { getCurrentUser } from './api/user'
import { loginUrl } from './settings'

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

export async function appLoader() {
  try {
    const user = await getCurrentUser()
    if (user) return user
  } catch (Response) {}
  return redirect(loginUrl + location.pathname)
}
