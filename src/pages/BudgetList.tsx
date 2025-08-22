import { FC, useEffect, useState } from 'react'
import AddIcon from '@mui/icons-material/Add'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import List from '@mui/material/List'
import Typography from '@mui/material/Typography'
import { useDispatch } from 'react-redux'
import BudgetListItem from '../components/BudgetListItem'
import BudgetFilterDialog from '../containers/BudgetFilterDialog'
import { useBudgetDialog } from '../context/DialogProviders'
import { useGetBudgetsQuery } from '../redux/apiSlice'
import { setTitle } from '../redux/titleSlice'

const BudgetList: FC = () => {
  const dispatch = useDispatch()
  const dialog = useBudgetDialog()
  const query = useGetBudgetsQuery({ offset: dialog.page * 10 })
  const [filtersOpen, setFiltersOpen] = useState<boolean>(false)

  useEffect(() => {
    dispatch(setTitle('Budgets'))
  }, [])

  if (query.isFetching) return <p>Loading...</p>
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
        open={filtersOpen}
        onClose={() => setFiltersOpen(false)}
      />
      {list?.count ? (
        <List>
          {list.results.map((item) => (
            <BudgetListItem item={item} key={item.id} onClick={onItemClick} />
          ))}
        </List>
      ) : (
        <p>No budgets</p>
      )}
      {list?.next ? (
        <Button onClick={() => dialog.setPage((page) => page + 1)}>
          Load more
        </Button>
      ) : null}
    </Container>
  )
}

export default BudgetList
