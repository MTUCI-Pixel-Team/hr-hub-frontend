import InfiniteScroll from 'react-infinite-scroll-component'
import { DefaultCard } from '@/entities/defaultCard'
import { getPlatform } from '@/shared/lib/utils'
import { Empty } from '@/shared/ui/empty'
import { Skeleton } from '@/shared/ui/skeleton'
import { useGetAllMessage } from '../api'

export const InboxCardList = () => {
    const query = useGetAllMessage()

    if (query.isLoading || !query.isConnected) {
        return (
            <div className='p-6 flex flex-col gap-4 overflow-y-auto'>
                {new Array(8).fill(0).map(() => (
                    <Skeleton className=' h-20 w-full' />
                ))}
            </div>
        )
    }

    if (query.isError) {
        return <div>Ошибка</div>
    }
    console.log(query.data)
    if (query.data && query.data?.pages[0].results.length <= 0) {
        return <Empty />
    }

    return (
        <div className='overflow-y-auto' id='scrollableDiv'>
            <InfiniteScroll
                dataLength={
                    query.data?.pages.reduce(
                        (total, page) => total + page.results.length,
                        0
                    ) || 0
                }
                next={query.fetchNextPage}
                hasMore={query.hasNextPage}
                scrollableTarget='scrollableDiv'
                loader={
                    <div className='p-6 flex flex-col gap-4 overflow-y-auto'>
                        {new Array(8).fill(0).map(() => (
                            <Skeleton className=' h-20 w-full' />
                        ))}
                    </div>
                }>
                <>
                    {query.data &&
                        query.data.pages.map((page, index) => (
                            <div key={index}>
                                {page.results.map((message) => {
                                    const platform = getPlatform(
                                        message.personal_chat_link
                                    )

                                    return (
                                        <DefaultCard
                                            inbox={true}
                                            platform={platform}
                                            {...message}
                                            key={message.id}
                                            id={message.id.toString()}
                                        />
                                    )
                                })}
                            </div>
                        ))}
                </>
            </InfiniteScroll>
        </div>
    )
}
