import { Navigate, createBrowserRouter } from 'react-router-dom'
import { HomePage } from '@/pages/home'
import { LoginPage } from '@/pages/login'
import { PeoplePage } from '@/pages/people'
import { PeoplesPage } from '@/pages/peoples'
import { RegisterPage } from '@/pages/register'
import { Layout, LayoutAuth } from '@/widgets/layouts'

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            { path: '', element: <HomePage /> },
            { path: 'peoples', element: <PeoplesPage /> },
            { path: 'peoples/:id', element: <PeoplePage /> },
            { path: 'settings', element: <h1>Settings</h1> },
        ],
    },
    {
        path: '/auth',
        element: <LayoutAuth />,
        children: [
            { path: '', element: <Navigate to='/auth/login' /> },
            { path: 'login', element: <LoginPage /> },
            { path: 'register', element: <RegisterPage /> },
        ],
    },
])
