import { MailIcon } from 'lucide-react'

export const Logo = () => {
    return (
        <div className='flex items-center gap-2'>
            <MailIcon className='w-6 h-6 text-primary' />
            <h1 className='text-xl font-bold'>HR Hub</h1>
        </div>
    )
}
