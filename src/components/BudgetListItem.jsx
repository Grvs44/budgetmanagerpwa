import React from 'react'
import { Box, ListItem, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

export default function BudgetListItem({ item }) {
  return (
    <Link to={item.id.toString()}>
      <ListItem>
        <Box>
          <Typography>{item.name}</Typography>
          {item.active ? (
            <Typography>active</Typography>
          ) : (
            <Typography>inactive</Typography>
          )}
          <Typography>User {item.user}</Typography>
        </Box>
      </ListItem>
    </Link>
  )
}
