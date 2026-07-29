import { FC, useEffect, useState } from 'react'
import AddIcon from '@mui/icons-material/Add'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import List from '@mui/material/List'
import Typography from '@mui/material/Typography'
import { useDispatch } from 'react-redux'
import BudgetListItem from '../components/BudgetListItem'
import LoadMoreButton from '../components/LoadMoreButton'
import BudgetFilterDialog from '../containers/BudgetFilterDialog'
import ListSkeleton from '../containers/ListSkeleton'
import { useBudgetDialog } from '../context/DialogProviders'
import { useGetBudgetsQuery } from '../redux/apiSlice'
import { setTitle } from '../redux/titleSlice'
import type { BudgetFilters } from '../redux/types'

const BudgetList: FC = () => {
  const dispatch = useDispatch()
  const dialog = useBudgetDialog()
  const [filters, setFilters] = useState<BudgetFilters>({
    ordering: 'name',
  })
  const query = useGetBudgetsQuery({ offset: dialog.page * 10, ...filters })
  const [filtersOpen, setFiltersOpen] = useState<boolean>(false)

  useEffect(() => {
    dispatch(setTitle('Budgets'))
  }, [])

  if (query.isFetching) return <ListSkeleton />
  const list = query.data

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
        Showing {list?.results.length} of {list?.count}
      </Typography>
      <Button onClick={() => setFiltersOpen(true)}>Filters and search</Button>
      <BudgetFilterDialog
        filters={filters}
        open={filtersOpen}
        onClose={() => setFiltersOpen(false)}
        onSubmit={setFilters}
      />
      {list?.count ? (
        <List>
          {list.results.map((item) => (
            <BudgetListItem item={item} key={item.id} onClick={onItemClick} />
          ))}
        </List>
      ) : (
        <Typography>
          You currently don't have any budgets. Click "New" above to create one.
        </Typography>
      )}
      {list?.next ? (
        <LoadMoreButton onClick={() => dialog.setPage((page) => page + 1)} />
      ) : null}
    </Container>
  )
}

export default BudgetList
