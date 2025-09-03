import { FC, FormEventHandler, useEffect, useState } from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import BudgetDropDown from '../components/BudgetDropDown'
import FilterModeSelect, { FilterMode } from '../components/FilterModeSelect'
import PayeeDropDown from '../components/PayeeDropDown'
import type { Nameable } from '../redux/types'
import 'dayjs/locale/en-gb'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import type { PickerValue } from '@mui/x-date-pickers/internals'
import OrderSelect, { paymentOrderItems } from '../components/OrderSelect'

export type PaymentDialogFilters = {
  budget?: Nameable | null
  payee?: Nameable | null
  pending?: 'false' | 'true'
  amount?: string | null
  amountMode?: FilterMode
  date?: PickerValue
  dateMode?: FilterMode
  ordering?: string
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
  const [amount, setAmount] = useState<string>('')
  const [amountMode, setAmountMode] = useState<FilterMode>(FilterMode.Equal)
  const [date, setDate] = useState<PickerValue>(null)
  const [dateMode, setDateMode] = useState<FilterMode>(FilterMode.Equal)
  const [order, setOrder] = useState<string>('-date')

  const onSubmit: FormEventHandler = (event) => {
    event.preventDefault()
    props.onClose()
    props.onSubmit({
      budget,
      payee,
      pending: pending == 'true' || pending == 'false' ? pending : undefined,
      amount,
      amountMode,
      date,
      dateMode,
      ordering: order,
    })
  }

  const resetFilters = () => {
    setBudget(props.filters.budget || null)
    setPayee(props.filters.payee || null)
    setPending(props.filters.pending || 'a')
    setAmount(props.filters.amount || '')
    setAmountMode(props.filters.amountMode || FilterMode.Equal)
    setDate(props.filters.date || null)
    setDateMode(props.filters.dateMode || FilterMode.Equal)
    setOrder(props.filters.ordering || '-date')
  }

  useEffect(() => {
    if (props.open) resetFilters()
  }, [props.filters, props.open])

  useEffect(() => {
    if (budget == null) setPayee(null)
  }, [budget])

  return (
    <Dialog
      open={props.open}
      onClose={props.onClose}
      slotProps={{ paper: { component: 'form', onSubmit } }}
    >
      <DialogTitle>Filters</DialogTitle>
      <DialogContent>
        <List>
          <ListItem>
            <BudgetDropDown value={budget} onChange={setBudget} />
          </ListItem>
          <ListItem>
            <PayeeDropDown value={payee} onChange={setPayee} budget={budget} />
          </ListItem>
          <ListItem>
            <FormControl fullWidth>
              <InputLabel id="pending-label">Pending</InputLabel>
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
          </ListItem>
          <ListItem>
            <Stack direction="row">
              <TextField
                name="amount"
                label="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                fullWidth
                type="number"
                slotProps={{ htmlInput: { step: '0.01' } }}
                autoComplete="false"
              />
              <FilterModeSelect
                value={amountMode}
                onChange={setAmountMode}
                label="Amount filter type"
                labelId="amount-label"
              />
            </Stack>
          </ListItem>
          <ListItem>
            <Stack>
              <LocalizationProvider
                dateAdapter={AdapterDayjs}
                adapterLocale="en-gb"
              >
                <DatePicker
                  name="date"
                  label="Date"
                  value={date}
                  onChange={setDate}
                />
                <FilterModeSelect
                  value={dateMode}
                  onChange={setDateMode}
                  label="Date filter type"
                  labelId="date-label"
                />
              </LocalizationProvider>
            </Stack>
          </ListItem>
          <ListItem>
            <OrderSelect
              value={order}
              setValue={setOrder}
              orderItems={paymentOrderItems}
            />
          </ListItem>
        </List>
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
