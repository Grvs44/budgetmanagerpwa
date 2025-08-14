import { useState } from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Skeleton from '@mui/material/Skeleton'
import Typography from '@mui/material/Typography'
import {
  useGetBudgetQuery,
  useGetBudgetTotalQuery,
  useGetUserQuery,
} from '../redux/apiSlice'
import type { Budget } from '../redux/types'
import ModifiedText from './ModifiedText'
import TotalText from './TotalText'

export type BudgetViewDialogProps = {
  open: boolean
  onClose: () => void
  onEdit: ({ budget }: { budget: Budget }) => void
  budgetId?: number | null
  onDelete: () => void
}

export default function BudgetViewDialog(props: BudgetViewDialogProps) {
  return (
    <Dialog open={props.open} onClose={props.onClose}>
      <ViewContent {...props} />
    </Dialog>
  )
}

function ViewContent(props: BudgetViewDialogProps) {
  const [showTotal, setShowTotal] = useState<boolean>(false)
  const { data, isFetching } = useGetBudgetQuery(props.budgetId, {
    skip: props.budgetId == null,
  })
  const user = useGetUserQuery(data?.modified_by, {
    skip: isFetching || data?.modified_by == null,
  })
  const total = useGetBudgetTotalQuery(props.budgetId, {
    skip: !showTotal || props.budgetId == null,
  })

  return (
    <>
      <DialogTitle>{data ? data.name : <Skeleton />}</DialogTitle>
      {isFetching || user.isFetching ? null : (
        <DialogContent>
          <Typography>{data?.description}</Typography>
          <Typography>{data?.active ? 'Active' : 'Inactive'}</Typography>
          <ModifiedText data={data} user={user} />
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
          onClick={() => props.onDelete()}
          disabled={isFetching}
        >
          Delete
        </Button>
        <Button
          type="button"
          variant="contained"
          onClick={data ? () => props.onEdit({ budget: data }) : undefined}
          disabled={isFetching}
        >
          Edit
        </Button>
        <Button type="button" onClick={props.onClose}>
          Close
        </Button>
      </DialogActions>
    </>
  )
}
