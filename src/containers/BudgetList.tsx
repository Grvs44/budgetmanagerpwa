import AddIcon from '@mui/icons-material/Add'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import List from '@mui/material/List'
import Typography from '@mui/material/Typography'
import BudgetListItem from '../components/BudgetListItem'
import { useBudgetDialog } from '../context/BudgetDialogProvider'
import { useGetBudgetsQuery } from '../redux/apiSlice'

export default function BudgetList() {
  const dialog = useBudgetDialog()
  const query = useGetBudgetsQuery(dialog.page)

  if (query.isFetching) return <p>Loading...</p>
  const list = query.data

  const onItemClick = (id: number) => {
    dialog.setViewBudget(id)
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
