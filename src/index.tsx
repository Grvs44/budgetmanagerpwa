import React from 'react'
import ReactDOM from 'react-dom/client'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App'
import theme from './theme'
import ErrorPage from './pages/ErrorPage'
import BudgetList, { budgetListLoader } from './pages/BudgetList'
import BudgetDetail, { budgetDetailLoader } from './pages/BudgetDetail'
import PayeeList, { payeeListLoader } from './pages/PayeeList'
import PayeeDetail, { payeeDetailLoader } from './pages/PayeeDetail'
import PaymentList, { paymentListLoader } from './pages/PaymentList'
import PaymentDetail, { paymentDetailLoader } from './pages/PaymentDetail'
import JoinForm, { joinFormAction } from './pages/JoinForm'
import { getCurrentUser } from './api/user'
import { rootPath } from './settings'

const router = createBrowserRouter([
  {
    path: rootPath,
    element: <App />,
    errorElement: <ErrorPage />,
    loader: getCurrentUser,
    children: [
      {
        path: '',
        element: <BudgetList />,
        loader: budgetListLoader,
      },
      {
        path: ':id',
        element: <BudgetDetail />,
        loader: budgetDetailLoader,
      },
      {
        path: 'payee',
        element: <PayeeList />,
        loader: payeeListLoader,
      },
      {
        path: 'payee/:id',
        element: <PayeeDetail />,
        loader: payeeDetailLoader,
      },
      {
        path: 'payment',
        element: <PaymentList />,
        loader: paymentListLoader,
      },
      {
        path: 'payment/:id',
        element: <PaymentDetail />,
        loader: paymentDetailLoader,
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
      {
        path: 'join',
        element: <JoinForm />,
        action: joinFormAction,
      },
      {
        path: 'join/:id',
        element: <JoinForm />,
        action: joinFormAction,
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
