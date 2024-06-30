import { z } from 'zod'

export const formSchema = z.object({
    name: z.string().min(2, {
        message: 'Имя должно содержать минимум 2 символа',
    }),
    profession: z.string().min(2, {
        message: 'Профессия должна содержать минимум 2 символа',
    }),
    username: z
        .array(
            z.object({ id: z.string(), name: z.string(), avatar: z.string() })
        )
        .refine((value) => value.length > 0, {
            message: 'Добавьте хотя бы один никнейм',
        }),
})
