import { zodResolver } from '@hookform/resolvers/zod'
import { MailIcon, PhoneIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useHrUserInfo } from '@/entities/hrCard'
import { Button } from '@/shared/ui/button'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/shared/ui/form'
import { Input } from '@/shared/ui/input'
import { Label } from '@/shared/ui/label'
import { Skeleton } from '@/shared/ui/skeleton'
import { useUpdateHrUser } from '../api'
import { formSchema } from '../models'

export const SettingsForm = () => {
    const username = useHrUserInfo((state) => state.username)
    const mutation = useUpdateHrUser()
    const [isLoading, setIsLoading] = useState<boolean>(true)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: username,
            password: '',
        },
        mode: 'onChange',
    })
    useEffect(() => {
        if (username) {
            form.reset({ username: username, password: '' })
            setIsLoading(false)
        }
    }, [username, form])

    const onSubmit = (data: z.infer<typeof formSchema>) => {
        const mutationData = {
            username: data.username,
            ...(data.password && { password: data.password }),
        }
        console.log(mutationData)
        mutation.mutate(mutationData)
    }

    if (isLoading) {
        return (
            <div className='flex flex-col gap-4 py-4'>
                <div className='flex flex-col gap-2'>
                    <Skeleton className='w-12 h-3' />
                    <Skeleton className='w-64 h-8' />
                </div>
                <div className='flex flex-col gap-2'>
                    <Skeleton className='w-12 h-3' />
                    <Skeleton className='w-64 h-8' />
                </div>
                <div className='flex flex-col gap-2'>
                    <Skeleton className='w-12 h-3' />
                    <div className='flex gap-2'>
                        <Skeleton className='w-32 h-8' />
                        <Skeleton className='w-32 h-8' />
                        <Skeleton className='w-32 h-8' />
                    </div>
                </div>
                <div className='flex gap-2'>
                    <Skeleton className='w-48 h-8' />
                    <Skeleton className='w-24 h-8' />
                </div>
            </div>
        )
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className=' py-4 flex flex-col gap-4'>
                <FormField
                    control={form.control}
                    name='username'
                    render={({ field }) => {
                        return (
                            <FormItem>
                                <FormLabel>Логин:</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        id='username'
                                        type='text'
                                        placeholder='johndoe'
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )
                    }}
                />

                <FormField
                    control={form.control}
                    name='password'
                    render={({ field }) => {
                        return (
                            <FormItem>
                                <FormLabel>Пароль:</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        id='password'
                                        type='password'
                                        placeholder='********'
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )
                    }}
                />

                <div className='grid gap-2'>
                    <Label>Cервисы:</Label>
                    <div className='flex items-center gap-2'>
                        <Button
                            className='flex gap-1'
                            variant='outline'
                            type='button'>
                            <img
                                className='w-full h-full'
                                src='./telegram.svg'
                            />
                            Telegram
                        </Button>
                        <Button variant='outline' type='button'>
                            <PhoneIcon className='mr-2 h-4 w-4' />
                            Whatsapp
                        </Button>
                        <Button variant='outline' type='button'>
                            <MailIcon className='mr-2 h-4 w-4' />
                            Email
                        </Button>
                    </div>
                </div>
                <FormMessage>{mutation.error?.message}</FormMessage>
                <div className='flex gap-2'>
                    <Button
                        className='w-48 transition-all duration-300 hover:scale-[102%]'
                        type='submit'>
                        Применить
                    </Button>
                    <Button
                        className='transition-all duration-300 hover:scale-[105%]'
                        variant='secondary'
                        type='button'
                        onClick={(e) => {
                            e.preventDefault()
                            form.reset()
                        }}>
                        Отмена
                    </Button>
                </div>
            </form>
        </Form>
    )
}
