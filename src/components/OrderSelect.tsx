import type { FC } from 'react'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'

const OrderSelect: FC<{
  value: string
  setValue: (value: string) => void
}> = (props) => (
  <FormControl fullWidth>
    <InputLabel id="active-label">Active</InputLabel>
    <Select
      labelId="active-label"
      value={props.value}
      label="Active"
      onChange={(e) => props.setValue(e.target.value)}
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
