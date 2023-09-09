import React from 'react'
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  List,
  ListItem,
  TextField,
} from '@mui/material'

export default function BudgetForm({
  budget = { active: true },
  onClose,
  onSubmit,
  open = false,
  title,
}) {
  const onFormSubmit = async (event) => {
    console.log('submit')
    event.preventDefault()
    const formData = new FormData(event.target)
    await onSubmit(Object.fromEntries(formData.entries()))
    onClose()
  }
  return (
    <Dialog open={open} onClose={onClose}>
      <form onSubmit={onFormSubmit}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
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
                control={
                  <Checkbox name="active" defaultChecked={budget.active} />
                }
                label="Active"
              />
            </ListItem>
            <ListItem></ListItem>
          </List>
        </DialogContent>
        <DialogActions>
          <Button type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="contained">
            Save
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}
