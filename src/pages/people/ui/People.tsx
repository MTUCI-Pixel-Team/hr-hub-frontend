import { ArrowLeftIcon, MailIcon, PhoneIcon } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Avatar, AvatarImage, AvatarFallback } from '@/shared/ui/avatar'
import { Button } from '@/shared/ui/button'

// const data = [
//     {
//         name: 'Александр',
//         username: 'alex',
//         platform: 'Telegram',
//         profession: 'Веб-разработчик',
//         date: '16:30 26.06.2024',
//         inbox: true,
//         text: 'Привет, как дела?',
//     },
// ]

export const PeoplePage = () => {
    return (
        <>
            <header className='bg-background border-b border-muted flex items-center gap-4 px-6 h-16'>
                <div className='flex items-center gap-4'>
                    <Link
                        to='/peoples'
                        className='text-muted-foreground hover:text-foreground'>
                        <ArrowLeftIcon className='w-4 h-4' />
                    </Link>
                    <div className='flex items-center gap-2'>
                        <Avatar className='w-10 h-10 border'>
                            <AvatarImage src='/placeholder-user.jpg' />
                            <AvatarFallback>JD</AvatarFallback>
                        </Avatar>
                        <div>
                            <div className='font-medium'>John Doe</div>
                            <div className='text-xs text-muted-foreground'>
                                Software Engineer
                            </div>
                        </div>
                    </div>
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
            <main className='p-6'>{/* <DefaultCard {...data[0]} /> */}</main>
        </>
    )
}
