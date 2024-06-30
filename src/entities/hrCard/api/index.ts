import { useQuery } from '@tanstack/react-query'
import { Api } from '@/shared/api'
import { User, useHrUserInfo } from '../models'

export const useGetInfoHrUser = () => {
    const setHrUsername = useHrUserInfo((state) => state.setUsername)

    const query = useQuery({
        queryKey: ['hrUserInfo'],
        queryFn: async () => {
            const response = await Api.getWithToken<User>('user/update-user/')
            return response
        },
        select: (data) => {
            setHrUsername(data.username)
            return data
        },
    })

    return query
}
