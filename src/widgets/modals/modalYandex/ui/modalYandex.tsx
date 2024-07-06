import { zodResolver } from '@hookform/resolvers/zod'
import { LoaderCircle, MailIcon } from 'lucide-react'
import { FormEvent, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useHrUserInfo } from '@/entities/hrCard'
import { Button } from '@/shared/ui/button'
import { Card, CardContent } from '@/shared/ui/card'
import {
    Carousel,
    CarouselContent,
    CarouselPrevious,
    CarouselNext,
    CarouselItem,
} from '@/shared/ui/carousel'
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
import { useCreateYandexMail, useUpdateYandexMail } from '../api'
import { formSchema } from '../model'

export const ModalYandex = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const services = useHrUserInfo((state) => state.services).filter(
        (item) => item.service_name === 'Yandex Mail'
    )

    const mutationCreate = useCreateYandexMail()
    const mutationUpdate = useUpdateYandexMail()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: services[0]?.email || '',
            app_password: services[0]?.app_password || '',
            id: services[0]?.id || undefined,
            service_name: 'Yandex Mail',
        },
        mode: 'onChange',
    })

    useEffect(() => {
        if (services.length && isLoading) {
            form.reset({
                email: services[0].email,
                app_password: services[0].app_password,
                id: services[0].id,
                service_name: 'Yandex Mail',
            })
            setIsLoading(false)
        }
    }, [services, form, isLoading])

    const onSubmit = (data: z.infer<typeof formSchema>, event?: FormEvent) => {
        if (event) {
            event.preventDefault()
            event.stopPropagation()
        }

        if (services) {
            mutationUpdate.mutate(data)
        } else {
            mutationCreate.mutate(data)
        }

        console.log(data)
    }

    console.log(services)

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger>
                <Button variant='outline' type='button'>
                    <MailIcon className='mr-2 h-4 w-4' />
                    Yandex почта
                </Button>
            </DialogTrigger>
            <DialogContent className='overflow-y-auto rounded-2xl max-h-[700px]'>
                <DialogHeader className='overflow-auto'>
                    <DialogTitle>Подключение Yandex почты</DialogTitle>
                    <DialogDescription>
                        Для успешного подключения укажите логин и пароль от
                        почты. Чтобы это успешно сделать, следуйте инструкциям.
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form
                        className='w-full flex flex-col gap-4'
                        onSubmit={(event) => {
                            if (event) {
                                // @ts-expect-error - I don't know what is this
                                form.handleSubmit(onSubmit)(event)
                                if (
                                    typeof event.preventDefault === 'function'
                                ) {
                                    event.preventDefault()
                                }
                                if (
                                    typeof event.stopPropagation === 'function'
                                ) {
                                    event.stopPropagation()
                                }
                            }
                        }}>
                        <div className='flex flex-col gap-4'>
                            <FormField
                                control={form.control}
                                name='email'
                                render={({ field }) => {
                                    return (
                                        <FormItem>
                                            <FormLabel>Email:</FormLabel>

                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    id='email'
                                                    type='email'
                                                    placeholder='email@yandex.ru'
                                                />
                                            </FormControl>

                                            <FormMessage />
                                        </FormItem>
                                    )
                                }}
                            />
                        </div>
                        <div className='flex flex-col gap-4'>
                            <FormField
                                control={form.control}
                                name='app_password'
                                render={({ field }) => {
                                    return (
                                        <FormItem>
                                            <FormLabel>Пароль:</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    id='app_password'
                                                    type='password'
                                                    placeholder='Введите свой пароль от почты'
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )
                                }}
                            />

                            <Carousel className='w-[85%] ml-9'>
                                <CarouselContent>
                                    {Array.from({ length: 4 }).map(
                                        (_, index) => (
                                            <CarouselItem key={index}>
                                                <div className=''>
                                                    <Card>
                                                        <CardContent className='flex items-center justify-center p-6'>
                                                            <img
                                                                className='object-cover w-full'
                                                                src={`pass${index}.png`}
                                                            />
                                                        </CardContent>
                                                    </Card>
                                                </div>
                                            </CarouselItem>
                                        )
                                    )}
                                </CarouselContent>
                                <CarouselPrevious type='button' />
                                <CarouselNext type='button' />
                            </Carousel>
                        </div>
                        <div className='flex flex-col gap-4'>
                            <FormMessage className='font-bold'>
                                Обязательно включите IMAP:
                            </FormMessage>
                            <Carousel className='w-[85%] ml-9'>
                                <CarouselContent>
                                    {Array.from({ length: 5 }).map(
                                        (_, index) => (
                                            <CarouselItem key={index}>
                                                <div className=''>
                                                    <Card>
                                                        <CardContent className='flex items-center justify-center p-6'>
                                                            <img
                                                                className='object-cover w-full'
                                                                src={`IMAP${index}.png`}
                                                            />
                                                        </CardContent>
                                                    </Card>
                                                </div>
                                            </CarouselItem>
                                        )
                                    )}
                                </CarouselContent>
                                <CarouselPrevious type='button' />
                                <CarouselNext type='button' />
                            </Carousel>
                        </div>

                        {mutationUpdate.isPending ||
                        mutationCreate.isPending ? (
                            <span className='flex justify-center'>
                                <LoaderCircle className='animate-spin' />
                            </span>
                        ) : null}

                        {mutationUpdate.isError || mutationCreate.isError ? (
                            <FormMessage>
                                {mutationUpdate.error?.message ||
                                    mutationCreate.error?.message ||
                                    'Ошибка'}
                            </FormMessage>
                        ) : null}

                        {mutationUpdate.isSuccess ||
                        mutationCreate.isSuccess ? (
                            <p>Данные успешно сохранены</p>
                        ) : null}

                        <div className='flex gap-4'>
                            <Button
                                onClick={(e) => e.stopPropagation()}
                                type='submit'>
                                {services ? 'Изменить' : 'Подключить'}
                            </Button>
                            <Button
                                onClick={() => {
                                    form.reset()
                                    setIsOpen(false)
                                }}
                                type='button'
                                variant='outline'>
                                Отмена
                            </Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
