import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Api } from '@/shared/api'
import { IConnectVk } from '../model'

export const useConnectVk = () => {
    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: (data: IConnectVk) => {
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

export const useDeleteVk = () => {
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
