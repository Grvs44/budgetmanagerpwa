import React from 'react'
import { useParams } from 'react-router-dom'
import JoinDialog from '../containers/JoinDialog'

const JoinPage: React.FC = () => {
  const params = useParams()
  const [open, setOpen] = React.useState<boolean>(true)
  return (
    <JoinDialog id={params.id} open={open} onClose={() => setOpen(false)} />
  )
}

export default JoinPage
