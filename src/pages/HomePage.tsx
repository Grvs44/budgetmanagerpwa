import { useEffect } from 'react'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import { useDispatch } from 'react-redux'
import { Outlet } from 'react-router'
import LoadingBox from '../containers/LoadingBox'
import QuickAdd from '../containers/QuickAdd'
import TotalBox from '../containers/TotalBox'
import { useGetCurrentUserQuery } from '../redux/apiSlice'
import { setTitle } from '../redux/titleSlice'

export default function HomePage() {
  const { data: user, isFetching } = useGetCurrentUserQuery()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setTitle('Budget Manager'))
  }, [])

  return isFetching ? (
    <LoadingBox />
  ) : (
    <Container>
      <Typography variant="h4" component="h1">
        {'Welcome, '}
        {user ? (user?.first_name ? user.first_name : user?.username) : ''}!
      </Typography>
      <TotalBox />
      <QuickAdd />
      <Outlet />
    </Container>
  )
}
