import { Box, Typography } from '@mui/material'
import React from 'react'
import { useLoaderData } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { getTotal } from '../api/user'
import { useTitle } from '../title'

export default function Home() {
  const { total } = useLoaderData()
  const user = useSelector((state) => state.user.currentUser)
  const { setTitle } = useTitle()

  React.useEffect(() => {
    setTitle('Home')
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
