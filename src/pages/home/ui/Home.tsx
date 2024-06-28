import { UserPlus } from 'lucide-react'
import { FilteringByPeople } from '@/widgets/filteringByPeople'
import { Header } from '@/widgets/header'
import { InboxCardList } from '@/widgets/inboxCardList'
import { useLayoutStore } from '@/widgets/layouts'
import { Filter, Sort } from '@/features/filterSort'
import { Search } from '@/features/search'
import {
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
} from '@/shared/ui/dropdown-menu'

export const HomePage = () => {
    const setMenu = useLayoutStore((state) => state.setMenu)

    return (
        <>
            <Header
                setMenu={setMenu}
                render={
                    <>
                        <Search placeholder='Поиск людей...' />
                        <Sort />
                        <Filter
                            render={
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
                    </>
                }
            />
            <InboxCardList />
        </>
    )
}
