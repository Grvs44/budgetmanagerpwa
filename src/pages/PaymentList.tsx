import { FC, useEffect } from 'react'
import AddIcon from '@mui/icons-material/Add'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import List from '@mui/material/List'
import Typography from '@mui/material/Typography'
import { useDispatch } from 'react-redux'
import PaymentListItem from '../components/PaymentListItem'
import { usePaymentDialog } from '../context/DialogProviders'
import { useGetPaymentsQuery } from '../redux/apiSlice'
import { setTitle } from '../redux/titleSlice'

const PaymentList: FC = () => {
  const dispatch = useDispatch()
  const dialog = usePaymentDialog()
  const query = useGetPaymentsQuery({ offset: dialog.page * 10 })

  useEffect(() => {
    dispatch(setTitle('Payments'))
  }, [])

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
            <PaymentListItem item={item} key={item.id} onClick={onItemClick} />
          ))}
        </List>
      ) : (
        <p>No payments</p>
      )}
      {list.next ? (
        <Button onClick={() => dialog.setPage((page) => page + 1)}>
          Load more
        </Button>
      ) : null}
    </Container>
  )
}

export default PaymentList
