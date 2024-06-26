import { ListOrderedIcon } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/shared/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu'

export const Sort = () => {
    const [sort, setSort] = useState('new')

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant='ghost' size='icon' className='rounded-full'>
                    <ListOrderedIcon className='w-4 h-4' />
                    <span className='sr-only'>Sort</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent onChange={(e) => console.log(e)} align='end'>
                <DropdownMenuRadioGroup value={sort} onValueChange={setSort}>
                    <DropdownMenuRadioItem value='new'>
                        Новые
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value='old'>
                        Старые
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value='unread'>
                        Непрочитанные
                    </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
