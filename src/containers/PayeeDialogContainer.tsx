import type { FC } from 'react'
import DeleteConfirmation from '../components/DeleteConfirmation'
import PayeeForm from '../components/PayeeForm'
import PayeeViewDialog from '../components/PayeeViewDialog'
import { usePayeeDialog } from '../context/DialogProviders'
import {
  useCreatePayeeMutation,
  useDeletePayeeMutation,
  useUpdatePayeeMutation,
} from '../redux/apiSlice'
import type { Payee, SubmitPayee } from '../redux/types'

const PayeeDialogContainer: FC = () => {
  const dialog = usePayeeDialog()
  const [createPayee] = useCreatePayeeMutation()
  const [updatePayee] = useUpdatePayeeMutation()
  const [deletePayee] = useDeletePayeeMutation()

  const onEdit = (data: Payee) => {
    dialog.setViewOpen(false)
    dialog.setEditItem(data)
    dialog.setEditOpen(true)
  }

  const onSubmit = async (oldPayee: SubmitPayee | null, payee: SubmitPayee) => {
    if (oldPayee == null || !oldPayee.id) {
      alert('Update payee error')
      return
    }
    try {
      await updatePayee({ id: oldPayee.id, ...payee }).unwrap()
      dialog.setEditOpen(false)
      dialog.setViewId(oldPayee.id)
      dialog.setViewOpen(true)
    } catch (e) {
      console.error(e)
      alert(e)
    }
  }

  const onDeleteSubmit = async () => {
    if (dialog.viewId == null) return
    try {
      await deletePayee({ id: dialog.viewId }).unwrap()
      dialog.setPage(0)
      dialog.setViewOpen(false)
      dialog.setViewId(null)
    } catch (e) {
      console.error(e)
      alert(e)
    }
  }

  const onCreateSubmit = async (_: any, data: SubmitPayee) => {
    try {
      const payeeData = await createPayee(data).unwrap()
      dialog.setPage(0)
      dialog.setViewId(payeeData.id)
      dialog.setViewOpen(true)
    } catch (e) {
      console.error(e)
      alert(e)
    }
  }

  return (
    <>
      <PayeeForm
        onClose={() => dialog.setCreateOpen(false)}
        onSubmit={onCreateSubmit}
        open={dialog.createOpen}
        title="Add payee"
      />
      <PayeeViewDialog
        open={dialog.viewOpen}
        onClose={() => {
          dialog.setViewOpen(false)
          dialog.setViewId(null)
        }}
        payeeId={dialog.viewId}
        onEdit={onEdit}
        onDelete={() => dialog.setDeleteOpen(true)}
      />
      <PayeeForm
        payee={dialog.editItem}
        open={dialog.editOpen}
        onClose={() => dialog.setEditOpen(false)}
        onSubmit={onSubmit}
      />
      <DeleteConfirmation
        onClose={() => dialog.setDeleteOpen(false)}
        onSubmit={onDeleteSubmit}
        open={dialog.deleteOpen}
        title="Are you sure you want to delete this payee?"
      />
    </>
  )
}

export default PayeeDialogContainer
