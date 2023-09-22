import React from 'react'
import { Box, Container } from '@mui/material'
import { Outlet, useLoaderData } from 'react-router-dom'
import TopBar from './components/TopBar'
import { useDispatch } from 'react-redux'
import { setCurrentUser } from './redux/userSlice'

export default function App() {
  const user: any = useLoaderData()
  const dispatch = useDispatch()
  dispatch(setCurrentUser(user))

  return (
    <div>
      <TopBar user={user} />
      <Box sx={{ my: 4 }}>
        <Outlet />
      </Box>
    </div>
  )
}
