import { useEffect, useState } from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Skeleton from '@mui/material/Skeleton'
import Typography from '@mui/material/Typography'
import ModifiedText from '../components/ModifiedText'
import TotalText from '../components/TotalText'
import {
  useGetBudgetQuery,
  useGetBudgetTotalQuery,
  useGetUserQuery,
} from '../redux/apiSlice'
import type { Budget } from '../redux/types'

export type BudgetViewDialogProps = {
  open: boolean
  onClose: () => void
  onEdit: ({ budget }: { budget: Budget }) => void
  budgetId?: number | null
  onDelete: () => void
}

export default function BudgetViewDialog(props: BudgetViewDialogProps) {
  const [showTotal, setShowTotal] = useState<boolean>(false)
  const budget = useGetBudgetQuery(props.budgetId, {
    skip: props.budgetId == null,
  })
  const user = useGetUserQuery(budget.data?.modified_by, {
    skip: budget.isFetching || budget.data?.modified_by == null,
  })
  const total = useGetBudgetTotalQuery(props.budgetId, {
    skip: !showTotal || props.budgetId == null,
  })
  const isFetching = budget.isFetching || user.isFetching

  useEffect(() => setShowTotal(false), [props.open])

  return (
    <Dialog open={props.open} onClose={props.onClose}>
      <DialogTitle>{isFetching ? <Skeleton /> : budget.data?.name}</DialogTitle>
      <DialogContent>
        <Typography>
          {isFetching ? <Skeleton /> : budget.data?.description}
        </Typography>
        <Typography>
          {isFetching ? (
            <Skeleton />
          ) : budget.data?.active ? (
            'Active'
          ) : (
            'Inactive'
          )}
        </Typography>
        <ModifiedText data={budget.data} user={user} isFetching={isFetching} />
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
          variant="contained"
          onClick={() => props.onDelete()}
          disabled={isFetching}
        >
          Delete
        </Button>
        <Button
          type="button"
          variant="contained"
          onClick={() => budget.data ? props.onEdit({ budget: budget.data }) : undefined}
          disabled={isFetching}
        >
          Edit
        </Button>
        <Button type="button" onClick={props.onClose}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  )
}
