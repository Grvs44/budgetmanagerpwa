import { FC, useState } from 'react'
import Container from '@mui/material/Container'
import Divider from '@mui/material/Divider'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import { useDispatch, useSelector } from 'react-redux'
import SetCurrencyDialog from '../components/SetCurrencyDialog'
import SetThemeItem from '../components/SetThemeItem'
import { setCurrency } from '../redux/settingsSlice'
import type { State } from '../redux/types'

const SettingsContainer: FC = () => {
  const dispatch = useDispatch()
  const [currencyOpen, setCurrencyOpen] = useState<boolean>(false)
  const settings = useSelector((state: State) => state.settings)

  const submitCurrency = (value: string) => {
    dispatch(setCurrency(value))
    setCurrencyOpen(false)
  }

  return (
    <Container>
      <List>
        <SetThemeItem />
        <Divider />
        <ListItem>
          <ListItemButton onClick={() => setCurrencyOpen(true)}>
            Currency: {settings.currency || '(not set)'}
          </ListItemButton>
        </ListItem>
      </List>
      <SetCurrencyDialog
        open={currencyOpen}
        onClose={() => setCurrencyOpen(false)}
        onSubmit={submitCurrency}
        defaultValue={settings.currency}
      />
    </Container>
  )
}

export default SettingsContainer
