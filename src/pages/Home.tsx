import React from 'react'
import { Box, Typography } from '@mui/material'
import { useDispatch } from 'react-redux'
import { Outlet } from 'react-router-dom'
import { useGetCurrentUserQuery, useGetTotalQuery } from '../redux/apiSlice'
import { setTitle } from '../redux/titleSlice'

export default function Home() {
  const total = useGetTotalQuery()
  const { data: user, isLoading } = useGetCurrentUserQuery()
  const dispatch = useDispatch()

  React.useEffect(() => {
    dispatch(setTitle('Budget Manager'))
  }, [])

  return (
    <Box>
      <Typography variant="h4" component="h1">
        {isLoading || !user
          ? 'Welcome'
          : 'Welcome, ' + (user.first_name ? user.first_name : user.username)}
      </Typography>
      <Typography variant="h5" component="h2" hidden={total.isLoading}>
        Total: {total.data}
      </Typography>
      <Outlet />
    </Box>
  )
}
