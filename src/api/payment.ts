import { fetchJson, sendJson } from './api'

export async function getPament(id: number) {
  return await fetchJson(`payment/${id}/`)
}

export async function getPayments(filters: string) {
  return await fetchJson(`payment/?${filters}`)
}

export async function createPayment(data: object) {
  return await sendJson('payment/', {
    method: 'post',
    body: JSON.stringify(data),
  })
}

export async function updatePayment(id: number, changes: object) {
  return await sendJson(`payment/${id}/`, {
    method: 'put',
    body: JSON.stringify(changes),
  })
}

export async function deletePayment(id: number) {
  return await sendJson(`payment/${id}`, {
    method: 'delete',
  })
}
