import { FC } from 'react'
import AddIcon from '@mui/icons-material/Add'
import Fab from '@mui/material/Fab'

const NewFab: FC<{ onClick: () => void }> = (props) => (
  <Fab
    color="primary"
    onClick={props.onClick}
    variant="extended"
    sx={{ right: 16, bottom: 16, position: 'fixed' }}
  >
    <AddIcon sx={{ mr: 1 }} />
    New
  </Fab>
)

export default NewFab
