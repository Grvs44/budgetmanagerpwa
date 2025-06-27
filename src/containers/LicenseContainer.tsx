// Adapted from Grvs44/Inclusive-Venues
import React from 'react'
import Button from '@mui/material/Button'
import Skeleton from '@mui/material/Skeleton'
import Typography from '@mui/material/Typography'
import { useGetLicenseQuery } from '../redux/licenseSlice'

const LicenseContainer: React.FC = () => {
  const [open, setOpen] = React.useState<boolean>(false)
  const query = useGetLicenseQuery(undefined, { skip: !open })

  return open ? (
    query.isFetching ? (
      <Skeleton width="100%" />
    ) : query.isError ? (
      <Typography>Error fetching licenses</Typography>
    ) : (
      <textarea
        value={query.data}
        style={{
          height: 200,
          width: '100%',
          marginTop: '1em',
          resize: 'vertical',
        }}
        readOnly
      />
    )
  ) : (
    <Button onClick={() => setOpen(true)}>View licenses</Button>
  )
}

export default LicenseContainer
