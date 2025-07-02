// Help from https://github.com/mui/material-ui/issues/12759#issuecomment-1674377620
import { FC, useEffect } from 'react'
import MuiDialog from '@mui/material/Dialog'
import type { DialogProps } from '@mui/material/Dialog'
import { useLocation, useNavigate } from 'react-router-dom'

type OnClose = (
  event: {},
  reason: 'backdropClick' | 'escapeKeyDown' | 'backClick',
) => void

export enum DialogType {
  BudgetView,
  PayeeView,
  PaymentView,
  Edit,
  Other,
}

const Dialog: FC<DialogProps & { type: DialogType }> = ({
  onClose,
  type,
  ...props
}) => {
  const location = useLocation()
  console.log('state', location.state)
  const navigate = useNavigate()

  const onDialogClose: OnClose = (event, reason) => {
    if (reason == 'backClick') reason = 'escapeKeyDown'
    else navigate(-1)
    onClose ? onClose(event, reason) : null
  }

  useEffect(() => {
    if (props.open && location.state?.type != type)
      onDialogClose({}, 'backClick')
  }, [props.open, location.state])

  useEffect(() => {
    if (props.open) {
      navigate('', { state: { type } })
      console.log('push', type)
    }
  }, [props.open])

  return <MuiDialog onClose={onDialogClose} {...props} />
}

export default Dialog
