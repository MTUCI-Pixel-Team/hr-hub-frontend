import { LoaderCircle } from 'lucide-react'
import { useEffect } from 'react'
import { useAvitoRegistration } from '../api'

export const AvitoCallback = () => {
    const mutation = useAvitoRegistration()

    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search)
        const code = searchParams.get('code')

        if (code) {
            mutation.mutate({ authorization_code: code })
        }
    }, [])

    return (
        <div className='w-screen h-screen flex justify-center items-center'>
            <div className='shadow-sm p-4 rounded-xl flex flex-col gap-2 justify-center items-center'>
                {mutation.isPending ? (
                    <>
                        <p>Идёт регистрация Avito</p>
                        <LoaderCircle className='animate-spin' />
                    </>
                ) : mutation.isError ? (
                    <>
                        <p>Ошибка регистрации Avito</p>
                        <p>{mutation.error.message}</p>
                    </>
                ) : mutation.isSuccess ? (
                    <p>Регистрация Avito прошла успешно</p>
                ) : (
                    <p>Ошибка</p>
                )}
            </div>
        </div>
    )
}
