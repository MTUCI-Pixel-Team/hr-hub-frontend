import { useQuery } from '@tanstack/react-query'
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
