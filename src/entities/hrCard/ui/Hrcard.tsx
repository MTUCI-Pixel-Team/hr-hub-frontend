import { Link } from 'react-router-dom'
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar'
import { Skeleton } from '@/shared/ui/skeleton'
import { useGetInfoHrUser } from '../api'

export const HrCard = ({ onClick }: { onClick?: () => void }) => {
    const query = useGetInfoHrUser()

    return (
        <Link to={'/settings'} onClick={onClick}>
            <div className='w-full inline-flex items-center gap-4 transition-all duration-300 hover:scale-[102%]'>
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
