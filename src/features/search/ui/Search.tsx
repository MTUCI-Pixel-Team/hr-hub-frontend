import { SearchIcon } from 'lucide-react'
import { Input } from '@/shared/ui/input'

export const Search = () => {
    return (
        <div className='relative flex-1'>
            <SearchIcon className='absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground' />
            <Input
                type='search'
                placeholder='Поиск сообщений...'
                className='pl-10 w-full'
            />
        </div>
    )
}
