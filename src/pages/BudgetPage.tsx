import { useEffect } from 'react'
import { Container } from '@mui/material'
import { useDispatch } from 'react-redux'
import BudgetList from '../containers/BudgetList'
import { setTitle } from '../redux/titleSlice'

export default function BudgetPage() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setTitle('Budgets'))
  }, [])

  return (
    <Container>
      <BudgetList />
    </Container>
  )
}
