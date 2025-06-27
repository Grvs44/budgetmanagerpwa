import React from 'react'
import { Box, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import { useGetCurrentUserQuery, useGetTotalQuery } from '../redux/apiSlice'
import { setTitle } from '../redux/titleSlice'
import type { State } from '../redux/types'

export default function HomePage() {
  const total = useGetTotalQuery()
  const { data: user, isLoading } = useGetCurrentUserQuery()
  const dispatch = useDispatch()
  const settings = useSelector((state: State) => state.settings)

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
        Total: {settings.currency}
        {total.data}
      </Typography>
      <Outlet />
    </Box>
  )
}
