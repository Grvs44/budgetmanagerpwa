import { JSX } from 'react/jsx-runtime'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'

export type FormDialogProps = {
  children: JSX.Element
  onClose: () => void
  onSubmit: (data: any) => void
  open: boolean
  title: string
}

export default function FormDialog({
  children,
  onClose,
  onSubmit,
  open,
  title,
}: FormDialogProps) {
  const onFormSubmit = (event: any) => {
    event.preventDefault()
    onSubmit(Object.fromEntries(new FormData(event.target).entries()))
  }
  return (
    <Dialog open={open} onClose={onClose}>
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
