import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App'
import DialogProviders from './context/DialogProviders'
import BudgetPage from './pages/BudgetPage'
import ErrorPage from './pages/ErrorPage'
import HomePage from './pages/HomePage'
import JoinPage from './pages/JoinPage'
import PayeePage from './pages/PayeePage'
import PaymentPage from './pages/PaymentPage'
import SettingsPage from './pages/SettingsPage'
import store from './redux/store'
import theme from './theme'

const router = createBrowserRouter([
  {
    path: import.meta.env.BASE_URL,
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '',
        element: <HomePage />,
        children: [
          {
            path: 'join',
            element: <JoinPage />,
          },
          {
            path: 'join/:id',
            element: <JoinPage />,
          },
        ],
      },
      {
        path: 'budget',
        element: <BudgetPage />,
      },
      {
        path: 'payee',
        element: <PayeePage />,
      },
      {
        path: 'payment',
        element: <PaymentPage />,
      },
      {
        path: 'budget/:budgetId/payee',
        element: <PayeePage />,
      },
      {
        path: 'budget/:budgetId/payment',
        element: <PaymentPage />,
      },
      {
        path: 'payee/:payeeId/payment',
        element: <PaymentPage />,
      },
      {
        path: 'settings',
        element: <SettingsPage />,
      },
    ],
  },
])

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <DialogProviders>
        <RouterProvider router={router} />
      </DialogProviders>
    </ThemeProvider>
  </Provider>,
)
