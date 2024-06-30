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
import { useLoginUser } from '../api'
import { formSchema } from '../models'

export const LoginPage = () => {
    const mutation = useLoginUser()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: '',
            password: '',
        },
        mode: 'onChange',
    })

    const onSubmit = (data: z.infer<typeof formSchema>) => {
        console.log(data)
        mutation.mutate(data)
    }

    console.log(mutation.error)

    return (
        <div className='bg-background flex flex-col justify-center items-center p-8'>
            <div className='max-w-md w-full space-y-8'>
                <div>
                    <h2 className='text-3xl font-bold text-center'>
                        Авторизируйтесь
                    </h2>
                    <p className='mt-2 text-center text-muted-foreground'>
                        Или{' '}
                        <Link
                            to='/auth/register'
                            className='font-medium text-primary hover:underline'>
                            создайте новый аккаунт
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
                                                id='username'
                                                name='username'
                                                type='text'
                                                autoComplete='username'
                                                required
                                                className='mt-1 block w-full'
                                                placeholder='Введите свой логин'
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
                        {mutation.isPending && (
                            <span className='flex justify-center'>
                                <LoaderCircle className='animate-spin' />
                            </span>
                        )}
                        <FormMessage>{mutation.error?.message}</FormMessage>
                        <Button
                            type='submit'
                            className='w-full transition-all duration-300 hover:scale-[102%]'>
                            Авторизоваться
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    )
}
