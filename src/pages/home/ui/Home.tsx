import { UserPlus } from 'lucide-react'
import { FilteringByPeople } from '@/widgets/filteringByPeople'
import { Header } from '@/widgets/header'
import { InboxCardList } from '@/widgets/inboxCardList'
import {
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
} from '@/shared/ui/dropdown-menu'

export const HomePage = () => {
    return (
        <>
            <Header
                renderFilter={
                    <DropdownMenuSub>
                        <DropdownMenuSubTrigger>
                            <UserPlus className='mr-2 h-4 w-4' />
                            <span>Люди</span>
                        </DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                            <DropdownMenuSubContent className='p-3'>
                                <DropdownMenuLabel className='mb-2'>
                                    Фильтрация по пользователям:
                                </DropdownMenuLabel>
                                <FilteringByPeople />
                            </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                    </DropdownMenuSub>
                }
            />
            <InboxCardList />
        </>
    )
}
