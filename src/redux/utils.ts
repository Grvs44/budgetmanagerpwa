import type { PageFilter, User } from './types'

export const showUserDetails = (user: User | null | undefined) =>
  user
    ? user.first_name
      ? user.last_name
        ? user.first_name + ' ' + user.last_name
        : user.first_name
      : user.username
    : 'Administrator'

export const getPaymentTitle = (
  payment: { amount: number },
  payee: { name: string },
  currency: string,
) =>
  currency +
  Math.abs(payment.amount).toFixed(2) +
  ' ' +
  (payment.amount > 0 ? 'from' : 'to') +
  ' ' +
  payee.name

// Adapted from https://github.com/Grvs44/Part-3-Project/blob/main/react/src/redux/utils.ts
export const getFilterQuery = (filters: PageFilter) => {
  const entries = Object.entries(filters).filter((e) => e[1] != undefined)
  if (entries.length == 0) return ''
  return '&' + new URLSearchParams(entries).toString()
}
