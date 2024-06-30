import { z } from 'zod'

export const formSchema = z.object({
    username: z.string().min(2, {
        message: 'Логин должен содержать минимум 2 символа',
    }),
    password: z
        .union([
            z.string().min(8, {
                message: 'Пароль должен содержать минимум 8 символов',
            }),
            z.string().length(0),
        ])
        .optional(),
})
