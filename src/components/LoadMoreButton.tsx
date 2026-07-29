import { FC } from 'react'
import Button from '@mui/material/Button'

const LoadMoreButton: FC<{ onClick: () => void }> = (props) => {
  return <Button onClick={props.onClick} fullWidth>Load more</Button>
}

export default LoadMoreButton
