import { FC, useState } from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import TextField from '@mui/material/TextField'
import OrderSelect from '../components/OrderSelect'

const BudgetFilterDialog: FC<{
  open: boolean
  onClose: () => void
}> = (props) => {
  const [name, setName] = useState<string>('')
  const [active, setActive] = useState<string | null>('all')
  const [order, setOrder] = useState<string>('name')

  return (
    <Dialog open={props.open} onClose={props.onClose}>
      <DialogTitle>Filters</DialogTitle>
      <DialogContent>
        <TextField
          value={name}
          onChange={(e) => setName(e.target.value)}
          label="Name"
          name="name"
          fullWidth
        />
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
        <OrderSelect value={order} setValue={setOrder} />
      </DialogContent>
      <DialogActions>
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
