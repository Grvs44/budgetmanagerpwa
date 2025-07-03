// From https://mui.com/material-ui/react-autocomplete
// and https://github.com/Grvs44/Inclusive-Venues/blob/v1.0.1/react/src/components/DropDown.tsx
import { useEffect, useState } from 'react'
import Autocomplete from '@mui/material/Autocomplete'
import CircularProgress from '@mui/material/CircularProgress'
import TextField from '@mui/material/TextField'
import type { Nameable } from '../redux/types'

export type DropDownProps<T extends Nameable> = {
  defaultValue?: T | null
  value?: T | null
  label: string
  required?: boolean
  disabled?: boolean
  fullWidth?: boolean
  onChange: (value: T | null) => void
  data: T[]
  isFetching: boolean
  open: boolean
  setOpen: (open: boolean) => void
  input: string
  setInput: (input: string) => void
}

export default function DropDown<T extends Nameable>(props: DropDownProps<T>) {
  const [currentData, setCurrentData] = useState<T[]>([])
  const loading = props.open && props.isFetching

  useEffect(() => {
    if (props.input == '') {
      setCurrentData(props.data)
    } else {
      const lower = props.input.toLowerCase()
      setCurrentData(
        props.data.filter((x) => x.name.toLowerCase().includes(lower)),
      )
    }
  }, [props.input])

  useEffect(() => setCurrentData(props.data), [props.data])

  return (
    <Autocomplete
      filterOptions={(x) => x}
      defaultValue={props.defaultValue}
      value={props.value}
      disabled={props.disabled}
      fullWidth={props.fullWidth}
      open={props.open}
      onOpen={() => props.setOpen(true)}
      onClose={() => props.setOpen(false)}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      getOptionKey={(option) => option.id}
      getOptionLabel={(option) => option.name}
      onChange={(_, value) => props.onChange(value)}
      onInputChange={(_, value) => props.setInput(value)}
      options={currentData}
      loading={loading}
      renderInput={(params) => (
        <TextField
          {...params}
          label={props.label}
          required={props.required}
          value={props.input}
          slotProps={{
            input: {
              ...params.InputProps,
              endAdornment: (
                <>
                  {loading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            },
          }}
        />
      )}
    />
  )
}
