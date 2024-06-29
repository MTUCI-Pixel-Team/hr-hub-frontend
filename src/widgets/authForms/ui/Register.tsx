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

const formSchema = z.object({
    username: z.string().min(2, {
        message: 'Логин должно содержать минимум 2 символа',
    }),
    password: z.string().min(6, {
        message: 'Пароль должен содержать минимум 6 символов',
    }),
})

export const RegisterForm = () => {
    const mutation = useCreateUser()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            password: '',
            username: '',
        },
        mode: 'onChange',
    })

    const onSubmit = (data: z.infer<typeof formSchema>) => {
        console.log(data)
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
                                        <FormLabel>Имя:</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                autoComplete='name'
                                                placeholder='Илья'
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
                    </form>
                </Form>
            </div>
        </div>
    )
}
