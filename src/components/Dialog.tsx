// Help from https://github.com/mui/material-ui/issues/12759#issuecomment-1674377620
import { FC, useEffect, useState } from 'react'
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

enum OpenState {
  Initial,
  Open,
  Done,
}

const Dialog: FC<DialogProps & { type: DialogType }> = ({
  onClose,
  type,
  ...props
}) => {
  const location = useLocation()
  const navigate = useNavigate()
  const [openState, setOpenState] = useState<OpenState>(OpenState.Initial)

  const onDialogClose: OnClose = (event, reason) => {
    setOpenState(OpenState.Done)
    if (reason == 'backClick') reason = 'escapeKeyDown'
    else navigate(-1)
    onClose ? onClose(event, reason) : null
    setOpenState(OpenState.Initial)
  }

  useEffect(() => {
    if (openState == OpenState.Open && location.state?.type != type)
      onDialogClose({}, 'backClick')
  }, [location.state])

  useEffect(() => {
    if (props.open && openState == OpenState.Initial) {
      navigate('', { state: { type } })
      console.log('push', type)
      setOpenState(OpenState.Open)
    }
  }, [props.open])

  return <MuiDialog onClose={onDialogClose} {...props} />
}

export default Dialog
