import { LoaderCircle } from 'lucide-react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useAvitoRegistration } from '../api'

export const AvitoCallback = () => {
    const { authorization_code } = useParams()
    const mutation = useAvitoRegistration()

    useEffect(() => {
        if (authorization_code) {
            mutation.mutate({ authorization_code })
        }
    }, [authorization_code, mutation])

    return (
        <div className='w-screen h-screen flex justify-center items-center'>
            <div className='shadow-sm p-4 rounded-xl flex flex-col gap-2 justify-center items-center'>
                <p>Идёт регистрация Avito</p>
                <LoaderCircle className='animate-spin' />
            </div>
        </div>
    )
}
