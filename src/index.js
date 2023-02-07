import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import './styles/index.scss'
import ErrorPage from "./error-page"
import App from './routes'
import D3 from './routes/d3'
import TableSet from './routes/tableSet'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App /> ,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "d3/",
        element: <D3 />,
      },
    ],
  },
  {
    path: "tableset/",
    element: <TableSet />,
  },
])

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
