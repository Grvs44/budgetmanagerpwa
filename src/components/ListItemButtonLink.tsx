import { Link as RouteLink, LinkProps } from 'react-router'
import { ListItemButton } from '@mui/material'
import type { ListItemButtonProps } from '@mui/material'

const ListItemButtonLink = (props: LinkProps & ListItemButtonProps) => {
  return (
    <ListItemButton
      component={RouteLink}
      {...props}
      to={import.meta.env.BASE_URL + props.to.valueOf()}
    />
  )
}

export default ListItemButtonLink
