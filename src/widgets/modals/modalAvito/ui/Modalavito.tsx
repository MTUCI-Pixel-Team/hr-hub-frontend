import { LoaderCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useHrUserInfo } from '@/entities/hrCard'
import { Button } from '@/shared/ui/button'

import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from '@/shared/ui/dialog'
import { useGetAvitoRegistrationUrl } from '../api'

export const ModalAvito = () => {
    // const mutation = useConnectTelegram()
    // const hrUsername = useHrUserInfo((state) => state.username)
    // const hrId = useHrUserInfo((state) => state.id)
    const query = useGetAvitoRegistrationUrl()
    const services = useHrUserInfo((state) => state.services).filter(
        (item) => item.service_name === 'Avito'
    )

    console.log(query.data)

    return (
        <Dialog>
            <DialogTrigger>
                <Button variant='outline' type='button' className='flex gap-2'>
                    <img
                        className='w-full h-[80%] grayscale'
                        src='./avito.svg'
                    />
                    Avito
                </Button>
            </DialogTrigger>
            <DialogContent className='overflow-y-auto rounded-2xl max-h-[700px]'>
                <DialogHeader className='overflow-auto'>
                    <DialogTitle>Подключение Avito</DialogTitle>
                    <DialogDescription>
                        {services.length === 0 ? (
                            <>Для подключения нажмите на кнопку ниже</>
                        ) : (
                            <>Вы уже подключили Avito </>
                        )}
                    </DialogDescription>
                    {query.isLoading && (
                        <span className='w-full flex justify-center items-center'>
                            <LoaderCircle className='animate-spin' />
                        </span>
                    )}

                    {services.length === 0 && !query.isLoading && query.data && (
                        <Link
                            to={query.data?.registration_url}
                            className='flex gap-1 w-full'>
                            <Button
                                variant='outline'
                                type='button'
                                className='w-full'>
                                Подключить
                            </Button>
                        </Link>
                    )}

                    {services.length !== 0 && (
                        <div>
                            <p>
                                Теперь вы сможете отслеживать все ваши сообщения
                                с данного сервиса
                            </p>
                        </div>
                    )}
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}
