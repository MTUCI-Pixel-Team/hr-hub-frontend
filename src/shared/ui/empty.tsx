import { CircleOff } from 'lucide-react'

export const Empty = () => {
    return (
        <div className='h-full flex justify-center items-center'>
            <div className='scale-150 rounded-sm p-4 font-medium shadow-sm flex flex-col justify-center items-center'>
                <CircleOff />
                Нет сообщений
            </div>
        </div>
    )
}
