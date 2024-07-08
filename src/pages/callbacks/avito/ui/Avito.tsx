import { LoaderCircle } from 'lucide-react'
import { useEffect } from 'react'
import { useHrUserInfo } from '@/entities/hrCard'
import { useAvitoRegistration } from '../api'

export const AvitoCallbackPage = () => {
    const mutation = useAvitoRegistration()
    const username = useHrUserInfo((state) => state.username)

    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search)
        const code = searchParams.get('code')

        if (code && username) {
            mutation.mutate({
                authorization_code: code,
                service_username: username,
            })
        }
    }, [])

    return (
        <div className='w-screen h-screen flex justify-center items-center'>
            <div className='shadow-sm p-4 rounded-sm flex flex-col gap-2 justify-center items-center'>
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
