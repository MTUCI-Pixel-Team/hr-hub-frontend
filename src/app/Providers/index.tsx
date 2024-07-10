import { ErrorBoundary } from '@sentry/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { RouterProvider } from 'react-router-dom'
import { ErrorBoundaryElement } from '@/shared/ui/error-boundary'
import { router } from '../router'

export const Providers = () => {
    const queryClient = new QueryClient()

    return (
        <ErrorBoundary
            fallback={(err) => {
                return <ErrorBoundaryElement err={err} />
            }}>
            <QueryClientProvider client={queryClient}>
                <RouterProvider router={router} />
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
        </ErrorBoundary>
    )
}
