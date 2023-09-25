import React from 'react'
import { Box, Container } from '@mui/material'
import { Outlet, useLoaderData } from 'react-router-dom'
import TopBar from './components/TopBar'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentUser } from './redux/userSlice'
import { useTitle } from './title'

export default function App() {
  const { title } = useTitle()
  const user: any = useLoaderData()
  const dispatch = useDispatch()
  React.useEffect(() => {
    dispatch(setCurrentUser(user))
  }, [])

  return (
    <div>
      <TopBar user={user} title={title} />
      <Box sx={{ my: 4 }}>
        <Outlet />
      </Box>
    </div>
  )
}
