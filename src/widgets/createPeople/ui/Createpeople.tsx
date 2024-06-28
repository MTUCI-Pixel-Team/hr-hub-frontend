import { Plus } from 'lucide-react'
import { ReactNode } from 'react'
import { Button } from '@/shared/ui/button'
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from '@/shared/ui/dialog'
import { Input } from '@/shared/ui/input'
import { Label } from '@/shared/ui/label'

export const CreatePeople = ({ renderFilter }: { renderFilter: ReactNode }) => {
    return (
        <Dialog>
            <DialogTrigger>
                <Button
                    variant='outline'
                    size={'sm'}
                    className='shrink-0 w-10 h-10 transition-all duration-300 hover:scale-[102%]'>
                    <Plus />
                </Button>
            </DialogTrigger>
            <DialogContent className='overflow-auto'>
                <DialogHeader className='overflow-auto'>
                    <DialogTitle>Создание нового пользователя</DialogTitle>
                    <DialogDescription>
                        Введите данные нового пользователя и добавьте его
                        никнеймы
                    </DialogDescription>
                </DialogHeader>
                <form className='flex flex-col gap-4'>
                    <div className='flex flex-col gap-2'>
                        <Label className='text-left' htmlFor='name'>
                            Имя пользователя:
                        </Label>
                        <Input
                            id='name'
                            type='text'
                            placeholder='Алексей Петров'
                            className='input'
                        />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <Label className='text-left' htmlFor='profession'>
                            Профессия пользователя:
                        </Label>
                        <Input
                            id='profession'
                            type='text'
                            placeholder='Frontend Developer'
                            className='input'
                        />
                    </div>
                    <div className='flex flex-col gap-2 '>
                        <Label className='text-left'>
                            Логины пользователей:
                        </Label>
                        {renderFilter}
                    </div>
                    <div className='flex gap-3'>
                        <Button
                            type='submit'
                            className='w-32 h-full transition-all duration-300 hover:scale-[102%]'>
                            Создать
                        </Button>
                        <Button
                            type='button'
                            variant='outline'
                            className='h-full transition-all duration-300 hover:scale-[105%]'>
                            Отмена
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}
