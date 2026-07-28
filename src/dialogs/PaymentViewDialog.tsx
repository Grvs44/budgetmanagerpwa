import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Skeleton from '@mui/material/Skeleton'
import Typography from '@mui/material/Typography'
import ModifiedText from '../components/ModifiedText'
import { useBudgetDialog, usePayeeDialog } from '../context/DialogProviders'
import {
  useGetBudgetQuery,
  useGetPayeeQuery,
  useGetPaymentQuery,
  useGetUserQuery,
} from '../redux/apiSlice'
import { useCurrency } from '../redux/settingsSlice'
import { getPaymentTitle } from '../redux/utils'

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
    skip: skip || payee.isFetching || payee.data == undefined,
  })
  const user = useGetUserQuery(payment?.data?.modified_by, {
    skip: skip || payment.data?.modified_by == null,
  })
  const isFetching =
    budget.isFetching ||
    payee.isFetching ||
    payment.isFetching ||
    user.isFetching

  return (
    <Dialog open={open && paymentId != null} onClose={onClose}>
      <DialogTitle>
        {!isFetching && payee.data && payment.data ? (
          getPaymentTitle(payment.data, payee.data, currency)
        ) : (
          <Skeleton />
        )}
      </DialogTitle>
      <DialogContent>
        <Typography>
          {isFetching ? <Skeleton /> : 'Budget: ' + budget.data?.name}
        </Typography>
        <Typography>
          {isFetching ? <Skeleton /> : 'Payee: ' + payee.data?.name}
        </Typography>
        <Typography>
          {isFetching ? (
            <Skeleton />
          ) : (
            'Amount: ' + currency + payment.data?.amount
          )}
        </Typography>
        <Typography>
          {isFetching || payment.data == undefined ? (
            <Skeleton />
          ) : (
            <>Date: {new Date(payment.data.date).toLocaleDateString()}</>
          )}
        </Typography>
        {payment?.data?.pending ? <Typography>Pending</Typography> : null}
        <ModifiedText data={payment.data} user={user} isFetching={isFetching} />
      </DialogContent>
      <DialogActions>
        <Button
          type="button"
          disabled={isFetching || !budget.isSuccess}
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
          disabled={isFetching || !payee.isSuccess}
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
