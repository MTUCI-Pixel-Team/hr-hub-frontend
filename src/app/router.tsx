import { createBrowserRouter } from 'react-router-dom'
import { HomePage } from '@/pages/home'
import { PeoplePage } from '@/pages/people'
import { PeoplesPage } from '@/pages/peoples'
import { Layout } from '@/widgets/layouts'

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            { path: '/', element: <HomePage /> },
            { path: '/peoples', element: <PeoplesPage /> },
            { path: '/peoples/:id', element: <PeoplePage /> },
            { path: '/settings', element: <h1>Settings</h1> },
        ],
    },
])
