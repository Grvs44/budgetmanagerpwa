import React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Skeleton from '@mui/material/Skeleton'
import Typography from '@mui/material/Typography'
import {
  useGetBudgetQuery,
  useGetPayeeQuery,
  useGetPayeeTotalQuery,
  useGetUserQuery,
} from '../redux/apiSlice'
import ModifiedText from './ModifiedText'
import TotalText from './TotalText'

type ViewContentProps = {
  onClose: () => void
  onEdit: (data: any) => void
  payeeId: number | null
  onDelete: () => void
}

export type PayeeViewDialogProps = ViewContentProps & {
  open: boolean
}

export default function PayeeViewDialog({
  open,
  onClose,
  onEdit,
  payeeId,
  onDelete,
}: PayeeViewDialogProps) {
  return (
    <Dialog open={open} onClose={onClose}>
      <ViewContent
        onClose={onClose}
        onEdit={onEdit}
        payeeId={payeeId}
        onDelete={onDelete}
      />
    </Dialog>
  )
}

function ViewContent({ onClose, onEdit, payeeId, onDelete }: ViewContentProps) {
  const [showTotal, setShowTotal] = React.useState<boolean>(false)
  const payee = useGetPayeeQuery(payeeId, { skip: payeeId == null })
  const budget = useGetBudgetQuery(payee.data?.budget, {
    skip: payee.isLoading,
  })
  const user = useGetUserQuery(payee.data?.modified_by, {
    skip: payee.isLoading || payee.data?.modified_by == null,
  })
  const total = useGetPayeeTotalQuery(payeeId, {
    skip: !showTotal || payeeId == null,
  })
  const isLoading = payee.isLoading || budget.isLoading || user.isLoading

  return (
    <>
      <DialogTitle>{payee.data ? payee.data.name : <Skeleton />}</DialogTitle>
      {isLoading ? null : (
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
          variant="contained"
          onClick={() => onDelete()}
          disabled={isLoading}
        >
          Delete
        </Button>
        <Button
          type="button"
          variant="contained"
          onClick={() => onEdit(payee.data)}
          disabled={isLoading}
        >
          Edit
        </Button>
        <Button type="button" onClick={onClose}>
          Close
        </Button>
      </DialogActions>
    </>
  )
}
