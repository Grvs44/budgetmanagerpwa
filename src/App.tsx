import { useEffect } from 'react'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import BudgetDialogContainer from './containers/BudgetDialogContainer'
import TopBar from './containers/TopBar'
import LoginPage from './pages/LoginPage'
import { useGetCurrentUserQuery } from './redux/apiSlice'
import { setDeferredPrompt, setShow } from './redux/installSlice'
import type { State } from './redux/types'

export default function App() {
  const dispatch = useDispatch()
  const user = useGetCurrentUserQuery()
  const { title } = useSelector((state: State) => state.title)

  useEffect(
    () =>
      window.addEventListener('beforeinstallprompt', (event: Event) => {
        event.preventDefault()
        dispatch(setShow(true))
        dispatch(setDeferredPrompt(event))
      }),
    [],
  )

  return user.isFetching ? (
    <Box
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      <CircularProgress />
    </Box>
  ) : user.data ? (
    <div>
      <TopBar user={user.data} title={title} />
      <Box sx={{ my: 4 }}>
        <Outlet />
      </Box>
      <BudgetDialogContainer />
    </div>
  ) : (
    <LoginPage />
  )
}
