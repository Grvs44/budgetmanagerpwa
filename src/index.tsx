import React from 'react'
import ReactDOM from 'react-dom/client'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App'
import theme from './theme'
import ErrorPage from './pages/ErrorPage'
import BudgetList, { budgetListLoader } from './pages/BudgetList'
import BudgetDetail from './pages/BudgetDetail'
import PayeeList, { payeeListLoader } from './pages/PayeeList'
import PayeeDetail from './pages/PayeeDetail'
import PaymentList, { paymentListLoader } from './pages/PaymentList'
import PaymentDetail from './pages/PaymentDetail'

const router = createBrowserRouter([
  {
    path: 'budgetmanager',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '',
        element: <BudgetList />,
        loader: budgetListLoader,
      },
      {
        path: ':id',
        element: <BudgetDetail />,
      },
      {
        path: 'payee',
        element: <PayeeList />,
        loader: payeeListLoader,
      },
      {
        path: 'payee/:id',
        element: <PayeeDetail />,
      },
      {
        path: 'payment',
        element: <PaymentList />,
        loader: paymentListLoader,
      },
      {
        path: 'payment/:id',
        element: <PaymentDetail />,
      },
      {
        path: ':budgetId/payee',
        element: <PayeeList />,
        loader: payeeListLoader,
      },
      {
        path: ':budgetId/payment',
        element: <PaymentList />,
        loader: paymentListLoader,
      },
      {
        path: 'payee/:payeeId/payment',
        element: <PaymentList />,
        loader: paymentListLoader,
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <RouterProvider router={router} />
  </ThemeProvider>
)
