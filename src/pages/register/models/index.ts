import { z } from 'zod'

export interface IAuthForm {
    username: string
    password: string
}

export interface ICreateUserResponse {
    username: string
    password: string
    email: string
    avatar: string
}

export const formSchema = z.object({
    username: z
        .string()
        .min(2, {
            message: 'Логин должно содержать минимум 2 символа',
        })
        .regex(/^[^\s]+$/, {
            message: 'Логин не должен содержать пробелы',
        }),
    repeatPassword: z.string().min(8, {
        message: 'Пароль должен содержать минимум 8 символов',
    }),
    password: z.string().min(8, {
        message: 'Пароль должен содержать минимум 8 символов',
    }),
    email: z.string().email('Введите действительный email'),
})
