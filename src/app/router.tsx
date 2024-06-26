import { createBrowserRouter } from 'react-router-dom'
import { Home } from '@/pages/home'
import { Layout } from '@/widgets/layouts'

export const router = createBrowserRouter([
    {
        path: '/',
        element: (
            <Layout>
                <Home />
            </Layout>
        ),
    },
])
