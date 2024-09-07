import { UseInfiniteQueryResult } from '@tanstack/react-query'
import { FC, ReactNode, useEffect } from 'react'
import { Empty } from '@/shared/ui/empty'
import { Skeleton } from '@/shared/ui/skeleton'

interface IInboxCardListProps {
    query: UseInfiniteQueryResult<any, any> & {
        isConnected?: boolean
    }
    renderContent: ReactNode
    ref: any
    entry: any
}

export const InfinityScroll: FC<IInboxCardListProps> = ({
    query,
    renderContent,
    ref,
    entry,
}) => {
    useEffect(() => {
        if (entry?.isIntersecting && query.hasNextPage) {
            query.fetchNextPage()
        }
    }, [entry, query.hasNextPage])

    if (query.isError) {
        return <div>Ошибка</div>
    }

    console.log(ref, entry)
    console.log(
        query.data?.pages[0].results.length,
        entry?.isIntersecting,
        query.hasNextPage
    )
    if (
        (query.data && query.data?.pages[0].results.length <= 0) ||
        !query.data
    ) {
        return <Empty />
    }

    return (
        <div className='overflow-y-scroll p-3 h-screen'>
            <div>{renderContent}</div>
            {/* Skeleton loader for fetching */}
            {(query.isFetching || query.isLoading) && (
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
            <div ref={ref} className='h-1' /> {/* Invisible div to observe */}
        </div>
    )
}
