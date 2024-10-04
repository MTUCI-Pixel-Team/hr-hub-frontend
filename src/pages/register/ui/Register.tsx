import { zodResolver } from '@hookform/resolvers/zod'
import { LoaderCircle } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { z } from 'zod'
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
import { useCreateUser } from '../api'
import { formSchema } from '../models'

export const RegisterPage = () => {
    const mutation = useCreateUser()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            password: '',
            repeatPassword: '',
            username: '',
            email: '',
        },
        mode: 'onChange',
    })

    const onSubmit = (data: z.infer<typeof formSchema>) => {
        console.log(data)

        const { repeatPassword, password } = data
        if (repeatPassword !== password) {
            form.setError('repeatPassword', {
                type: 'manual',
                message: 'Пароли не совпадают',
            })
            return
        }

        mutation.mutate(data)
    }

    return (
        <div className='bg-background flex flex-col justify-center items-center p-8'>
            <div className='max-w-md w-full space-y-8'>
                <div>
                    <h2 className='text-3xl font-bold text-center'>
                        Зарегистрируйтесь
                    </h2>
                    <p className='mt-2 text-center text-muted-foreground'>
                        Или{' '}
                        <Link
                            to='/auth/login'
                            className='font-medium text-primary hover:underline'>
                            войдите в свой аккаунт
                        </Link>
                    </p>
                </div>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className='space-y-6'>
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
                                                autoComplete='name'
                                                placeholder='Tomato1337'
                                                required
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )
                            }}
                        />

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
                                                autoComplete='name'
                                                placeholder='example@gmail.com'
                                                required
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )
                            }}
                        />

                        <FormField
                            name='password'
                            control={form.control}
                            render={({ field }) => {
                                return (
                                    <FormItem>
                                        <FormLabel>Пароль:</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                id='password'
                                                name='password'
                                                type='password'
                                                autoComplete='current-password'
                                                required
                                                className='mt-1 block w-full'
                                                placeholder='Введите свой пароль'
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )
                            }}
                        />

                        <FormField
                            control={form.control}
                            name='repeatPassword'
                            render={({ field }) => {
                                return (
                                    <FormItem>
                                        <FormLabel>Повторите пароль:</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                id='repeatPassword'
                                                name='repeatPassword'
                                                type='password'
                                                autoComplete='current-password'
                                                required
                                                className='mt-1 block w-full'
                                                placeholder='Повторите свой пароль'
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )
                            }}
                        />

                        {mutation.isPending && (
                            <span className='flex justify-center'>
                                <LoaderCircle className='animate-spin' />
                            </span>
                        )}
                        <FormMessage>{mutation.error?.message}</FormMessage>
                        <Button
                            type='submit'
                            className='w-full transition-all duration-300 hover:scale-[102%]'>
                            Зарегистрироваться
                        </Button>
                        <Button
                            size={'sm'}
                            className='h-0.5 w-[100%] text-xs justify-center items-center'
                            variant={'link'}>
                            <a
                                href='https://github.com/MTUCI-Pixel-Team'
                                target='_blank'>
                                Made by Pixel Team
                            </a>
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    )
}
