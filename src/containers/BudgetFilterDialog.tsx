import { FC, FormEventHandler, useEffect, useState } from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import TextField from '@mui/material/TextField'
import OrderSelect, { orderItems } from '../components/OrderSelect'
import type { BudgetFilters } from '../redux/types'

const BudgetFilterDialog: FC<{
  filters: BudgetFilters
  open: boolean
  onClose: () => void
  onSubmit: (filters: BudgetFilters) => void
}> = (props) => {
  const [name, setName] = useState<string>('')
  const [active, setActive] = useState<string | null>('all')
  const [order, setOrder] = useState<string>('name')

  const onSubmit: FormEventHandler = (event) => {
    event.preventDefault()
    props.onClose()
    props.onSubmit({
      search: name || undefined,
      active: active == 'false' || active == 'true' ? active : undefined,
      ordering: order || undefined,
    })
  }

  const resetFilters = () => {
    setName(props.filters.search || '')
    setActive(props.filters.active || 'all')
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
        <List>
          <ListItem>
            <TextField
              value={name}
              onChange={(e) => setName(e.target.value)}
              label="Name"
              name="name"
              fullWidth
            />
          </ListItem>
          <ListItem>
            <FormControl fullWidth>
              <InputLabel id="active-label">Active</InputLabel>
              <Select
                labelId="active-label"
                value={active}
                label="Active"
                onChange={(e) => setActive(e.target.value)}
              >
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="true">Active</MenuItem>
                <MenuItem value="false">Inactive</MenuItem>
              </Select>
            </FormControl>
          </ListItem>
          <ListItem>
            <OrderSelect
              value={order}
              setValue={setOrder}
              orderItems={orderItems}
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

export default BudgetFilterDialog
