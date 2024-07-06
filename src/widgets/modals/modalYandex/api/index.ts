import { useMutation } from '@tanstack/react-query'
import { z } from 'zod'
import { Api } from '@/shared/api'
import { formSchema } from '../model'

export const useCreateYandexMail = () => {
    const mutation = useMutation({
        mutationFn: (data: z.infer<typeof formSchema>) => {
            return Api.postWithToken('service/create/', data)
        },
    })

    return mutation
}

export const useUpdateYandexMail = () => {
    const mutation = useMutation({
        mutationFn: (data: z.infer<typeof formSchema>) => {
            const { id } = data
            return Api.patchWithToken(`service/update/${id}/`, data)
        },
    })

    return mutation
}
