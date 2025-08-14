import type { FC } from 'react'
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
import {
  useBudgetDialog,
  usePayeeDialog,
  usePaymentDialog,
} from '../context/DialogProviders'

const QuickAdd: FC = () => {
  const budgetDialog = useBudgetDialog()
  const payeeDialog = usePayeeDialog()
  const paymentDialog = usePaymentDialog()

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="h2">
          Quick Add
        </Typography>
        <List>
          <ListItem>
            <ListItemButton onClick={() => budgetDialog.setCreateOpen(true)}>
              <ListItemIcon>
                <SavingsIcon />
              </ListItemIcon>
              New Budget
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton onClick={() => payeeDialog.setCreateOpen(true)}>
              <ListItemIcon>
                <StoreIcon />
              </ListItemIcon>
              New Payee
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton onClick={() => paymentDialog.setCreateOpen(true)}>
              <ListItemIcon>
                <PaymentsIcon />
              </ListItemIcon>
              New Payment
            </ListItemButton>
          </ListItem>
        </List>
      </CardContent>
    </Card>
  )
}

export default QuickAdd
