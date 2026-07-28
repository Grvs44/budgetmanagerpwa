import { FC } from 'react'
import Container from '@mui/material/Container'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Skeleton from '@mui/material/Skeleton'

const ListSkeleton: FC = () => (
  <Container>
    <List>
      {new Array(4).fill(null).map((_, i) => (
        <ListItem key={i}>
          <ListItemText primary={<Skeleton sx={{ height: '3em' }} />} />
        </ListItem>
      ))}
    </List>
  </Container>
)

export default ListSkeleton
