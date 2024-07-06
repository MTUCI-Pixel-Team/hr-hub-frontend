import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar'
import { Skeleton } from '@/shared/ui/skeleton'
import { useGetInfoHrUser } from '../api'
import { useHrUserInfo } from '../models'

export const HrCard = ({
    onClick,
    scale = true,
}: {
    onClick?: () => void
    scale?: boolean
}) => {
    const query = useGetInfoHrUser()
    const setHrUsername = useHrUserInfo((state) => state.setUsername)
    const setHrEmail = useHrUserInfo((state) => state.setEmail)
    const setHrId = useHrUserInfo((state) => state.setId)

    useEffect(() => {
        if (query.data && query.isSuccess && !query.isLoading) {
            setHrUsername(query.data.username)
            setHrEmail(query.data.email)
            setHrId(query.data.id)
        }
    }, [query, setHrUsername])

    return (
        <Link to={'/settings'} onClick={onClick}>
            <div
                className={`w-full inline-flex items-center gap-4 transition-all duration-300 ${
                    scale ? 'hover:scale-[105%]' : ''
                }`}>
                {query.isLoading ? (
                    <div className='flex gap-2 items-center'>
                        <Skeleton className='w-10 h-10 rounded-full' />
                        <Skeleton className='w-32 h-4' />
                    </div>
                ) : query.isError ? (
                    <div className='flex gap-2 items-center'>
                        {query.error.message}
                    </div>
                ) : (
                    <>
                        <Avatar className='w-10 h-10 border'>
                            <AvatarImage src='/placeholder-user.jpg' />
                            <AvatarFallback>
                                {query.data?.username.toUpperCase().slice(0, 2)}
                            </AvatarFallback>
                        </Avatar>
                        <div className='w-full overflow-hidden'>
                            <div className='font-medium truncate'>
                                {query.data?.username}
                            </div>
                        </div>
                    </>
                )}
            </div>
        </Link>
    )
}
