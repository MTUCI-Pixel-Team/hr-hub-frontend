import { useQuery } from '@tanstack/react-query'
import { Api } from '@/shared/api'
import { User } from '../models'

export const useGetInfoHrUser = () => {
    const query = useQuery({
        queryKey: ['hrUserInfo'],
        queryFn: async () => {
            const response = await Api.getWithToken<User>('user/update-user/')
            return response
        },
    })

    return query
}
