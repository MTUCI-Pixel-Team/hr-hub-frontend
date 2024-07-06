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
