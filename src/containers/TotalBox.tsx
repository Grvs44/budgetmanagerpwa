import { FC, useState } from 'react'
import Button from '@mui/material/Button'
import Skeleton from '@mui/material/Skeleton'
import Typography from '@mui/material/Typography'
import { useSelector } from 'react-redux'
import { useGetTotalQuery } from '../redux/apiSlice'
import { State } from '../redux/types'

const TotalBox: FC = () => {
  const [skip, setSkip] = useState<boolean>(true)
  const total = useGetTotalQuery(undefined, { skip })
  const currency = useSelector((state: State) => state.settings.currency)

  return (
    <Typography variant="h6">
      {total.isFetching ? (
        <Skeleton />
      ) : (
        <>
          Total: {currency}
          {skip ? '----' : total.data}
          <Button onClick={() => setSkip((skip) => !skip)}>
            {skip ? 'Show' : 'Hide'}
          </Button>
        </>
      )}
    </Typography>
  )
}

export default TotalBox
