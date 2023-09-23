import React from 'react'
import { ListItem } from '@mui/material'
import { Link } from 'react-router-dom'

export default function BudgetListItem({ item }) {
  return (
    <ListItem>
      <Link to={item.id.toString()}>{item.name}</Link>
    </ListItem>
  )
}
