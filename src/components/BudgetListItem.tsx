import CheckBoxIcon from '@mui/icons-material/CheckBox'
import CrossIcon from '@mui/icons-material/DisabledByDefault'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import type { BudgetItem } from '../redux/types'

export type BudgetListItemProps = {
  item: BudgetItem
  onClick: (id: number) => void
}

export default function BudgetListItem({ item, onClick }: BudgetListItemProps) {
  return (
    <ListItem>
      <ListItemButton onClick={() => onClick(item.id)}>
        <ListItemText
          primary={item.name}
          secondary={
            item.active ? (
              <CheckBoxIcon titleAccess="Active" />
            ) : (
              <CrossIcon titleAccess="Inactive" />
            )
          }
        />
      </ListItemButton>
    </ListItem>
  )
}
