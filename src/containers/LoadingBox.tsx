import { FC, useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'

const LoadingBox: FC = () => {
  const [height, setHeight] = useState<number>(window.innerHeight)

  useEffect(() => {
    const listener = () => setHeight(window.innerHeight)
    window.addEventListener('resize', listener)
    return () => window.removeEventListener('resize', listener)
  }, [])

  return (
    <Box sx={{ position: 'relative', height }}>
      <Box
        sx={{
          margin: 0,
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <CircularProgress />
      </Box>
    </Box>
  )
}

export default LoadingBox
