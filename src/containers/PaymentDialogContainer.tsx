import type { FC } from 'react'
import DeleteConfirmation from '../components/DeleteConfirmation'
import PaymentForm from '../components/PaymentForm'
import PaymentViewDialog from '../components/PaymentViewDialog'
import { usePaymentDialog } from '../context/DialogProviders'
import {
  useCreatePaymentMutation,
  useDeletePaymentMutation,
  useUpdatePaymentMutation,
} from '../redux/apiSlice'
import type { Payment, SubmitPayment } from '../redux/types'

const PaymentDialogContainer: FC = () => {
  const dialog = usePaymentDialog()
  const [createPayment] = useCreatePaymentMutation()
  const [updatePayment] = useUpdatePaymentMutation()
  const [deletePayment] = useDeletePaymentMutation()

  const onCreateSubmit = async (_: any, data: SubmitPayment) => {
    const paymentData = await createPayment(data).unwrap()
    dialog.setPage(0)
    dialog.setViewId(paymentData.id)
    dialog.setViewOpen(true)
  }

  const onEdit = (data: Payment) => {
    dialog.setEditItem(data)
    dialog.setViewOpen(false)
    dialog.setEditOpen(true)
  }

  const onSubmit = async (
    oldPayment: SubmitPayment | null,
    payment: SubmitPayment,
  ) => {
    if (oldPayment == null || !oldPayment.id) {
      alert('Update payment error')
      return
    }
    await updatePayment({ id: oldPayment.id, ...payment }).unwrap()
    dialog.setEditOpen(false)
    dialog.setViewOpen(true)
  }

  const onDeleteSubmit = async () => {
    if (dialog.viewId == null) return
    await deletePayment({ id: dialog.viewId }).unwrap()
    dialog.setPage(0)
    dialog.setViewOpen(false)
    dialog.setViewId(null)
  }

  return (
    <>
      <PaymentForm
        onClose={() => dialog.setCreateOpen(false)}
        onSubmit={onCreateSubmit}
        open={dialog.createOpen}
        title="Add payment"
      />
      <PaymentViewDialog
        open={dialog.viewOpen}
        onClose={() => {
          dialog.setViewOpen(false)
          dialog.setViewId(null)
        }}
        paymentId={dialog.viewId}
        onEdit={onEdit}
        onDelete={() => dialog.setDeleteOpen(true)}
      />
      <PaymentForm
        open={dialog.editOpen}
        payment={dialog.editItem}
        onClose={() => dialog.setEditOpen(false)}
        onSubmit={onSubmit}
        title="Edit payment"
      />
      <DeleteConfirmation
        onClose={() => dialog.setDeleteOpen(false)}
        onSubmit={onDeleteSubmit}
        open={dialog.deleteOpen}
        title="Are you sure you want to delete this payment?"
      />
    </>
  )
}

export default PaymentDialogContainer
