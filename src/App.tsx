import React from 'react'
import { Box, Container } from '@mui/material'
import { Outlet, useLoaderData } from 'react-router-dom'
import TopBar from './components/TopBar'

export default function App() {
  const user: any = useLoaderData()

  return (
    <div>
      <TopBar user={user} />
      <Box sx={{ my: 4 }}>
        <Outlet />
      </Box>
    </div>
  )
}
