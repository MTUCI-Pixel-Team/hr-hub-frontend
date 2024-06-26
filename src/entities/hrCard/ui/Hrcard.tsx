import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar'

export const HrCard = () => {
    return (
        <div className='flex items-center gap-4'>
            <Avatar className='w-10 h-10 border'>
                <AvatarImage src='/placeholder-user.jpg' />
                <AvatarFallback>HR</AvatarFallback>
            </Avatar>
            <div>
                <div className='font-medium'>Илья Тюнин</div>
            </div>
        </div>
    )
}
