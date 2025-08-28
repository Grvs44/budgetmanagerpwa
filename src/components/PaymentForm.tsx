import { useEffect, useState } from 'react'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import TextField from '@mui/material/TextField'
import { DatePicker } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import dayjs from 'dayjs'
import { useGetBudgetQuery, useGetPayeeQuery } from '../redux/apiSlice'
import FormDialog from './FormDialog'
import 'dayjs/locale/en-gb'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { EditablePayment, Nameable } from '../redux/types'
import BudgetDropDown from './BudgetDropDown'
import PayeeDropDown from './PayeeDropDown'

dayjs.extend(customParseFormat)

export type PaymentFormProps = {
  payment?: EditablePayment | null
  onClose: () => void
  onSubmit: (
    oldPayment: EditablePayment | null,
    newPayment: EditablePayment,
  ) => void
  open: boolean
  title: string
}

export default function PaymentForm({
  payment,
  onClose,
  onSubmit,
  open,
  title,
}: PaymentFormProps) {
  if (payment == null)
    payment = { payee: null, amount: null, date: '', pending: false, notes: '' }
  const payeeQuery = useGetPayeeQuery(payment.payee, {
    skip: payment.payee == null,
  })
  const budgetQuery = useGetBudgetQuery(payeeQuery.data?.budget, {
    skip: payeeQuery.data == null,
  })
  const [payee, setPayee] = useState<Nameable | null | undefined>(null)
  const [budget, setBudget] = useState<Nameable | null | undefined>(null)
  useEffect(() => setPayee(payeeQuery.data || null), [payeeQuery.data])
  useEffect(() => setBudget(budgetQuery.data || null), [budgetQuery.data])
  const onFormSubmit = (formData: EditablePayment) => {
    if (payee == null) alert('Missing payee')
    else {
      formData.date = dayjs(formData.date, 'DD/MM/YYYY').format('YYYY-MM-DD')
      onSubmit(payment, { ...formData, payee: payee.id })
      onClose()
    }
  }
  return (
    <FormDialog
      open={open}
      onClose={onClose}
      onSubmit={onFormSubmit}
      title={title}
    >
      <List>
        <ListItem>
          <BudgetDropDown value={budget} onChange={setBudget} required />
        </ListItem>
        <ListItem>
          <PayeeDropDown
            value={payee}
            onChange={setPayee}
            budget={budget || null}
            required
          />
        </ListItem>
        <ListItem>
          <TextField
            name="amount"
            defaultValue={payment.amount}
            label="Amount"
            type="number"
            slotProps={{ htmlInput: { step: '0.01' } }}
            required
            autoComplete="false"
          />
        </ListItem>
        <ListItem>
          <LocalizationProvider
            dateAdapter={AdapterDayjs}
            adapterLocale="en-gb"
          >
            <DatePicker
              name="date"
              defaultValue={
                payment.date ? dayjs(payment.date) : dayjs(Date.now())
              }
              label="Date"
            />
          </LocalizationProvider>
        </ListItem>
        <ListItem>
          <TextField
            name="notes"
            defaultValue={payment.notes}
            label="Notes"
            multiline
          />
        </ListItem>
        <ListItem>
          <FormControlLabel
            control={
              <Checkbox name="pending" defaultChecked={payment.pending} />
            }
            label="Exclude from total"
          />
        </ListItem>
      </List>
    </FormDialog>
  )
}
