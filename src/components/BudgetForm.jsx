import {
  Button,
  Checkbox,
  FormControlLabel,
  List,
  ListItem,
  TextField,
} from '@mui/material'
import React from 'react'
import { Form } from 'react-router-dom'

export default function BudgetForm({ budget = { active: true } }) {
  return (
    <Form method="post">
      <List>
        <ListItem>
          <TextField
            name="name"
            defaultValue={budget.name}
            label="Name"
            required
            autoComplete="false"
          />
        </ListItem>
        <ListItem>
          <TextField
            name="description"
            defaultValue={budget.description}
            label="Description"
            multiline
          />
        </ListItem>
        <ListItem>
          <FormControlLabel
            control={<Checkbox name="active" defaultChecked={budget.active} />}
            label="Active"
          />
        </ListItem>
        <ListItem>
          <Button type="submit" variant="contained">
            Save
          </Button>
        </ListItem>
      </List>
    </Form>
  )
}
