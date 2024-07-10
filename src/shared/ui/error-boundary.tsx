import { BanIcon } from 'lucide-react'

export const ErrorBoundaryElement = ({
    err,
}: {
    err: {
        error: unknown
        componentStack: string
        eventId: string
        resetError(): void
    }
}) => {
    return (
        <div className='h-screen w-full mx-auto flex  justify-center items-center'>
            <div className='shadow-sm p-4 rounded-sm max-w-[70%] flex flex-col justify-center items-center'>
                <BanIcon className='w-24 h-24' />
                <h1 className='font-semibold'>Произошла неожиданная ошибка</h1>
                <h2 className='font-medium'>Текст ошибки:</h2>
                <p className='w-full text-muted-foreground'>
                    {err.componentStack}
                </p>
            </div>
        </div>
    )
}
