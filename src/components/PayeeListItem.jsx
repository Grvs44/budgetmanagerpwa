import React from 'react'
import { ListItem } from '@mui/material'
import { Link } from 'react-router-dom'

export default function PayeeListItem({ item }) {
  return (
    <ListItem>
      <Link to={`../payee/${item.id}`}>{item.name}</Link>
    </ListItem>
  )
}
