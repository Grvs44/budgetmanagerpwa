import { FC, useState } from 'react'
import { useParams } from 'react-router-dom'
import JoinDialog from '../containers/JoinDialog'

const JoinPage: FC = () => {
  const params = useParams()
  const [open, setOpen] = useState<boolean>(true)
  return (
    <JoinDialog id={params.id} open={open} onClose={() => setOpen(false)} />
  )
}

export default JoinPage
