import { fetchJson, sendJson } from './api'

export async function getPayee(id: number) {
  return await fetchJson(`payee/${id}/`)
}

export async function getPayees(filters: string) {
  return await fetchJson(`payee/?${filters}`)
}

export async function createPayee(data: object) {
  return await sendJson('payee/', {
    method: 'post',
    body: JSON.stringify(data),
  })
}

export async function updatePayee(id: number, changes: object) {
  return await sendJson(`payee/${id}/`, {
    method: 'put',
    body: JSON.stringify(changes),
  })
}

export async function deletePayee(id: number) {
  return await sendJson(`payee/${id}`, {
    method: 'delete',
  })
}
