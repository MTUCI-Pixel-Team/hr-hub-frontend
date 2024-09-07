import { Header } from '@/widgets/header'
import { InboxCardList } from '@/widgets/inboxCardList'
import { useLayoutStore } from '@/widgets/layouts'
import { Sort } from '@/features/filterSort'
import { Search } from '@/features/search'

export const HomePage = () => {
    const setMenu = useLayoutStore((state) => state.setMenu)
    // const { data, isError, isLoading, error } = useGetUniqueUsers()

    return (
        <>
            <Header
                setMenu={setMenu}
                render={
                    <>
                        <Search placeholder='Поиск людей...' />
                        <Sort />
                        {/* <Filter
                            render={
                                <FilteringByPeople
                                    data={data}
                                    isLoading={isLoading}
                                    isError={isError}
                                    error={error}
                                />
                            }
                        /> */}
                    </>
                }
            />
            <InboxCardList />
        </>
    )
}
