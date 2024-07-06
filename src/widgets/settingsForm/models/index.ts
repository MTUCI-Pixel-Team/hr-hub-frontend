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
    email: z.string().email('Введите корректный email'),
})

// {
//     "id": 5,
//     "user_id": 11,
//     "service_name": "Yandex Mail",
//     "service_username": "defskela",
//     "email": "jiopydryk011@yandex.ru",
//     "app_password": "tdigxyrpiliyyyqq",
//     "created_at": "2024-07-04T17:02:57.733703Z"
//   }

export const serviceResponseSchema = z.array(
    z.object({
        id: z.number(),
        user_id: z.number(),
        service_name: z.string(),
        service_username: z.string(),
        email: z.string().email(),
        app_password: z.string(),
        created_at: z.string().date(),
    })
)
