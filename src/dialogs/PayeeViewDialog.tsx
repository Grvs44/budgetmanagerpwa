import { useState } from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Skeleton from '@mui/material/Skeleton'
import Typography from '@mui/material/Typography'
import ModifiedText from '../components/ModifiedText'
import TotalText from '../components/TotalText'
import { useBudgetDialog } from '../context/DialogProviders'
import {
  useGetBudgetQuery,
  useGetPayeeQuery,
  useGetPayeeTotalQuery,
  useGetUserQuery,
} from '../redux/apiSlice'

type PayeeViewDialogProps = {
  open: boolean
  onClose: () => void
  onEdit: (data: any) => void
  payeeId: number | null
  onDelete: () => void
}

export default function PayeeViewDialog({
  open,
  onClose,
  onEdit,
  payeeId,
  onDelete,
}: PayeeViewDialogProps) {
  const dialog = useBudgetDialog()
  const [showTotal, setShowTotal] = useState<boolean>(false)
  const payee = useGetPayeeQuery(payeeId, { skip: payeeId == null })
  const budget = useGetBudgetQuery(payee.data?.budget, {
    skip: payee.isFetching || payee.data == undefined,
  })
  const user = useGetUserQuery(payee.data?.modified_by, {
    skip: payee.isFetching || payee.data?.modified_by == null,
  })
  const total = useGetPayeeTotalQuery(payeeId, {
    skip: !showTotal || payeeId == null,
  })
  const isFetching = payee.isFetching || budget.isFetching || user.isFetching

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{payee.data ? payee.data.name : <Skeleton />}</DialogTitle>
      <DialogContent>
        <Typography>
          {isFetching ? <Skeleton /> : 'Budget: ' + budget.data?.name}
        </Typography>
        <Typography>
          {isFetching ? <Skeleton /> : payee.data?.description}
        </Typography>
        <ModifiedText data={payee.data} user={user} isFetching={isFetching} />
        <TotalText
          data={total.data}
          isFetching={isFetching || total.isFetching}
          show={showTotal}
          onShow={() => setShowTotal(true)}
        />
      </DialogContent>
      <DialogActions>
        <Button
          type="button"
          disabled={isFetching || !budget.isSuccess}
          onClick={() => {
            if (budget.data) {
              dialog.setViewId(budget.data.id)
              dialog.setViewOpen(true)
            }
          }}
        >
          View budget
        </Button>
        <Button
          type="button"
          variant="contained"
          onClick={() => onDelete()}
          disabled={isFetching}
        >
          Delete
        </Button>
        <Button
          type="button"
          variant="contained"
          onClick={() => onEdit(payee.data)}
          disabled={isFetching}
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
