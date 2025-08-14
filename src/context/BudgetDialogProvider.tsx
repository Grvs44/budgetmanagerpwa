import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from 'react'
import type { Budget } from '../redux/types'

export type BudgetDialogContext = {
  viewOpen: boolean
  setViewOpen: Dispatch<boolean>
  viewBudget: number | null
  setViewBudget: Dispatch<number | null>

  editOpen: boolean
  setEditOpen: Dispatch<boolean>
  editBudget: Budget | null
  setEditBudget: Dispatch<Budget | null>

  createOpen: boolean
  setCreateOpen: Dispatch<boolean>

  deleteOpen: boolean
  setDeleteOpen: Dispatch<boolean>

  // TODO: move to Redux
  page: number
  setPage: Dispatch<SetStateAction<number>>
}

const BudgetDialogContext = createContext<BudgetDialogContext>({
  viewOpen: false,
  setViewOpen: () => {},
  viewBudget: null,
  setViewBudget: () => {},

  editOpen: false,
  setEditOpen: () => {},
  editBudget: null,
  setEditBudget: () => {},

  createOpen: false,
  setCreateOpen: () => {},

  deleteOpen: false,
  setDeleteOpen: () => {},

  page: 0,
  setPage: () => {},
})

export const useBudgetDialog = () => useContext(BudgetDialogContext)

const BudgetDialogProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [budgetViewOpen, setBudgetViewOpen] = useState<boolean>(false)
  const [viewBudget, setViewBudget] = useState<number | null>(null)

  const [budgetEditOpen, setBudgetEditOpen] = useState<boolean>(false)
  const [editBudget, setEditBudget] = useState<Budget | null>(null)

  const [budgetCreateOpen, setBudgetCreateOpen] = useState<boolean>(false)

  const [deleteOpen, setDeleteOpen] = useState<boolean>(false)

  const [page, setPage] = useState<number>(0)

  const value: BudgetDialogContext = {
    viewOpen: budgetViewOpen,
    setViewOpen: setBudgetViewOpen,
    viewBudget,
    setViewBudget,

    editOpen: budgetEditOpen,
    setEditOpen: setBudgetEditOpen,
    editBudget,
    setEditBudget,

    createOpen: budgetCreateOpen,
    setCreateOpen: setBudgetCreateOpen,

    deleteOpen,
    setDeleteOpen,

    page,
    setPage,
  }

  return (
    <BudgetDialogContext.Provider value={value}>
      {children}
    </BudgetDialogContext.Provider>
  )
}

export default BudgetDialogProvider
