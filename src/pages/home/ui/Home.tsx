import { FilteringByPeople } from '@/widgets/filteringByPeople'
import { Header } from '@/widgets/header'
import { InboxCardList } from '@/widgets/inboxCardList'
import { useLayoutStore } from '@/widgets/layouts'
import { Filter, Sort } from '@/features/filterSort'
import { Search } from '@/features/search'

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
                        <Filter render={<FilteringByPeople />} />
                    </>
                }
            />
            <InboxCardList />
        </>
    )
}
