import { useEffect } from 'react'
import { Container } from '@mui/material'
import { useDispatch } from 'react-redux'
import PayeeList from '../containers/PayeeList'
import { setTitle } from '../redux/titleSlice'

export default function PayeePage() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setTitle('Payees'))
  }, [])

  return (
    <Container>
      <PayeeList />
    </Container>
  )
}
