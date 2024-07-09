import { LoaderCircle } from 'lucide-react'
import { useState } from 'react'
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
import { useConnectVk, useDeleteVk } from '../api'

export const ModalVk = () => {
    const mutationCreate = useConnectVk()
    const mutationDelete = useDeleteVk()

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
    const hrUsername = useHrUserInfo((state) => state.username)
    const hrId = useHrUserInfo((state) => state.id)
    const services = useHrUserInfo((state) => state.services).filter(
        (item) => item.service_name === 'vk'
    )

    const onConnect = () => {
        if (hrId) {
            const data = {
                service_name: 'vk',
                service_username: hrUsername,
                user_id: hrId,
            }
            mutationCreate.mutate(data, {
                onSuccess: () => {
                    setStatusMessage({
                        message: 'Сервис успешно добавлен',
                        type: 'success',
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
    }

    return (
        <Dialog>
            <DialogTrigger>
                <Button
                    className='flex gap-1 justify-center items-center'
                    variant='outline'
                    type='button'>
                    <img className='w-full h-full' src='./vk.svg' />
                    VK
                </Button>
            </DialogTrigger>
            <DialogContent className='overflow-y-auto rounded-2xl max-h-[700px]'>
                <DialogHeader className='overflow-auto'>
                    <DialogTitle>Подключение VK</DialogTitle>
                    <DialogDescription>
                        {services.length === 0 ? (
                            <>Для подключения нажмите на кнопку ниже</>
                        ) : (
                            <>Вы уже подключили Vk </>
                        )}
                    </DialogDescription>
                    {services.length === 0 ? (
                        <>
                            {mutationCreate.isPending ? (
                                <span className='flex w-full justify-center items-center'>
                                    <LoaderCircle className='animate-spin' />
                                </span>
                            ) : null}

                            <TimeStatusMessages messages={messages} />

                            <Button
                                onClick={onConnect}
                                className='flex gap-1'
                                variant='outline'
                                type='button'>
                                Подключить
                            </Button>
                        </>
                    ) : (
                        <div>
                            <p>
                                Чтобы получать сообщения, отправьте данного бота
                                вашим клиентам. Ваш клиент должен выбрать ваш
                                username/id:
                            </p>

                            <a href='https://vk.com/hrhub1337' target='_blank'>
                                <Button
                                    disabled={mutationCreate.isPending}
                                    variant={'link'}
                                    className='font-medium p-0'>
                                    https://vk.com/hrhub1337
                                </Button>
                            </a>

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
                                className='mt-2 w-full'
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
