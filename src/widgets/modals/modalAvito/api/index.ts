import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Api } from '@/shared/api'
import { IAvitoURLResponse } from '../model'

export const useGetAvitoRegistrationUrl = () => {
    const query = useQuery({
        queryKey: ['avito', 'url'],
        queryFn: () => {
            return Api.getWithToken<IAvitoURLResponse>(
                'service/avito_registration/'
            )
        },
    })

    return query
}

export const useDeleteAvito = () => {
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
