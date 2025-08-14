import { User } from './types'

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
