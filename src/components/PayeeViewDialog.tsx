import { useState } from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Skeleton from '@mui/material/Skeleton'
import Typography from '@mui/material/Typography'
import { useBudgetDialog } from '../context/DialogProviders'
import {
  useGetBudgetQuery,
  useGetPayeeQuery,
  useGetPayeeTotalQuery,
  useGetUserQuery,
} from '../redux/apiSlice'
import ModifiedText from './ModifiedText'
import TotalText from './TotalText'

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
      {isFetching ? null : (
        <DialogContent>
          <Typography>Budget: {budget.data?.name}</Typography>
          <Typography>{payee.data?.description}</Typography>
          <ModifiedText data={payee.data} user={user} />
          <TotalText
            data={total.data}
            isFetching={total.isFetching}
            show={showTotal}
            onShow={() => setShowTotal(true)}
          />
        </DialogContent>
      )}
      <DialogActions>
        <Button
          type="button"
          disabled={!budget.isSuccess}
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
