import { useEffect } from 'react'
import Box from '@mui/material/Box'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import BudgetDialogContainer from './containers/BudgetDialogContainer'
import LoadingBox from './containers/LoadingBox'
import PayeeDialogContainer from './containers/PayeeDialogContainer'
import PaymentDialogContainer from './containers/PaymentDialogContainer'
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
    <LoadingBox />
  ) : user.data ? (
    <div>
      <TopBar user={user.data} title={title} />
      <Box sx={{ my: 4 }}>
        <Outlet />
      </Box>
      <BudgetDialogContainer />
      <PayeeDialogContainer />
      <PaymentDialogContainer />
    </div>
  ) : (
    <LoginPage />
  )
}
