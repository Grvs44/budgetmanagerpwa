import React from 'react'
import Button from '@mui/material/Button'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Dialog from './Dialog'
import type { DialogType } from './Dialog'

export type FormDialogProps = {
  children: React.JSX.Element
  onClose: () => void
  onSubmit: (data: any) => void
  open: boolean
  title: string
  type: DialogType
}

export default function FormDialog({
  children,
  onClose,
  onSubmit,
  open,
  title,
  type,
}: FormDialogProps) {
  const onFormSubmit = (event: any) => {
    event.preventDefault()
    onSubmit(Object.fromEntries(new FormData(event.target).entries()))
  }
  return (
    <Dialog open={open} onClose={onClose} type={type}>
      <form onSubmit={onFormSubmit}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>{children}</DialogContent>
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
