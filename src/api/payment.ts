import {
  createObject,
  deleteObject,
  getList,
  getObject,
  updateObject,
} from './api'

export async function getPament(id: number) {
  return await getObject('payment', id)
}

export async function getPayments(params: Record<string, string>) {
  return await getList('payment', params)
}

export async function createPayment(data: object) {
  return await createObject('payment', data)
}

export async function updatePayment(id: number, data: object) {
  return await updateObject('payment', id, data)
}

export async function deletePayment(id: number) {
  return await deleteObject('payment', id)
}
