import CssBaseline from '@mui/material/CssBaseline'
import ThemeProvider from '@mui/material/styles/ThemeProvider'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App'
import DialogProviders from './context/DialogProviders'
import BudgetList from './pages/BudgetList'
import ErrorPage from './pages/ErrorPage'
import HomePage from './pages/HomePage'
import JoinPage from './pages/JoinPage'
import PayeeList from './pages/PayeeList'
import PaymentList from './pages/PaymentList'
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
        element: <BudgetList />,
      },
      {
        path: 'payee',
        element: <PayeeList />,
      },
      {
        path: 'payment',
        element: <PaymentList />,
      },
      {
        path: 'budget/:budgetId/payee',
        element: <PayeeList />,
      },
      {
        path: 'budget/:budgetId/payment',
        element: <PaymentList />,
      },
      {
        path: 'payee/:payeeId/payment',
        element: <PaymentList />,
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
