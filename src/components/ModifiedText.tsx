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

const ModifiedText: FC<ModifiedTextProps> = (props) =>
  props.data ? (
    <Typography>
      Last modified on {new Date(props.data.last_modified).toLocaleString()} by{' '}
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
  ) : null

export default ModifiedText
