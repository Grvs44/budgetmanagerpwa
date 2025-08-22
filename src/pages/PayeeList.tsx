import { FC, useEffect } from 'react'
import AddIcon from '@mui/icons-material/Add'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import List from '@mui/material/List'
import Typography from '@mui/material/Typography'
import { useDispatch } from 'react-redux'
import PayeeListItem from '../components/PayeeListItem'
import { usePayeeDialog } from '../context/DialogProviders'
import { useGetPayeesQuery } from '../redux/apiSlice'
import { setTitle } from '../redux/titleSlice'

const PayeeList: FC = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setTitle('Payees'))
  }, [])
  const dialog = usePayeeDialog()
  const query = useGetPayeesQuery({ offset: dialog.page * 10 })

  const list = query.data
  if (query.isFetching || !list) return <p>Loading...</p>

  const onItemClick = (id: number) => {
    dialog.setViewId(id)
    dialog.setViewOpen(true)
  }

  return (
    <Container>
      <Button onClick={() => dialog.setCreateOpen(true)}>
        <AddIcon /> New
      </Button>
      <Typography>
        Showing {list.results.length} of {list.count}
      </Typography>
      {list.count ? (
        <List>
          {list.results.map((item) => (
            <PayeeListItem item={item} key={item.id} onClick={onItemClick} />
          ))}
        </List>
      ) : (
        <p>No payees</p>
      )}
      {list.next ? (
        <Button onClick={() => dialog.setPage((page) => page + 1)}>
          Load more
        </Button>
      ) : null}
    </Container>
  )
}

export default PayeeList
