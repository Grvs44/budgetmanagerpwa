import type { FC } from 'react'
import Skeleton from '@mui/material/Skeleton'
import Typography from '@mui/material/Typography'
import type { User } from '../redux/types'
import { showUserDetails } from '../redux/utils'

export type ModifiedTextProps = {
  data?: {
    last_modified: string
    modified_by: number | null
  }
  user: {
    data?: User
    isFetching: boolean
  }
}

const ModifiedText: FC<ModifiedTextProps> = (props) => (
  <Typography>
    Last modified on {props.data?.last_modified} by{' '}
    {props.data?.modified_by ? (
      props.user.isFetching ? (
        <Skeleton />
      ) : (
        showUserDetails(props.user.data)
      )
    ) : (
      'Administrator'
    )}
  </Typography>
)

export default ModifiedText
