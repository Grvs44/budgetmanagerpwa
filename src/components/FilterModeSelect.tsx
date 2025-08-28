import type { FC } from 'react'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'

export enum FilterMode {
  Equal,
  More,
  Less,
}

const FilterModeSelect: FC<{
  value: FilterMode
  onChange: (value: FilterMode) => void
  label: string
  labelId: string
}> = (props) => {
  return (
    <FormControl fullWidth>
      <InputLabel id={props.labelId}>{props.label}</InputLabel>
      <Select
        labelId={props.labelId}
        value={props.value}
        label={props.label}
        onChange={(e) => props.onChange(e.target.value)}
      >
        <MenuItem value={FilterMode.Equal}>Equal</MenuItem>
        <MenuItem value={FilterMode.More}>Greater than</MenuItem>
        <MenuItem value={FilterMode.Less}>Less than</MenuItem>
      </Select>
    </FormControl>
  )
}

export default FilterModeSelect
