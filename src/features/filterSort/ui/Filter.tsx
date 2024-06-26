import { FilterIcon } from 'lucide-react'
import { ReactNode } from 'react'
import { Button } from '@/shared/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu'
// import { People } from './People'

export const Filter = ({ render }: { render: ReactNode }) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant='ghost' size='icon' className='rounded-full'>
                    <FilterIcon className='w-4 h-4' />
                    <span className='sr-only'>Filter</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
                {/* <People /> */}
                {render}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
