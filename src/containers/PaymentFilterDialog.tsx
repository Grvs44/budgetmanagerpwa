import { FC, FormEventHandler, useEffect, useState } from 'react'
import { TextField } from '@mui/material'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import BudgetDropDown from '../components/BudgetDropDown'
import { FilterMode } from '../components/FilterModeSelect'
import PayeeDropDown from '../components/PayeeDropDown'
import type { Nameable, PaymentOrderField } from '../redux/types'

export type PaymentDialogFilters = {
  budget?: Nameable
  payee?: Nameable
  pending?: string
  amount?: string
  amount_gt?: string
  amount_lt?: string
  date?: string
  date_gt?: string
  date_lt?: string
  dateMode?: FilterMode
  ordering?: PaymentOrderField
}

const PaymentFilterDialog: FC<{
  filters: PaymentDialogFilters
  open: boolean
  onClose: () => void
  onSubmit: (filters: PaymentDialogFilters) => void
}> = (props) => {
  const [budget, setBudget] = useState<Nameable | null>(null)
  const [payee, setPayee] = useState<Nameable | null>(null)
  const [pending, setPending] = useState<string | null>('a')
  const [amount, setAmount] = useState<string | null>(null)
  const [amountMode, setAmountMode] = useState<FilterMode>(FilterMode.Equal)
  const [date, setDate] = useState<string | null>(null)
  const [dateMode, setDateMode] = useState<FilterMode>(FilterMode.Equal)
  const [order, setOrder] = useState<PaymentOrderField>('-date')

  const onSubmit: FormEventHandler = (event) => {
    event.preventDefault()
    props.onClose()
    const filters: PaymentDialogFilters = {
      budget: budget || undefined,
      payee: payee || undefined,
      pending: pending == 'true' || pending == 'false' ? pending : undefined,
      ordering: order || undefined,
    }
    switch (amountMode) {
      case FilterMode.Equal:
        filters.amount = amount || undefined
        break
      case FilterMode.More:
        filters.amount_gt = amount || undefined
        break
      default:
        filters.amount_lt = amount || undefined
    }
    switch (dateMode) {
      case FilterMode.Equal:
        filters.date = date || undefined
        break
      case FilterMode.More:
        filters.amount_gt = date || undefined
        break
      case FilterMode.Less:
        filters.amount_lt = date || undefined
    }
    props.onSubmit(filters)
  }

  const resetFilters = () => {
    if (props.filters.budget) {
      setBudget(props.filters.budget)
      setPayee(props.filters.payee || null)
    }
    setOrder(props.filters.ordering || '-date')
  }

  useEffect(() => {
    if (props.open) resetFilters()
  }, [props.filters, props.open])

  return (
    <Dialog
      open={props.open}
      onClose={props.onClose}
      slotProps={{ paper: { component: 'form', onSubmit } }}
    >
      <DialogTitle>Filters</DialogTitle>
      <DialogContent>
        <BudgetDropDown value={budget} onChange={setBudget} />
        <PayeeDropDown value={payee} onChange={setPayee} budget={budget} />
        <FormControl fullWidth>
          <InputLabel id="pending-label">Active</InputLabel>
          <Select
            labelId="pending-label"
            value={pending}
            label="Pending"
            onChange={(e) => setPending(e.target.value)}
          >
            <MenuItem value="a">All</MenuItem>
            <MenuItem value="true">Pending</MenuItem>
            <MenuItem value="false">Settled</MenuItem>
          </Select>
        </FormControl>
        <TextField
          name="amount"
          label="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button type="button" onClick={resetFilters}>
          Reset
        </Button>
        <Button type="button" onClick={props.onClose}>
          Cancel
        </Button>
        <Button type="submit" variant="contained">
          Apply
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default PaymentFilterDialog
