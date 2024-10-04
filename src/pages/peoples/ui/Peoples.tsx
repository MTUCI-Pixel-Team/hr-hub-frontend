import { Plus, PlusIcon } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useIntersection } from 'react-use'
import { CreatePeople } from '@/widgets/createPeople'
import { FilteringByPeople } from '@/widgets/filteringByPeople'
import { useGetUniqueUsers } from '@/widgets/filteringByPeople'
import { Header } from '@/widgets/header'
import { useLayoutStore } from '@/widgets/layouts'
import { Sort } from '@/features/filterSort'
import { Search } from '@/features/search'
import { DefaultCard } from '@/entities/defaultCard'
import { Button } from '@/shared/ui/button'
import { Empty } from '@/shared/ui/empty'
import { Skeleton } from '@/shared/ui/skeleton'
import { useGetAllCustomUsers } from '../api'

// const data = [
//     {
//         name: 'Александр',
//         profession: 'Веб-разработчик',
//         unreadMessages: 3,
//         user_id: 1,
//     },
// ]

export const PeoplesPage = () => {
    const setMenu = useLayoutStore((state) => state.setMenu)
    const [modalOpen, setModalOpen] = useState(false)
    const { data, isLoading, isError, error } = useGetUniqueUsers()
    const {
        data: dataCustomUsers,
        isFetching: isFetchingCustomUsers,
        isError: isErrorCustomUsers,
        fetchNextPage: fetchNextPageCustomUsers,
        hasNextPage: hasNextPageCustomUsers,
    } = useGetAllCustomUsers()

    const intersectionRef = useRef(null)
    const intersection = useIntersection(intersectionRef, {
        root: null,
        rootMargin: '0px',
        threshold: 1,
    })

    useEffect(() => {
        if (
            intersection?.isIntersecting &&
            hasNextPageCustomUsers &&
            !isFetchingCustomUsers
        ) {
            if (
                dataCustomUsers &&
                dataCustomUsers?.pages?.length > 0 &&
                dataCustomUsers?.pages.some((page) => page.results.length > 0)
            ) {
                fetchNextPageCustomUsers()
            }
        }
    }, [
        intersection,
        hasNextPageCustomUsers,
        dataCustomUsers,
        isFetchingCustomUsers,
    ])

    if (isErrorCustomUsers) {
        return <div className='text-red-500'>Ошибка</div>
    }

    const errorElement = !isFetchingCustomUsers &&
        dataCustomUsers &&
        dataCustomUsers!.pages?.length > 0 &&
        Array.isArray(dataCustomUsers.pages[0]) &&
        dataCustomUsers!.pages[0]?.length <= 0 && (
            <Empty>
                Нет пользователей{' '}
                <Button
                    size={'sm'}
                    onClick={() => setModalOpen(!modalOpen)}
                    className='shrink-0 w-10 h-10 transition-all duration-300 hover:scale-[102%] items-center justify-center'>
                    <Plus />
                </Button>
            </Empty>
        )

    // if (
    //     !isFetchingCustomUsers &&
    //     dataCustomUsers &&
    //     dataCustomUsers?.pages[0]?.length <= 0
    // ) {
    //     return <Empty>Нет пользователей</Empty>
    // }

    // console.log(data, dataCustomUsers, dataCustomUsers?.pages[0]?.length)
    return (
        <>
            <Header
                setMenu={setMenu}
                render={
                    <>
                        <Search placeholder='Поиск людей...' />
                        <Sort />
                        <CreatePeople
                            isUpdate={false}
                            isOpen={modalOpen}
                            onOpenChange={() => setModalOpen(!modalOpen)}
                            renderButton={
                                <Button
                                    variant='outline'
                                    size={'sm'}
                                    className='shrink-0 w-10 h-10 transition-all duration-300 hover:scale-[102%]'>
                                    <Plus />
                                </Button>
                            }
                            renderFilter={
                                <FilteringByPeople
                                    data={data}
                                    isLoading={isLoading}
                                    isError={isError}
                                    error={error}
                                />
                            }
                        />
                    </>
                }
            />
            {/* <header className='p-6 bg-background border-b border-muted flex items-center gap-4 px-6 h-16'></header> */}

            <main className='p-6 overflow-y-auto'>
                {/* <InfiniteScroll
                    dataLength={
                        dataCustomUsers?.pages.reduce(
                            (total, page) => total + page.results.length,
                            0
                        ) || 0
                    }
                    next={fetchNextPageCustomUsers}
                    hasMore={hasNextPageCustomUsers}
                    loader={<></>}>
                    {isErrorCustomUsers && (
                        <div className='text-red-500'>
                            {errorCustomUsers.message}
                        </div>
                    )}

                    {!isFetchingCustomUsers &&
                        dataCustomUsers &&
                        dataCustomUsers.pages.length > 0 &&
                        dataCustomUsers.pages.map((page) =>
                            page.results.map((user) => (
                                <Link key={user.id} to={`/peoples/${user.id}`}>
                                    <DefaultCard
                                        className='rounded-2xl transition-all duration-300  hover:bg-primary-foreground'
                                        profession={user.profession}
                                        groupName={user.group_name}
                                        userId={user.id}
                                    />
                                </Link>
                            ))
                        )}

                    {isFetchingCustomUsers && (
                        <div className='space-y-2'>
                            {new Array(8).fill(0).map(() => (
                                <Skeleton className=' h-16 w-full' />
                            ))}
                        </div>
                    )}
                </InfiniteScroll> */}
                {isErrorCustomUsers && (
                    <div className='text-red-500'>{error?.message}</div>
                )}

                {errorElement && (
                    <div className='h-[80vh] flex justify-center items-center'>
                        {errorElement}
                    </div>
                )}

                <div>
                    {!isFetchingCustomUsers &&
                        dataCustomUsers &&
                        dataCustomUsers?.pages?.length > 0 &&
                        dataCustomUsers?.pages?.map((page) =>
                            page?.results?.map((user) => (
                                <Link key={user.id} to={`/peoples/${user.id}`}>
                                    <DefaultCard
                                        className='rounded-2xl transition-all duration-300  hover:bg-primary-foreground'
                                        profession={user.profession}
                                        groupName={user.group_name}
                                        userId={user.id}
                                    />
                                </Link>
                            ))
                        )}
                </div>

                {/* {new Array(10).fill(0).map((_, index) => (
                    <Link to='/peoples/1'>
                        <DefaultCard
                            className='rounded-2xl transition-all duration-300 hover:scale-[101%] hover:bg-primary-foreground'
                            {...data[0]}
                            key={index}
                        />
                    </Link>
                ))} */}
                {isFetchingCustomUsers && (
                    <div className='space-y-2'>
                        {new Array(8).fill(0).map((_, index) => (
                            <Skeleton key={index} className=' h-16 w-full' />
                        ))}
                    </div>
                )}
                <div ref={intersectionRef} className='h-2' />
            </main>
        </>
    )
}
