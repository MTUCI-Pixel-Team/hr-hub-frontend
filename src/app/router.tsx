import { createBrowserRouter } from 'react-router-dom'
import { HomePage } from '@/pages/home'
import { PeoplesPage } from '@/pages/peoples/ui/Peoples'
import { Layout } from '@/widgets/layouts'

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            { path: '/', element: <HomePage /> },
            { path: '/peoples', element: <PeoplesPage /> },
            { path: '/peoples/:id', element: <h1>People</h1> },
            { path: '/settings', element: <h1>Settings</h1> },
        ],
    },
])
