import type { FC } from 'react'
import BudgetForm, { BudgetFormProps } from '../components/BudgetForm'
import BudgetViewDialog from '../components/BudgetViewDialog'
import DeleteConfirmation from '../components/DeleteConfirmation'
import { useBudgetDialog } from '../context/BudgetDialogProvider'
import {
  useCreateBudgetMutation,
  useDeleteBudgetMutation,
  useUpdateBudgetMutation,
} from '../redux/apiSlice'
import type { Budget, SubmitBudget } from '../redux/types'

const BudgetDialogContainer: FC = () => {
  const dialog = useBudgetDialog()
  const [updateBudget] = useUpdateBudgetMutation()
  const [createBudget] = useCreateBudgetMutation()
  const [deleteBudget] = useDeleteBudgetMutation()

  const onEdit = ({ budget }: { budget: Budget }) => {
    dialog.setViewOpen(false)
    dialog.setEditBudget(budget)
    dialog.setEditOpen(true)
  }

  const onSubmit: BudgetFormProps['onSubmit'] = async (oldBudget, budget) => {
    const newBudget: Budget = {
      ...budget,
      id: oldBudget?.id,
      active: budget.active === 'on',
    }
    await updateBudget(newBudget).unwrap()
    dialog.setEditOpen(false)
    dialog.setViewBudget(newBudget.id)
    dialog.setViewOpen(true)
  }

  const onDeleteSubmit = async () => {
    try {
      if (dialog.viewBudget == null) return
      dialog.setPage(0)
      await deleteBudget({ id: dialog.viewBudget }).unwrap()
      dialog.setViewOpen(false)
      dialog.setViewBudget(null)
    } catch (error) {
      console.error(error)
    }
  }

  const onCreateSubmit = async (_: any, data: SubmitBudget) => {
    try {
      const budget = await createBudget(data).unwrap()
      dialog.setPage(0)
      dialog.setViewBudget(budget.id)
      dialog.setViewOpen(true)
    } catch (e) {
      console.error(e)
      alert('Error: ' + e)
    }
  }
  return (
    <>
      <BudgetForm
        onClose={() => dialog.setCreateOpen(false)}
        onSubmit={onCreateSubmit}
        open={dialog.createOpen}
        title="Add budget"
      />
      <BudgetViewDialog
        open={dialog.viewOpen}
        onClose={() => {
          dialog.setViewOpen(false)
          dialog.setViewBudget(null)
        }}
        budgetId={dialog.viewBudget}
        onEdit={onEdit}
        onDelete={() => dialog.setDeleteOpen(true)}
      />
      <BudgetForm
        budget={dialog.editBudget}
        open={dialog.editOpen}
        onClose={() => dialog.setEditOpen(false)}
        onSubmit={onSubmit}
      />
      <DeleteConfirmation
        onClose={() => dialog.setDeleteOpen(false)}
        onSubmit={onDeleteSubmit}
        open={dialog.deleteOpen}
        title="Are you sure you want to delete this budget?"
      />
    </>
  )
}

export default BudgetDialogContainer
