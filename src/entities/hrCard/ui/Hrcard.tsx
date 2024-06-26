import { Link } from 'react-router-dom'
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar'

export const HrCard = () => {
    return (
        <Link to={'/settings'}>
            <div className='flex items-center gap-4 transition-all duration-300 hover:scale-105'>
                <Avatar className='w-10 h-10 border'>
                    <AvatarImage src='/placeholder-user.jpg' />
                    <AvatarFallback>HR</AvatarFallback>
                </Avatar>
                <div>
                    <div className='font-medium'>Илья Тюнин</div>
                </div>
            </div>
        </Link>
    )
}
