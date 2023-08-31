import { getObject } from './api'

export async function getUser(id: number) {
  return await getObject('user', id)
}
