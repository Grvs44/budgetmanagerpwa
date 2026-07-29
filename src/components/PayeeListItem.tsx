import SavingsIcon from '@mui/icons-material/Savings'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import Skeleton from '@mui/material/Skeleton'
import { useGetBudgetQuery } from '../redux/apiSlice'
import type { PayeeItem } from '../redux/types'

export type PayeeListItemProps = {
  item: PayeeItem
  onClick: (id: number) => void
}

export default function PayeeListItem({ item, onClick }: PayeeListItemProps) {
  const budget = useGetBudgetQuery(item.budget)

  return (
    <ListItem>
      <ListItemButton onClick={() => onClick(item.id)}>
        <ListItemText
          primary={item.name}
          secondary={
            budget.data ? (
              <>
                <SavingsIcon titleAccess="Budget" sx={{ fontSize: '1.5em' }} />{' '}
                {budget.data.name}
              </>
            ) : (
              <Skeleton />
            )
          }
        />
      </ListItemButton>
    </ListItem>
  )
}
