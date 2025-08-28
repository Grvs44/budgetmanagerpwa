import { FC, FormEventHandler, useEffect, useState } from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import TextField from '@mui/material/TextField'
import BudgetDropDown from '../components/BudgetDropDown'
import OrderSelect from '../components/OrderSelect'
import type { Nameable, OrderField } from '../redux/types'

export type PayeeDialogFilters = {
  budget?: Nameable
  search?: string
  ordering?: OrderField
}

const PayeeFilterDialog: FC<{
  filters: PayeeDialogFilters
  open: boolean
  onClose: () => void
  onSubmit: (filters: PayeeDialogFilters) => void
}> = (props) => {
  const [budget, setBudget] = useState<Nameable | null>(null)
  const [name, setName] = useState<string>('')
  const [order, setOrder] = useState<OrderField>('name')

  const onSubmit: FormEventHandler = (event) => {
    event.preventDefault()
    props.onClose()
    props.onSubmit({
      budget: budget || undefined,
      search: name || undefined,
      ordering: order || undefined,
    })
  }

  const resetFilters = () => {
    setBudget(props.filters.budget || null)
    setName(props.filters.search || '')
    setOrder(props.filters.ordering || 'name')
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
        <TextField
          value={name}
          onChange={(e) => setName(e.target.value)}
          label="Payee name"
          name="name"
          fullWidth
        />
        <OrderSelect value={order} setValue={setOrder} />
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

export default PayeeFilterDialog
