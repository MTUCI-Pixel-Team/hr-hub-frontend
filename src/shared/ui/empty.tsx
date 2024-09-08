import { CircleOff } from 'lucide-react'
import { ReactNode } from 'react'

export const Empty = ({ children }: { children?: ReactNode }) => {
    return (
        <div className='h-full flex justify-center items-center'>
            <div className='scale-125 rounded-sm p-4 font-medium shadow-sm flex flex-col justify-center items-center'>
                <CircleOff />
                {children ? children : 'Нет сообщений'}
            </div>
        </div>
    )
}
