import { FC, useState } from 'react'
import { useGetBudgetsSearchQuery } from '../redux/apiSlice'
import type { Nameable } from '../redux/types'
import DropDown from './DropDown'

export type BudgetDropDownProps = {
  defaultValue?: Nameable | null
  disabled?: boolean
  onChange: (value: Nameable | null) => void
  value?: Nameable | null
}

const BudgetDropDown: FC<BudgetDropDownProps> = (props) => {
  const [input, setInput] = useState<string>('')
  const [open, setOpen] = useState<boolean>(false)
  const query = useGetBudgetsSearchQuery(input, { skip: !open })

  return (
    <DropDown
      label="Budget"
      required
      data={query.data?.results || []}
      isFetching={query.isFetching}
      open={open}
      setOpen={setOpen}
      input={input}
      setInput={setInput}
      value={props.value}
      {...props}
    />
  )
}

export default BudgetDropDown
