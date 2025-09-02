import type { FC } from 'react'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'

export type OrderItem = [string, string]

export const orderItems: OrderItem[] = [
  ['name', 'Name'],
  ['id', 'Date created'],
  ['last_used', 'Last used'],
]

export const paymentOrderItems: OrderItem[] = [
  ['date', 'Date'],
  ['amount', 'Amount'],
  ...orderItems.slice(1),
]

const OrderSelect: FC<{
  value: string
  setValue: (value: string) => void
  orderItems: OrderItem[]
}> = (props) => (
  <FormControl fullWidth>
    <InputLabel id="order-label">Ordering</InputLabel>
    <Select
      labelId="order-label"
      value={props.value}
      label="Ordering"
      onChange={(e) => props.setValue(e.target.value)}
    >
      {props.orderItems.flatMap((item) => [
        <MenuItem value={item[0]}>{item[1]} (ascending)</MenuItem>,
        <MenuItem value={'-' + item[0]}>{item[1]} (descending)</MenuItem>,
      ])}
    </Select>
  </FormControl>
)

export default OrderSelect
