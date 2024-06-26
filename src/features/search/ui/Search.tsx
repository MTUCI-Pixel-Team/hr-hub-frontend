import { SearchIcon } from 'lucide-react'
import { FC, InputHTMLAttributes } from 'react'
import { Input } from '@/shared/ui/input'

export const Search: FC<InputHTMLAttributes<HTMLInputElement>> = ({
    ...props
}) => {
    return (
        <div className='relative flex-1'>
            <SearchIcon className='absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground' />
            <Input type='search' className='pl-10 w-full' {...props} />
        </div>
    )
}
