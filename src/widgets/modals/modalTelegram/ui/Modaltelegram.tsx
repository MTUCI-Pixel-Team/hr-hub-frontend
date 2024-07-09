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
import { useConnectTelegram, useDeleteTelegram } from '../api'

export const ModalTelegram = () => {
    const mutationConnect = useConnectTelegram()
    const mutationDelete = useDeleteTelegram()

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
        (item) => item.service_name === 'Telegram'
    )

    const onConnect = () => {
        if (hrId) {
            const data = {
                service_name: 'Telegram',
                service_username: hrUsername,
                user_id: hrId,
            }
            mutationConnect.mutate(data, {
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
                <Button className='flex gap-1' variant='outline' type='button'>
                    <img className='w-full h-full' src='./telegram.svg' />
                    Telegram
                </Button>
            </DialogTrigger>
            <DialogContent className='overflow-y-auto rounded-2xl max-h-[700px]'>
                <DialogHeader className='overflow-auto'>
                    <DialogTitle>Подключение Telegram</DialogTitle>
                    <DialogDescription>
                        {services.length === 0 ? (
                            <>Для подключения нажмите на кнопку ниже</>
                        ) : (
                            <>Вы уже подключили Telegram </>
                        )}
                    </DialogDescription>
                    {services.length === 0 ? (
                        <>
                            {mutationConnect.isPending ? (
                                <span className='flex w-full justify-center items-center mt-2'>
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

                            <a
                                href='https://t.me/HRspecialistShopix_bot'
                                target='_blank'>
                                <Button
                                    disabled={mutationConnect.isPending}
                                    variant={'link'}
                                    className='font-medium p-0'>
                                    https://t.me/HRspecialistShopix_bot
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
