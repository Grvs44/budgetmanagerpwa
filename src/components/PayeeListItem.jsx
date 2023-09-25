import React from 'react'
import { Box, ListItem, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

export default function PayeeListItem({ item }) {
  return (
    <Link to={`../payee/${item.id}`}>
      <ListItem>
        <Box>
          <Typography>{item.name}</Typography>
          <Typography>{item.budget}</Typography>
        </Box>
      </ListItem>
    </Link>
  )
}
