import React from 'react'
import { Box, ListItem, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

export default function PaymentListItem({ item }) {
  return (
    <Link to={`../payment/${item.id}`}>
      <ListItem>
        <Box>
          <Typography>{item.amount}</Typography>
          <Typography>{item.date}</Typography>
          <Typography>{item.payee}</Typography>
          <Typography>{item.budget}</Typography>
        </Box>
      </ListItem>
    </Link>
  )
}
