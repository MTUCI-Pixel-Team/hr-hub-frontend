import { LoaderCircle } from 'lucide-react'
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
import { FormMessage } from '@/shared/ui/form'
import { useConnectVk } from '../api'

export const ModalVk = () => {
    const mutation = useConnectVk()
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
            mutation.mutate(data)
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
                    <DialogTitle>Подключение Vk</DialogTitle>
                    <DialogDescription>
                        {services.length === 0 ? (
                            <>Для подключения нажмите на кнопку ниже</>
                        ) : (
                            <>Вы уже подключили Vk </>
                        )}
                    </DialogDescription>
                    {services.length === 0 ? (
                        <>
                            <Button
                                onClick={onConnect}
                                className='flex gap-1'
                                variant='outline'
                                type='button'>
                                Подключить
                            </Button>
                            {mutation.isPending ? (
                                <span className='flex w-full justify-center items-center'>
                                    <LoaderCircle className='animate-spin' />
                                </span>
                            ) : null}
                            {mutation.isError ? (
                                <FormMessage>
                                    {mutation.error.message}
                                </FormMessage>
                            ) : null}
                        </>
                    ) : (
                        <div>
                            <p>
                                Чтобы получать сообщения, отправьте данного бота
                                вашим клиентам. Ваш клиент должен выбрать ваш
                                username/id:
                            </p>
                            <p className='font-medium'>
                                https://vk.com/hrhub1337
                            </p>
                        </div>
                    )}
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}
