import { FC, useEffect, useState } from 'react'
import AddIcon from '@mui/icons-material/Add'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import List from '@mui/material/List'
import Typography from '@mui/material/Typography'
import { useDispatch } from 'react-redux'
import { FilterMode } from '../components/FilterModeSelect'
import PaymentListItem from '../components/PaymentListItem'
import PaymentFilterDialog, {
  PaymentDialogFilters,
} from '../containers/PaymentFilterDialog'
import { usePaymentDialog } from '../context/DialogProviders'
import { useGetPaymentsQuery } from '../redux/apiSlice'
import { setTitle } from '../redux/titleSlice'
import type { PaymentFilters } from '../redux/types'

const getFilters = (filters: PaymentDialogFilters) => {
  const newFilters: PaymentFilters = {
    payee: filters.payee?.id,
    payee__budget: filters.payee ? undefined : filters.budget?.id,
    ordering: filters.ordering,
    pending: filters.pending,
  }
  if (filters.amount) {
    switch (filters.amountMode) {
      case FilterMode.Equal:
        newFilters.amount = filters.amount
        break
      case FilterMode.More:
        newFilters.amount_gt = filters.amount
        break
      default:
        newFilters.amount_lt = filters.amount
    }
  }
  if (filters.date) {
    const dateStr = filters.date.format('YYYY-MM-DD')
    switch (filters.dateMode) {
      case FilterMode.Equal:
        newFilters.date = dateStr
        break
      case FilterMode.More:
        newFilters.date_gt = dateStr
        break
      default:
        newFilters.date_lt = dateStr
    }
  }
  return newFilters
}

const PaymentList: FC = () => {
  const dispatch = useDispatch()
  const dialog = usePaymentDialog()
  const [filters, setFilters] = useState<PaymentDialogFilters>({})
  const [filtersOpen, setFiltersOpen] = useState<boolean>(false)
  const query = useGetPaymentsQuery({
    offset: dialog.page * 10,
    ...getFilters(filters),
  })

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
      <Button onClick={() => setFiltersOpen(true)}>Filters and search</Button>
      <PaymentFilterDialog
        filters={filters}
        open={filtersOpen}
        onClose={() => setFiltersOpen(false)}
        onSubmit={setFilters}
      />
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
