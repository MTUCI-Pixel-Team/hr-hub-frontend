import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Api } from '@/shared/api'
import { IConnectTelegram } from '../model'

export const useConnectTelegram = () => {
    const queryClient = useQueryClient()

    const query = useMutation({
        mutationFn: (data: IConnectTelegram) => {
            return Api.postWithToken('service/create/', data)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['services'],
            })
        },
    })

    return query
}

export const useDeleteTelegram = () => {
    const queryClient = useQueryClient()

    const query = useMutation({
        mutationFn: (id: number) => {
            return Api.deleteWithToken(`service/delete/${id}/`)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['services'],
            })
        },
    })

    return query
}
