import React from 'react'
import Container from '@mui/material/Container'
import Divider from '@mui/material/Divider'
import List from '@mui/material/List'
import SetThemeItem from '../components/SetThemeItem'

const SettingsPage: React.FC = () => {
  return (
    <Container>
      <List>
        <SetThemeItem />
        <Divider />
      </List>
    </Container>
  )
}

export default SettingsPage
