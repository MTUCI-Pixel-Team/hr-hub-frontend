import { Header } from '@/widgets/header'
import { useLayoutStore } from '@/widgets/layouts'
import { ModalAvito } from '@/widgets/modals/modalAvito'
import { ModalTelegram } from '@/widgets/modals/modalTelegram'
import { ModalVk } from '@/widgets/modals/modalVk'
import { ModalYandex } from '@/widgets/modals/modalYandex'
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
                <SettingsForm
                    renderYandex={<ModalYandex />}
                    renderTelegram={<ModalTelegram />}
                    renderAvito={<ModalAvito />}
                    renderVk={<ModalVk />}
                />
            </main>
        </>
    )
}
