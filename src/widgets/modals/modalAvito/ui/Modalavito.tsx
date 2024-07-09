import { LoaderCircle } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useHrUserInfo } from '@/entities/hrCard'
import { setStatusMessage } from '@/shared/lib/utils'
import { Button } from '@/shared/ui/button'

import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from '@/shared/ui/dialog'
import { TimeStatusMessages } from '@/shared/ui/time-status-messages'
import { useDeleteAvito, useGetAvitoRegistrationUrl } from '../api'

export const ModalAvito = () => {
    const [messages, setMessages] = useState<{
        delete: string
        success: string
        update: string
        error: string
    }>({
        delete: '',
        success: '',
        update: '',
        error: '',
    })
    const mutationDelete = useDeleteAvito()
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

                            {mutationDelete.isPending ? (
                                <span className='flex w-full justify-center items-center'>
                                    <LoaderCircle className='animate-spin' />
                                </span>
                            ) : null}

                            <TimeStatusMessages messages={messages} />

                            <Button
                                onClick={() =>
                                    mutationDelete.mutate(services[0].id, {
                                        onSuccess: () => {
                                            setStatusMessage({
                                                message:
                                                    'Сервис успешно удалён',
                                                type: 'delete',
                                                setMessages,
                                            })
                                        },
                                        onError: (err) => {
                                            setStatusMessage({
                                                message: err.message,
                                                type: 'error',
                                                setMessages,
                                            })
                                        },
                                    })
                                }
                                disabled={mutationDelete.isPending}
                                className='mt-4 w-full'
                                variant='outline'
                                type='button'>
                                Отключить
                            </Button>
                        </div>
                    )}
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}
