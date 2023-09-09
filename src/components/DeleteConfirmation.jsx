import React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogTitle from '@mui/material/DialogTitle'
import { Form } from 'react-router-dom'

export default function DeleteConfirmation({ message }) {
  const onCancel = () => history.back()
  return (
    <Dialog open={true} onClose={onCancel}>
      <DialogTitle>{message}</DialogTitle>
      <DialogActions>
        <Form method="post">
          <Button onClick={onCancel} type="button">
            Cancel
          </Button>
          <Button type="submit">Delete</Button>
        </Form>
      </DialogActions>
    </Dialog>
  )
}
