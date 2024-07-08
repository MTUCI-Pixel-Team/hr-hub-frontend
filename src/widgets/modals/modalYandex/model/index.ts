import { z } from 'zod'

export const formSchema = z.object({
    email: z.string().email(),
    app_password: z.string(),
    service_name: z.string().default('Yandex Mail'),
    id: z.number().optional(),
    service_username: z.string(),
})
