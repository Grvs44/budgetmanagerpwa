import React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import TextField from '@mui/material/TextField'
import CloseButton from '../components/CloseButton'
import { useJoinBudgetMutation } from '../redux/apiSlice'

export type JoinDialogProps = {
  id?: string
  open: boolean
  onClose: () => void
}

const JoinDialog: React.FC<JoinDialogProps> = (props) => {
  const [joinBudget] = useJoinBudgetMutation()

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault()
    try {
      await joinBudget(
        Object.fromEntries(new FormData(event.currentTarget).entries()),
      ).unwrap()
      alert('Joined budget')
      props.onClose()
    } catch (error: any) {
      alert('Error joining budget: ' + error?.data?.detail)
    }
  }

  return (
    <Dialog
      open={props.open}
      onClose={props.onClose}
      slotProps={{ paper: { component: 'form', onSubmit } }}
    >
      <DialogTitle>Join Budget</DialogTitle>
      <CloseButton onClick={props.onClose} />
      <DialogContent>
        <TextField
          name="id"
          label="Join code"
          defaultValue={props.id}
          autoFocus
          required
          variant="standard"
          fullWidth
          margin="dense"
        />
      </DialogContent>
      <DialogActions>
        <Button type="button" onClick={props.onClose}>
          Close
        </Button>
        <Button type="submit" variant="contained">
          Join
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default JoinDialog
