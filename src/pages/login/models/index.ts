import { z } from 'zod'

export interface IAuthForm {
    username: string
    password: string
}

export interface IAuthFormRequest {
    access: string
    refresh: string
}

export const formSchema = z.object({
    password: z.string().min(8, {
        message: 'Пароль должен содержать минимум 8 символов',
    }),
    username: z.string().min(2, {
        message: 'Логин должно содержать минимум 2 символа',
    }),
})
