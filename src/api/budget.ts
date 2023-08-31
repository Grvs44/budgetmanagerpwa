import { fetchJson, sendJson } from './api'

export async function getBudget(id: number) {
  return await fetchJson(`budget/${id}/`)
}

export async function getBudgets(filters: string) {
  return await fetchJson(`budget/?${filters}`)
}

export async function createBudget(data: object) {
  return await sendJson('budget/', {
    method: 'post',
    body: JSON.stringify(data),
  })
}

export async function updateBudget(id: number, changes: object) {
  return await sendJson(`budget/${id}/`, {
    method: 'put',
    body: JSON.stringify(changes),
  })
}

export async function deleteBudget(id: number) {
  return await sendJson(`budget/${id}`, {
    method: 'delete',
  })
}
