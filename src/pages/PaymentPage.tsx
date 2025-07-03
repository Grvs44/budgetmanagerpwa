import { useEffect } from 'react'
import { Container } from '@mui/material'
import { useDispatch } from 'react-redux'
import PaymentList from '../containers/PaymentList'
import { setTitle } from '../redux/titleSlice'

export default function PaymentPage() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setTitle('Payments'))
  }, [])

  return (
    <Container>
      <PaymentList />
    </Container>
  )
}
