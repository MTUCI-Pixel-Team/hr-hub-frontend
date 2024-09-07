import { zodResolver } from '@hookform/resolvers/zod'
import { LoaderCircle } from 'lucide-react'
import { FC, ReactNode, useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'
import { ICustomUser } from '@/entities/customUsers'
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
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/shared/ui/form'
import { Input } from '@/shared/ui/input'
import { TimeStatusMessages } from '@/shared/ui/time-status-messages'
import {
    useCreateCustomUser,
    useDeleteCustomUser,
    useUpdateCustomUser,
} from '../api'
import { formSchema } from '../models'

interface CreatePeopleProps {
    isOpen: boolean
    onOpenChange: () => void
    isUpdate?: boolean
    renderFilter: ReactNode
    renderButton: ReactNode
    data?: ICustomUser
}

export const CreatePeople: FC<CreatePeopleProps> = ({
    renderFilter,
    isOpen,
    isUpdate = false,
    onOpenChange,
    renderButton,
    data,
}) => {
    // const [modalOpen, setModalOpen] = useState<boolean>(false)
    const mutationUpdate = useUpdateCustomUser(data?.id)
    const mutationDelete = useDeleteCustomUser(data?.id)
    const mutationCreate = useCreateCustomUser()

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

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            profession: '',
            username: [],
        },
        mode: 'onChange',
    })

    useEffect(() => {
        if (isUpdate && data) {
            console.log('entered')
            form.reset({
                name: data.group_name,
                profession: data.profession,
                username: data.members
                    .filter((item) => item.added)
                    .map((member) => {
                        return {
                            id: member.id,
                            service_name: member.service_name,
                            username_from_message:
                                member.user_name_from_message,
                        }
                    }),
            })
        }
    }, [data, isUpdate, form])

    const onDelete = () => {
        mutationDelete.mutate(undefined, {
            onSuccess: () => {
                setStatusMessage({
                    message: 'Пользователь успешно удален',
                    setMessages,
                    type: 'delete',
                })
            },
            onError: (err) => {
                setStatusMessage({
                    message: err.message,
                    setMessages,
                    type: 'error',
                })
            },
        })
    }

    const onSubmit = (data: z.infer<typeof formSchema>) => {
        if (isUpdate) {
            mutationUpdate.mutate(data, {
                onSuccess: () => {
                    setStatusMessage({
                        message: 'Пользователь успешно обновлен',
                        setMessages,
                        type: 'success',
                    })
                },
                onError: (err) => {
                    setStatusMessage({
                        message: err.message,
                        setMessages,
                        type: 'error',
                    })
                },
            })
        } else {
            mutationCreate.mutate(data, {
                onSuccess: () => {
                    setStatusMessage({
                        message: 'Пользователь успешно создан',
                        setMessages,
                        type: 'success',
                    })
                },
                onError: (err) => {
                    setStatusMessage({
                        message: err.message,
                        setMessages,
                        type: 'error',
                    })
                },
            })
        }
        console.log(data)
    }

    console.log(form.getValues())

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogTrigger>{renderButton}</DialogTrigger>
            <DialogContent className='overflow-auto rounded-2xl'>
                <DialogHeader className='overflow-auto'>
                    <DialogTitle>
                        {!isUpdate
                            ? 'Создание нового пользователя'
                            : 'Обновление пользователя'}
                    </DialogTitle>
                    <DialogDescription>
                        Введите данные нового пользователя и добавьте его
                        никнеймы
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <FormProvider {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className='flex flex-col gap-4'>
                            <FormField
                                control={form.control}
                                name='name'
                                render={({ field }) => {
                                    return (
                                        <FormItem>
                                            <FormLabel>
                                                Имя пользователя:
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    type='text'
                                                    placeholder='Алексей Петров'
                                                    className='input'
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )
                                }}
                            />

                            <FormField
                                control={form.control}
                                name='profession'
                                render={({ field }) => {
                                    return (
                                        <FormItem>
                                            <FormLabel>
                                                Профессия пользователя:
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    type='text'
                                                    placeholder='Frontend Developer'
                                                    className='input'
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )
                                }}
                            />

                            {renderFilter}

                            {mutationUpdate.isPending ||
                                (mutationCreate.isPending && (
                                    <div className='flex justify-center'>
                                        <LoaderCircle className='animate-spin' />
                                    </div>
                                ))}

                            <TimeStatusMessages messages={messages} />

                            <div className='flex gap-3'>
                                <Button
                                    type='submit'
                                    className='w-32  transition-all duration-300 hover:scale-[102%]'>
                                    {isUpdate ? 'Обновить' : 'Создать'}
                                </Button>
                                <Button
                                    onClick={(e) => {
                                        e.preventDefault()
                                        form.reset()
                                    }}
                                    type='button'
                                    variant='secondary'
                                    className='transition-all duration-300 hover:scale-[105%]'>
                                    Сбросить
                                </Button>
                                {isUpdate && (
                                    <Button
                                        onClick={onDelete}
                                        type='button'
                                        className='transition-all duration-300 hover:scale-[105%]'
                                        variant={'destructive'}>
                                        Удалить
                                    </Button>
                                )}
                            </div>
                        </form>
                    </FormProvider>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
