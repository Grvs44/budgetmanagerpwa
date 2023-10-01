import React from 'react'
import ReactDOM from 'react-dom/client'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App'
import theme from './theme'
import ErrorPage from './pages/ErrorPage'
import PayeeList, { payeeListLoader } from './pages/PayeeList'
import PayeeDetail, { payeeDetailLoader } from './pages/PayeeDetail'
import PaymentList, { paymentListLoader } from './pages/PaymentList'
import PaymentDetail, { paymentDetailLoader } from './pages/PaymentDetail'
import JoinForm, { joinFormAction } from './pages/JoinForm'
import { getCurrentUser } from './api/user'
import { rootPath } from './settings'
import Home, { homeLoader } from './pages/Home'
import { GlobalProvider } from './context/global'
import BudgetPage, { budgetPageLoader } from './pages/BudgetPage'

const router = createBrowserRouter([
  {
    path: rootPath,
    element: <App />,
    errorElement: <ErrorPage />,
    loader: getCurrentUser,
    children: [
      {
        path: '',
        element: <Home />,
        loader: homeLoader,
      },
      {
        path: 'budget',
        element: <BudgetPage />,
        loader: budgetPageLoader,
      },
      {
        path: 'payee',
        element: <PayeeList />,
        loader: payeeListLoader,
        children: [
          {
            path: ':id',
            element: <PayeeDetail />,
            loader: payeeDetailLoader,
          },
        ],
      },
      {
        path: 'payment',
        element: <PaymentList />,
        loader: paymentListLoader,
        children: [
          {
            path: ':id',
            element: <PaymentDetail />,
            loader: paymentDetailLoader,
          },
        ],
      },
      {
        path: 'budget/:budgetId/payee',
        element: <PayeeList />,
        loader: payeeListLoader,
      },
      {
        path: 'budget/:budgetId/payment',
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
  <GlobalProvider>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  </GlobalProvider>
)
