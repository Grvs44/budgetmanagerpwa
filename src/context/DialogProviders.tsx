import {
  Context,
  createContext,
  FC,
  ReactNode,
  useContext,
  useState,
} from 'react'
import type { Budget, Entity, Payee, Payment } from '../redux/types'
import { defaultValue, DialogContext } from './types'

export type ProviderProps = {
  children: ReactNode
}

const BudgetDialogContext = createContext<DialogContext<Budget>>(defaultValue)
const PayeeDialogContext = createContext<DialogContext<Payee>>(defaultValue)
const PaymentDialogContext = createContext<DialogContext<Payment>>(defaultValue)

export const useBudgetDialog = () => useContext(BudgetDialogContext)
export const usePayeeDialog = () => useContext(PayeeDialogContext)
export const usePaymentDialog = () => useContext(PaymentDialogContext)

function DialogProvider<T extends Entity>({
  children,
  Context,
}: ProviderProps & {
  Context: Context<DialogContext<T>>
}) {
  const [viewOpen, setViewOpen] = useState<boolean>(false)
  const [viewId, setViewId] = useState<number | null>(null)

  const [editOpen, setEditOpen] = useState<boolean>(false)
  const [editItem, setEditItem] = useState<T | null>(null)

  const [createOpen, setCreateOpen] = useState<boolean>(false)

  const [deleteOpen, setDeleteOpen] = useState<boolean>(false)

  const [page, setPage] = useState<number>(0)

  const value: DialogContext<T> = {
    viewOpen,
    setViewOpen,
    viewId,
    setViewId,

    editOpen,
    setEditOpen,
    editItem,
    setEditItem,

    createOpen,
    setCreateOpen,

    deleteOpen,
    setDeleteOpen,

    page,
    setPage,
  }

  return <Context.Provider value={value}>{children}</Context.Provider>
}

const DialogProviders: FC<ProviderProps> = (props) => (
  <DialogProvider Context={BudgetDialogContext}>
    <DialogProvider Context={PayeeDialogContext}>
      <DialogProvider Context={PaymentDialogContext} {...props} />
    </DialogProvider>
  </DialogProvider>
)

export default DialogProviders
