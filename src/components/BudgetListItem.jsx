import React from 'react'
import { Box, ListItem, Typography } from '@mui/material'

export default function BudgetListItem({ item }) {
  return (
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
  )
}
