import { ArrowLeftIcon, MailIcon, PhoneIcon } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useIntersection } from 'react-use'
import { CreatePeople } from '@/widgets/createPeople'
import {
    FilteringByPeople,
    useGetUniqueUsers,
} from '@/widgets/filteringByPeople'
import { DefaultCard } from '@/entities/defaultCard'
import { cn, getPlatform } from '@/shared/lib/utils'
import { Avatar, AvatarFallback } from '@/shared/ui/avatar'
import { Button } from '@/shared/ui/button'
import { Empty } from '@/shared/ui/empty'
import { Skeleton } from '@/shared/ui/skeleton'
import { useGetAllCustomUserMessages, useGetInfoAboutCustomUser } from '../api'

export const PeoplePage = () => {
    const params = useParams()
    const userId = params.id ? +params.id : undefined
    const { data, isFetching, isError, error, fetchNextPage, hasNextPage } =
        useGetAllCustomUserMessages(userId)
    const {
        data: dataCustomUser,
        isLoading: isLoadingCustomUser,
        isError: isErrorCustomUser,
        error: errorCustomUser,
    } = useGetInfoAboutCustomUser(userId)
    const {
        data: dataUniqueUsers,
        isLoading: isLoadingUniqueUsers,
        isError: isErrorUniqueUsers,
        error: errorUniqueUsers,
    } = useGetUniqueUsers()

    const intersectionRef = useRef(null)
    const intersection = useIntersection(intersectionRef, {
        root: null,
        rootMargin: '0px',
        threshold: 1,
    })

    const formatedMembers = dataCustomUser?.members.map((member) => ({
        id: member.id,
        username_from_message: member.user_name_from_message,
        service_name: member.service_name,
        chat_link: member.chat_link,
        added: member.added,
    }))

    const [modalOpen, setModalOpen] = useState(false)

    useEffect(() => {
        if (intersection?.isIntersecting && hasNextPage && !isFetching) {
            if (
                data &&
                data?.pages?.length > 0 &&
                data?.pages.some((page) => page.results.length > 0)
            ) {
                fetchNextPage()
            }
        }
    }, [intersection, hasNextPage, data, isFetching])

    // if (isError) {
    //     return <div className='text-red-500'>Ошибка</div>
    // }
    // if (data && data?.pages[0].results.length <= 0) {
    //     return <Empty />
    // }

    return (
        <>
            <header className='bg-background border-b border-muted flex items-center gap-4 px-6 h-16'>
                <div className='flex items-center gap-4'>
                    <Link
                        to='/peoples'
                        className='w-8 h-8 rounded-full flex justify-center items-center text-muted-foreground transition-colors duration-300 hover:text-foreground hover:bg-primary-foreground'>
                        <ArrowLeftIcon className='w-4 h-4' />
                    </Link>
                    <CreatePeople
                        renderFilter={
                            <FilteringByPeople
                                isUpdating={true}
                                pickPeoples={formatedMembers}
                                data={dataUniqueUsers}
                                isLoading={isLoadingUniqueUsers}
                                isError={isErrorUniqueUsers}
                                error={errorUniqueUsers}
                            />
                        }
                        isOpen={modalOpen}
                        isUpdate={true}
                        data={dataCustomUser}
                        onOpenChange={() => setModalOpen(!modalOpen)}
                        renderButton={
                            <div
                                className='flex justify-start items-center gap-2 p-3 cursor-pointer duration-300 hover:bg-primary-foreground'
                                onClick={() => setModalOpen(true)}>
                                {isErrorCustomUser && (
                                    <div className='text-red-500'>
                                        {errorCustomUser.message}
                                    </div>
                                )}

                                {isLoadingCustomUser ? (
                                    <Skeleton className='w-10 h-10 rounded-full' />
                                ) : (
                                    <Avatar className='w-10 h-10 border'>
                                        {/* <AvatarImage src='/placeholder-user.jpg' /> */}
                                        <AvatarFallback>
                                            {dataCustomUser?.group_name
                                                .slice(0, 1)
                                                .toUpperCase()}
                                        </AvatarFallback>
                                    </Avatar>
                                )}
                                <div
                                    className={cn(
                                        'flex flex-col justify-start  items-start',
                                        {
                                            'gap-2': isLoadingCustomUser,
                                        }
                                    )}>
                                    <div className='font-medium'>
                                        {isLoadingCustomUser ? (
                                            <Skeleton className='w-32 h-4' />
                                        ) : (
                                            dataCustomUser?.group_name
                                        )}
                                    </div>
                                    <div className='text-xs text-muted-foreground'>
                                        {isLoadingCustomUser ? (
                                            <Skeleton className='w-32 h-4' />
                                        ) : (
                                            dataCustomUser?.profession
                                        )}
                                    </div>
                                </div>
                            </div>
                        }
                    />
                </div>
                <div className='ml-auto flex items-center gap-4'>
                    <Button
                        variant='ghost'
                        size='icon'
                        className='rounded-full'>
                        <PhoneIcon className='w-4 h-4' />
                        <span className='sr-only'>Call</span>
                    </Button>
                    <Button
                        variant='ghost'
                        size='icon'
                        className='rounded-full'>
                        <MailIcon className='w-4 h-4' />
                        <span className='sr-only'>Email</span>
                    </Button>
                </div>
            </header>
            <main className='p-6 h-full overflow-y-auto'>
                {isError && <div className='text-red-500'>{error.message}</div>}
                {data && data?.pages[0].results.length <= 0 && <Empty />}
                <div>
                    {data &&
                        data.pages.length > 0 &&
                        data.pages.map((page) =>
                            page.results.map((message) => {
                                const platform = getPlatform(
                                    message.personal_chat_link
                                )

                                return (
                                    <DefaultCard
                                        inbox={true}
                                        platform={platform}
                                        text={message.text}
                                        personalChatLink={
                                            message.personal_chat_link
                                        }
                                        received_at={message.received_at}
                                        groupName={message.from_username}
                                        key={message.id}
                                    />
                                )
                            })
                        )}
                </div>

                {isFetching && (
                    <div className='space-y-2'>
                        {new Array(8).fill(0).map(() => (
                            <Skeleton className=' h-16 w-full' />
                        ))}
                    </div>
                )}

                <div className='h-2' ref={intersectionRef}></div>
            </main>
        </>
    )
}
