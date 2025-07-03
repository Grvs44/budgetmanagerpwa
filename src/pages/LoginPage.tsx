import { FC, FormEventHandler, useState } from 'react'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { useLoginMutation } from '../redux/apiSlice'
import type { UserLogin } from '../redux/types'

// Adapted from Grvs44/Inclusive-Venues
const LoginPage: FC = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [login] = useLoginMutation()

  const onSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const data = Object.fromEntries(formData.entries())
    if (data.username && data.password) {
      setLoading(true)
      const result = await login(data as UserLogin)
      setLoading(false)
      if (result.error) {
        alert('Error logging in')
      }
    } else {
      alert('Username and password are required')
    }
  }

  return (
    <Container sx={{ margin: 'auto', textAlign: 'center' }}>
      <Typography component="h1" variant="h4">
        Log in to Budget Manager
      </Typography>
      <Stack
        direction="column"
        sx={{ margin: 'auto', maxWidth: '20em', textAlign: 'center' }}
        component="form"
        onSubmit={onSubmit}
      >
        <TextField
          name="username"
          label="Username"
          autoFocus
          required
          variant="standard"
        />
        <TextField
          name="password"
          label="Password"
          type="password"
          required
          variant="standard"
        />
        <Button
          type="submit"
          variant="contained"
          loading={loading}
          loadingPosition="start"
        >
          Log in
        </Button>
      </Stack>
    </Container>
  )
}

export default LoginPage
