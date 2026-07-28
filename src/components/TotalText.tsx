import type { FC } from 'react'
import Button from '@mui/material/Button'
import Skeleton from '@mui/material/Skeleton'
import Typography from '@mui/material/Typography'
import { useCurrency } from '../redux/settingsSlice'

export type TotalTextProps = {
  data?: string
  isFetching: boolean
  show: boolean
  onShow: () => void
}

const TotalText: FC<TotalTextProps> = (props) => {
  const currency = useCurrency()
  return (
    <Typography>
      {props.isFetching ? (
        <Skeleton />
      ) : props.show ? (
        <>Total: {currency + props.data}</>
      ) : (
        <Button onClick={props.onShow}>Show total</Button>
      )}
    </Typography>
  )
}
export default TotalText
