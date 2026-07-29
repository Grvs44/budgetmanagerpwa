import TickIcon from '@mui/icons-material/CheckBox'
import CrossIcon from '@mui/icons-material/DisabledByDefault'
import Grid from '@mui/material/Grid'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import type { BudgetItem } from '../redux/types'

export type BudgetListItemProps = {
  item: BudgetItem
  onClick: (id: number) => void
}

export default function BudgetListItem({ item, onClick }: BudgetListItemProps) {
  return (
    <ListItem>
      <ListItemButton onClick={() => onClick(item.id)}>
        <Grid container spacing={2}>
          <Grid size={{ sm: 12, md: 8 }}>{item.name}</Grid>
          <Grid size={2}>
            {item.active ? (
              <TickIcon titleAccess="Active" color="info" />
            ) : (
              <CrossIcon titleAccess="Inactive" color="warning" />
            )}
          </Grid>
        </Grid>
      </ListItemButton>
    </ListItem>
  )
}
