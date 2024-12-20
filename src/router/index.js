import Layout from '@/pages/layout'
import Login from '@/pages/login'
import { createBrowserRouter } from 'react-router-dom'
const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/',
    element: <Layout />
  }
])

export default router
