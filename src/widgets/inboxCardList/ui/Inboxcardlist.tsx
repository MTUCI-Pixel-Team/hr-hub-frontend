import { useEffect, useRef } from 'react'
import { useIntersection } from 'react-use'
import { DefaultCard } from '@/entities/defaultCard'
import { getPlatform } from '@/shared/lib/utils'
import { Empty } from '@/shared/ui/empty'
import { Skeleton } from '@/shared/ui/skeleton'
import { useGetAllMessage } from '../api'

export const InboxCardList = () => {
    const query = useGetAllMessage()
    const intersectionRef = useRef(null)
    const intersection = useIntersection(intersectionRef, {
        root: null,
        rootMargin: '0px',
        threshold: 1,
    })

    // const queryClient = useQueryClient()

    // useEffect(() => {
    //     // Сбрасываем данные для данного запроса при переходе на другой роут
    //     queryClient.resetQueries({
    //         queryKey: ['messages'],
    //     })
    // }, [location.pathname])

    useEffect(() => {
        if (
            intersection?.isIntersecting &&
            query.hasNextPage &&
            !query.isFetching
        ) {
            if (query.data && query.data?.pages[0].results.length > 0) {
                query.fetchNextPage()
            }
        }
    }, [intersection, query.hasNextPage, query.isFetching])

    if (query.isError) {
        return <div>Ошибка</div>
    }
    console.log(query)
    if (query.data && query.data?.pages[0].results.length <= 0) {
        return <Empty />
    }

    return (
        <div className='overflow-y-scroll p-3 h-screen'>
            <div>
                {query.data &&
                    query.data.pages.length > 0 &&
                    query.data.pages.map((page, index) => (
                        <div key={index}>
                            {page.results.map((message) => {
                                const platform = getPlatform(
                                    message.personal_chat_link
                                )
                                return (
                                    <DefaultCard
                                        personalChatLink={
                                            message.personal_chat_link
                                        }
                                        inbox={true}
                                        platform={platform}
                                        groupName={message.from_username}
                                        key={message.id}
                                        userId={message.id}
                                        {...message}
                                    />
                                )
                            })}
                        </div>
                    ))}
            </div>
            {/* Skeleton loader for fetching */}
            {(query.isFetching || !query.isConnected) && (
                <div className='p-3 flex flex-col gap-2'>
                    {new Array(8).fill(0).map((_, index) => (
                        <Skeleton
                            className='h-16 w-full'
                            key={`skeleton-${index}`}
                        />
                    ))}
                </div>
            )}
            {/* Intersection observer element to trigger infinite scrolling */}
            <div ref={intersectionRef} className='h-1' id='1' />{' '}
            {/* Invisible div to observe */}
        </div>
    )
}
