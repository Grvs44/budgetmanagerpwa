import { FC, useState } from 'react'
import PaymentsIcon from '@mui/icons-material/Payments'
import SavingsIcon from '@mui/icons-material/Savings'
import StoreIcon from '@mui/icons-material/Store'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import Typography from '@mui/material/Typography'
import BudgetForm from '../components/BudgetForm'
import PayeeForm from '../components/PayeeForm'
import PaymentForm from '../components/PaymentForm'
import {
  useCreateBudgetMutation,
  useCreatePayeeMutation,
  useCreatePaymentMutation,
} from '../redux/apiSlice'
import type { SubmitBudget, SubmitPayee, SubmitPayment } from '../redux/types'

const QuickAdd: FC = () => {
  const [budgetOpen, setBudgetOpen] = useState<boolean>(false)
  const [payeeOpen, setPayeeOpen] = useState<boolean>(false)
  const [paymentOpen, setPaymentOpen] = useState<boolean>(false)
  const [createBudget] = useCreateBudgetMutation()
  const [createPayee] = useCreatePayeeMutation()
  const [createPayment] = useCreatePaymentMutation()

  const onBudgetSubmit = async (_: any, data: SubmitBudget) => {
    try {
      await createBudget(data).unwrap()
      alert('Added budget')
    } catch (e) {
      console.error(e)
      alert('Error: ' + e)
    }
  }

  const onPayeeSubmit = async (_: any, data: SubmitPayee) => {
    try {
      await createPayee(data).unwrap()
      alert('Added payee')
    } catch (e) {
      console.error(e)
      alert('Error: ' + e)
    }
  }

  const onPaymentSubmit = async (_: any, data: SubmitPayment) => {
    try {
      await createPayment(data).unwrap()
      alert('Added payment')
    } catch (e) {
      console.error(e)
      alert('Error: ' + e)
    }
  }

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="h2">
          Quick Add
        </Typography>
        <List>
          <ListItem>
            <ListItemButton onClick={() => setBudgetOpen(true)}>
              <ListItemIcon>
                <SavingsIcon />
              </ListItemIcon>
              New Budget
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton onClick={() => setPayeeOpen(true)}>
              <ListItemIcon>
                <StoreIcon />
              </ListItemIcon>
              New Payee
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton onClick={() => setPaymentOpen(true)}>
              <ListItemIcon>
                <PaymentsIcon />
              </ListItemIcon>
              New Payment
            </ListItemButton>
          </ListItem>
        </List>
      </CardContent>
      <BudgetForm
        open={budgetOpen}
        onClose={() => setBudgetOpen(false)}
        onSubmit={onBudgetSubmit}
        title="Add budget"
      />
      <PayeeForm
        open={payeeOpen}
        onClose={() => setPayeeOpen(false)}
        onSubmit={onPayeeSubmit}
        title="Add payee"
      />
      <PaymentForm
        open={paymentOpen}
        onClose={() => setPaymentOpen(false)}
        onSubmit={onPaymentSubmit}
        title="Add payment"
      />
    </Card>
  )
}

export default QuickAdd
