import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Skeleton from '@mui/material/Skeleton'
import Typography from '@mui/material/Typography'
import { useBudgetDialog, usePayeeDialog } from '../context/DialogProviders'
import {
  useGetBudgetQuery,
  useGetPayeeQuery,
  useGetPaymentQuery,
  useGetUserQuery,
} from '../redux/apiSlice'
import { useCurrency } from '../redux/settingsSlice'
import { getPaymentTitle, showUserDetails } from '../redux/utils'

export type PaymmentViewDialogProps = {
  open: boolean
  onClose: () => void
  onEdit: (data: any) => void
  paymentId: number | null
  onDelete: () => void
}

export default function PaymentViewDialog({
  open,
  onClose,
  onEdit,
  paymentId,
  onDelete,
}: PaymmentViewDialogProps) {
  const budgetDialog = useBudgetDialog()
  const payeeDialog = usePayeeDialog()
  const currency = useCurrency()
  const payment = useGetPaymentQuery(paymentId, { skip: !open })
  const skip = !open || payment.isFetching
  const payee = useGetPayeeQuery(payment?.data?.payee, { skip })
  const budget = useGetBudgetQuery(payee?.data?.budget, {
    skip: skip || payee.isFetching,
  })
  const user = useGetUserQuery(payment?.data?.modified_by, {
    skip: skip || payment.data?.modified_by == null,
  })
  return (
    <Dialog open={open && paymentId != null} onClose={onClose}>
      <DialogTitle>
        {payee.data && payment.data
          ? getPaymentTitle(payment.data, payee.data, currency)
          : 'Loading'}
      </DialogTitle>
      <DialogContent>
        <Typography>
          Budget: {budget?.data ? budget.data.name : 'loading'}
        </Typography>
        <Typography>
          Payee: {payee?.data ? payee.data.name : 'loading'}
        </Typography>
        <Typography>
          Amount: {payment.data ? currency + payment.data.amount : 'loading'}
        </Typography>
        <Typography>
          Date: {payment.data ? payment.data.date : 'loading'}
        </Typography>
        {payment?.data?.pending ? <Typography>Pending</Typography> : null}
        <Typography>
          Last modified on {payment?.data?.last_modified} by{' '}
          {user.data ? showUserDetails(user.data) : <Skeleton />}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button
          type="button"
          disabled={!budget.isSuccess}
          onClick={() => {
            if (budget.data) {
              budgetDialog.setViewId(budget.data.id)
              budgetDialog.setViewOpen(true)
            }
          }}
        >
          View budget
        </Button>
        <Button
          type="button"
          disabled={!payee.isSuccess}
          onClick={() => {
            if (payee.data) {
              payeeDialog.setViewId(payee.data.id)
              payeeDialog.setViewOpen(true)
            }
          }}
        >
          View payee
        </Button>
        <Button
          type="button"
          variant="contained"
          onClick={() => onDelete()}
          disabled={skip}
        >
          Delete
        </Button>
        <Button
          type="button"
          variant="contained"
          onClick={() => onEdit(payment.data)}
          disabled={skip}
        >
          Edit
        </Button>
        <Button type="button" onClick={onClose}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  )
}
