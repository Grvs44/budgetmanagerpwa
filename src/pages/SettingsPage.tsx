// Adapted from Grvs44/Inclusive-Venues
import { FC, useEffect } from 'react'
import { Container, Divider, Typography } from '@mui/material'
import { useDispatch } from 'react-redux'
import LicenseContainer from '../containers/LicenseContainer'
import SettingsContainer from '../containers/SettingsContainer'
import { setTitle } from '../redux/titleSlice'

const SettingsPage: FC = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setTitle('Settings'))
  }, [])

  return (
    <Container>
      <SettingsContainer />
      <Divider />
      <Typography color="textSecondary">
        Version {import.meta.env.VITE_VERSION} by Elli Greaves (2025)
      </Typography>
      <LicenseContainer />
    </Container>
  )
}

export default SettingsPage
