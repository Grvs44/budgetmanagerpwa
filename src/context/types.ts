import type { Dispatch, SetStateAction } from 'react'
import type { Entity } from '../redux/types'

export type DialogContext<T extends Entity> = {
  viewOpen: boolean
  setViewOpen: Dispatch<boolean>
  viewId: number | null
  setViewId: Dispatch<number | null>

  editOpen: boolean
  setEditOpen: Dispatch<boolean>
  editItem: T | null
  setEditItem: Dispatch<T | null>

  createOpen: boolean
  setCreateOpen: Dispatch<boolean>

  deleteOpen: boolean
  setDeleteOpen: Dispatch<boolean>

  // TODO: move to Redux
  page: number
  setPage: Dispatch<SetStateAction<number>>
}

export const defaultValue: DialogContext<any> = {
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
}
