import { LoaderCircle } from 'lucide-react'
import { useEffect } from 'react'
import { useAvitoRegistration, useAvitoWebHookRegistration } from '../api'

export const AvitoCallbackPage = () => {
    const mutation = useAvitoRegistration()
    const mutationWebhook = useAvitoWebHookRegistration()

    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search)
        const code = searchParams.get('code')

        if (code) {
            mutation.mutate(
                {
                    authorization_code: code,
                },
                {
                    onSuccess: () => {
                        mutationWebhook.mutate()
                    },
                }
            )
        }
    }, [])

    return (
        <div className='w-screen h-screen flex justify-center items-center'>
            <div className='shadow-sm p-4 rounded-sm flex flex-col gap-2 justify-center items-center'>
                {mutation.isPending || mutationWebhook.isPending ? (
                    <>
                        <p>Идёт регистрация Avito</p>
                        <LoaderCircle className='animate-spin' />
                    </>
                ) : mutation.isError || mutationWebhook.isError ? (
                    <>
                        <p>Ошибка регистрации Avito</p>
                        <p>
                            {mutation.error?.message ||
                                mutationWebhook.error?.message}
                        </p>
                    </>
                ) : mutation.isSuccess && mutationWebhook.isSuccess ? (
                    <p>Регистрация Avito прошла успешно</p>
                ) : (
                    <p>Ошибка</p>
                )}
            </div>
        </div>
    )
}
