import { FC, useState } from 'react'
import { useGetPayeesSearchQuery } from '../redux/apiSlice'
import type { Entity } from '../redux/types'
import type { BudgetDropDownProps } from './BudgetDropDown'
import DropDown from './DropDown'

export type PayeeDropDownProps = BudgetDropDownProps & {
  budget: Entity | null
}

const PayeeDropDown: FC<PayeeDropDownProps> = (props) => {
  const [input, setInput] = useState<string>('')
  const [open, setOpen] = useState<boolean>(false)
  const query = useGetPayeesSearchQuery(
    { name: input, budget: { id: props.budget ? props.budget.id : 0 } },
    { skip: !open || props.budget == undefined },
  )

  return (
    <DropDown
      label="Payee"
      disabled={props.budget == null || props.disabled}
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
export default PayeeDropDown
