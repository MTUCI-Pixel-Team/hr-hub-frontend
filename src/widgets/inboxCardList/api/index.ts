import { useInfiniteQuery } from '@tanstack/react-query'
import { Api } from '@/shared/api'
import { IMessageResponse } from '../model'

export const useGetAllMessage = () => {
    const query = useInfiniteQuery({
        queryKey: ['messages'],
        queryFn: ({ pageParam }) => {
            return Api.getWithToken<IMessageResponse>(
                `message/list/?page=${pageParam}`
            )
        },
        initialPageParam: '1',
        getNextPageParam: (lastPage) => {
            return lastPage.next
        },
    })

    return query
}
