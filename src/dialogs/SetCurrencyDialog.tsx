import type { FC, FormEventHandler } from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import TextField from '@mui/material/TextField'

export type SetCurrencyDialogProps = {
  open: boolean
  onClose: () => void
  onSubmit: (value: string) => void
  defaultValue?: string
}

const SetCurrencyDialog: FC<SetCurrencyDialogProps> = (props) => {
  const onSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault()
    props.onSubmit(new FormData(event.currentTarget).get('currency') as any)
  }

  return (
    <Dialog
      open={props.open}
      onClose={props.onClose}
      slotProps={{ paper: { component: 'form', onSubmit } }}
    >
      <DialogTitle>Set currency</DialogTitle>
      <DialogContent>
        <TextField
          name="currency"
          label="Currency"
          defaultValue={props.defaultValue}
          autoFocus
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
          Save
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default SetCurrencyDialog
