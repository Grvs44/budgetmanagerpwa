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
        <Typography>{budget.description}</Typography>
          <Typography>Last modified at {budget.last_modified} by {budget.modified_by}</Typography>
      </Box>
    </ListItem>
  )
}
