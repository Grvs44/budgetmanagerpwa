// Help from https://github.com/mui/material-ui/issues/12759#issuecomment-1674377620
import { FC, useEffect, useState } from 'react'
import MuiDialog from '@mui/material/Dialog'
import type { DialogProps } from '@mui/material/Dialog'
import { useLocation, useNavigate } from 'react-router-dom'

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

const Dialog: FC<DialogProps & { type: DialogType }> = ({ type, ...props }) => {
  const location = useLocation()
  const navigate = useNavigate()
  const [openState, setOpenState] = useState<OpenState>(OpenState.Initial)

  useEffect(() => {
    if (openState == OpenState.Open && location.state?.type != type) {
      setOpenState(OpenState.Initial)
      props.onClose ? props.onClose({}, 'escapeKeyDown') : null
    }
  }, [location.state])

  useEffect(() => {
    if (props.open && openState == OpenState.Initial) {
      navigate('', { state: { type } })
      console.log('push', type)
      setOpenState(OpenState.Open)
    } else if (!props.open && openState == OpenState.Open) {
      setOpenState(OpenState.Done)
      navigate(-1)
      setOpenState(OpenState.Initial)
    }
  }, [props.open])

  return <MuiDialog {...props} />
}

export default Dialog
