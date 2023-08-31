import { fetchJson } from './api'

export async function getUser(id: number) {
  return await fetchJson(`user/${id}/`)
}
