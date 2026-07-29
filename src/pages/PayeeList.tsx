import { FC, useEffect, useState } from 'react'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import List from '@mui/material/List'
import Typography from '@mui/material/Typography'
import { useDispatch } from 'react-redux'
import LoadMoreButton from '../components/LoadMoreButton'
import NewFab from '../components/NewFab'
import PayeeListItem from '../components/PayeeListItem'
import ListSkeleton from '../containers/ListSkeleton'
import PayeeFilterDialog, {
  PayeeDialogFilters,
} from '../containers/PayeeFilterDialog'
import { usePayeeDialog } from '../context/DialogProviders'
import { useGetPayeesQuery } from '../redux/apiSlice'
import { setTitle } from '../redux/titleSlice'

const getFilters = ({ budget, ...filters }: PayeeDialogFilters) => ({
  ...filters,
  budget: budget?.id,
})

const PayeeList: FC = () => {
  const dispatch = useDispatch()
  const dialog = usePayeeDialog()
  const [filters, setFilters] = useState<PayeeDialogFilters>({
    ordering: 'name',
  })
  const [filtersOpen, setFiltersOpen] = useState<boolean>(false)
  const query = useGetPayeesQuery({
    offset: dialog.page * 10,
    ...getFilters(filters),
  })

  useEffect(() => {
    dispatch(setTitle('Payees'))
  }, [])

  const onItemClick = (id: number) => {
    dialog.setViewId(id)
    dialog.setViewOpen(true)
  }

  const list = query.data
  if (query.isFetching || !list) return <ListSkeleton />

  return (
    <Container>
      <NewFab onClick={() => dialog.setCreateOpen(true)} />
      <Typography>
        Showing {list.results.length} of {list.count}
      </Typography>
      <Button onClick={() => setFiltersOpen(true)}>Filters and search</Button>
      <PayeeFilterDialog
        filters={filters}
        open={filtersOpen}
        onClose={() => setFiltersOpen(false)}
        onSubmit={setFilters}
      />
      {list.count ? (
        <List>
          {list.results.map((item) => (
            <PayeeListItem item={item} key={item.id} onClick={onItemClick} />
          ))}
        </List>
      ) : (
        <Typography>
          You currently don't have any payees. Check the filters above or create
          a new one.
        </Typography>
      )}
      {list?.next ? (
        <LoadMoreButton onClick={() => dialog.setPage((page) => page + 1)} />
      ) : null}
    </Container>
  )
}

export default PayeeList
