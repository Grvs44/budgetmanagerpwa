import { useEffect, useState } from 'react'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import TextField from '@mui/material/TextField'
import { useGetBudgetQuery } from '../redux/apiSlice'
import type { EditablePayee, Nameable, SubmitPayee } from '../redux/types'
import BudgetDropDown from './BudgetDropDown'
import FormDialog from './FormDialog'

export type PayeeFormProps = {
  payee?: EditablePayee | null
  onClose: () => void
  onSubmit: (oldPayee: SubmitPayee | null, newPayee: SubmitPayee) => void
  open: boolean
  title?: string
}

export default function PayeeForm(props: PayeeFormProps) {
  const budget = useGetBudgetQuery(props.payee?.budget, {
    skip: props.payee?.budget == undefined,
  })
  const [data, setData] = useState<Nameable | null | undefined>(null)

  useEffect(() => setData(budget.data || null), [budget.data])

  const onFormSubmit = (formData: EditablePayee) => {
    if (data == null) alert('Missing budget')
    else {
      props.onSubmit(props.payee || null, { ...formData, budget: data.id })
      props.onClose()
    }
  }

  return (
    <FormDialog
      open={props.open}
      onClose={props.onClose}
      onSubmit={onFormSubmit}
      title={props.title ? props.title : props.payee?.name || 'New payee'}
    >
      <List>
        <ListItem>
          <BudgetDropDown
            value={data}
            disabled={budget.isFetching}
            onChange={setData}
          />
        </ListItem>
        <ListItem>
          <TextField
            name="name"
            defaultValue={props.payee?.name}
            label="Name"
            required
            autoComplete="false"
          />
        </ListItem>
        <ListItem>
          <TextField
            name="description"
            defaultValue={props.payee?.description}
            label="Description"
            multiline
          />
        </ListItem>
      </List>
    </FormDialog>
  )
}
