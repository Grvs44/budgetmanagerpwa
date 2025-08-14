import { createContext, FC, ReactNode, useContext, useState } from 'react'
import type { Budget } from '../redux/types'
import { DialogContext } from './types'

const BudgetDialogContext = createContext<DialogContext<Budget>>({
  viewOpen: false,
  setViewOpen: () => {},
  viewId: null,
  setViewId: () => {},

  editOpen: false,
  setEditOpen: () => {},
  editItem: null,
  setEditItem: () => {},

  createOpen: false,
  setCreateOpen: () => {},

  deleteOpen: false,
  setDeleteOpen: () => {},

  page: 0,
  setPage: () => {},
})

export const useBudgetDialog = () => useContext(BudgetDialogContext)

const BudgetDialogProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [viewOpen, setViewOpen] = useState<boolean>(false)
  const [viewId, setViewId] = useState<number | null>(null)

  const [editOpen, setEditOpen] = useState<boolean>(false)
  const [editItem, setEditItem] = useState<Budget | null>(null)

  const [createOpen, setCreateOpen] = useState<boolean>(false)

  const [deleteOpen, setDeleteOpen] = useState<boolean>(false)

  const [page, setPage] = useState<number>(0)

  const value: DialogContext<Budget> = {
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

  return (
    <BudgetDialogContext.Provider value={value}>
      {children}
    </BudgetDialogContext.Provider>
  )
}

export default BudgetDialogProvider
