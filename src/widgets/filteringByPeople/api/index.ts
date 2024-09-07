import { useQuery } from '@tanstack/react-query'
import { Api } from '@/shared/api'
import { IUniqueUsers } from '../model'

export const useGetUniqueUsers = () => {
    const query = useQuery({
        queryKey: ['users'],
        queryFn: () => {
            return Api.getWithToken<IUniqueUsers[]>(
                'user/custom-user/get_uniq_users_from_messages/'
            )
        },
    })

    return query
}
