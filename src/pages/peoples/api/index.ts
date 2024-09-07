import { useInfiniteQuery } from '@tanstack/react-query'
import { IResponseAllCustomUsers } from '@/entities/customUsers'
import { Api } from '@/shared/api'

export const useGetAllCustomUsers = () => {
    const query = useInfiniteQuery({
        queryKey: ['custom-users'],
        queryFn: ({ pageParam }) => {
            return Api.getWithToken<IResponseAllCustomUsers>(
                `user/custom-user/?page=${pageParam}`
            )
        },
        initialPageParam: '1',
        getNextPageParam: (lastPage) => {
            const nextPage = lastPage.next?.split('page=')[1].split('&')[0]
            return nextPage
        },
    })

    return query
}
