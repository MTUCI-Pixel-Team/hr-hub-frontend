import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import {
    IResponseAllCustomUserMessages,
    ICustomUser,
} from '@/entities/customUsers'
import { Api } from '@/shared/api'

export const useGetAllCustomUserMessages = (userId: number | undefined) => {
    const query = useInfiniteQuery({
        queryKey: ['custom-user-messages', userId],
        queryFn: async ({ pageParam }) => {
            const res = await Api.getWithToken<IResponseAllCustomUserMessages>(
                `message/custom-user/messages/${userId}?page=${pageParam}&sort=-received_at`
            )
            return res
        },
        enabled: !!userId,
        initialPageParam: '1',
        getNextPageParam: (lastPage) => {
            const nextPage = lastPage.next?.split('page=')[1].split('&')[0]
            return nextPage
        },
    })

    return query
}

export const useGetInfoAboutCustomUser = (userId: number | undefined) => {
    const query = useQuery({
        queryKey: ['custom-user', userId],
        queryFn: async () => {
            const res = await Api.getWithToken<ICustomUser>(
                `user/custom-user/${userId}`
            )
            return res
        },
        enabled: !!userId,
    })

    return query
}
