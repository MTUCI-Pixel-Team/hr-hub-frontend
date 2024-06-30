import { Header } from '@/widgets/header'
import { useLayoutStore } from '@/widgets/layouts'
import { SettingsForm } from '@/widgets/settingsForm'
import { HrCard } from '@/entities/hrCard'

export const SettingsPage = () => {
    const setMenu = useLayoutStore((state) => state.setMenu)
    return (
        <>
            <Header
                setMenu={setMenu}
                render={
                    <div className='flex items-center justify-between'>
                        <h1 className='text-2xl font-semibold'>Настройки:</h1>
                    </div>
                }
            />
            <main className='p-6'>
                <HrCard scale={false} />
                <SettingsForm />
            </main>
        </>
    )
}
