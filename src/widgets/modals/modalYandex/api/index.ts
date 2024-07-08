import { useMutation, useQueryClient } from '@tanstack/react-query'
import { z } from 'zod'
import { Api } from '@/shared/api'
import { formSchema } from '../model'

export const useCreateYandexMail = () => {
    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: (data: z.infer<typeof formSchema>) => {
            return Api.postWithToken('service/create/', data)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['services'],
            })
        },
    })

    return mutation
}

export const useUpdateYandexMail = () => {
    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: (data: z.infer<typeof formSchema>) => {
            const { id } = data
            return Api.patchWithToken(`service/update/${id}/`, data)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['services'],
            })
        },
    })

    return mutation
}

export const useDeleteYandexMail = () => {
    const queryClient = useQueryClient()

    const query = useMutation({
        mutationFn: (id: number) => {
            return Api.deleteWithToken(`service/delete/${id}/`)
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['services'],
            })
        },
    })

    return query
}
