import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import SavingsIcon from '@mui/icons-material/Savings'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import Skeleton from '@mui/material/Skeleton'
import Typography from '@mui/material/Typography'
import { useGetBudgetQuery, useGetPayeeQuery } from '../redux/apiSlice'
import { useCurrency } from '../redux/settingsSlice'
import type { PaymentItem } from '../redux/types'
import { getPaymentTitle } from '../redux/utils'

export type PaymentListItemProps = {
  item: PaymentItem
  onClick: (id: number) => void
}

export default function PaymentListItem({
  item,
  onClick,
}: PaymentListItemProps) {
  const currency = useCurrency()
  const payee = useGetPayeeQuery(item.payee)
  const budget = useGetBudgetQuery(payee?.data?.budget, {
    skip: payee.isFetching || payee.data == undefined,
  })

  return (
    <ListItem>
      <ListItemButton onClick={() => onClick(item.id)}>
        <ListItemText
          primary={
            payee.data ? (
              getPaymentTitle(item, payee.data, currency)
            ) : (
              <Skeleton />
            )
          }
          secondary={
            <>
              <Typography>
                <CalendarMonthIcon titleAccess='Date' />
                {new Date(item.date).toLocaleDateString()}
              </Typography>
              <Typography>
                {budget.data && !payee.isFetching ? (
                  <>
                    <SavingsIcon titleAccess='Budget' />
                    {budget.data.name}
                  </>
                ) : (
                  <Skeleton />
                )}
              </Typography>
            </>
          }
        />
      </ListItemButton>
    </ListItem>
  )
}
