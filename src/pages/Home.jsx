import { Box, Typography } from '@mui/material'
import React from 'react'
import { useLoaderData } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getTotal } from '../api/user'
import { setTitle } from '../redux/titleSlice'

export default function Home() {
  const { total } = useLoaderData()
  const user = useSelector((state) => state.user.currentUser)
  const dispatch = useDispatch()
  React.useEffect(() => {
    dispatch(setTitle('Home'))
  }, [])

  return (
    <Box>
      <Typography variant="h4" component="h1">
        Welcome, {user.first_name ? user.first_name : user.username}
      </Typography>
      <Typography variant="h5" component="h2">
        Total: {total}
      </Typography>
    </Box>
  )
}

export async function homeLoader() {
  const total = await getTotal()
  return { total }
}
