import type { FC } from 'react'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import type { OrderField } from '../redux/types'

const OrderSelect: FC<{
  value: string
  setValue: (value: OrderField) => void
}> = (props) => (
  <FormControl fullWidth>
    <InputLabel id="order-label">Ordering</InputLabel>
    <Select
      labelId="order-label"
      value={props.value}
      label="Ordering"
      onChange={(e) => props.setValue(e.target.value as OrderField)}
    >
      <MenuItem value="name">Name (ascending)</MenuItem>
      <MenuItem value="-name">Name (descending)</MenuItem>
      <MenuItem value="id">Date created (ascending)</MenuItem>
      <MenuItem value="-id">Date created (descending)</MenuItem>
      <MenuItem value="last_used">Last used (ascending)</MenuItem>
      <MenuItem value="-last_used">Last used (descending)</MenuItem>
    </Select>
  </FormControl>
)

export default OrderSelect
