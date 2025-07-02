// Help from https://github.com/mui/material-ui/issues/12759#issuecomment-1674377620
import { FC, useEffect } from 'react'
import MuiDialog from '@mui/material/Dialog'
import type { DialogProps } from '@mui/material/Dialog'

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
  const onDialogClose: OnClose = (event, reason) => {
    if (reason == 'backClick') reason = 'escapeKeyDown'
    onClose ? onClose(event, reason) : null
  }
  const listener = (e: PopStateEvent) => {
    if (e.state?.type == type) onDialogClose({}, 'backClick')
  }
  useEffect(() => {
    if (props.open) {
      history.pushState({ type }, '')
      addEventListener('popstate', listener)
    } else {
      removeEventListener('popstate', listener)
    }
  }, [props.open])
  return <MuiDialog onClose={onDialogClose} {...props} />
}

export default Dialog
