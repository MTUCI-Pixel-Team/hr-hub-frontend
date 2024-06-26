import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar'

export const MessageCard = () => {
    return (
        <div className='bg-card rounded-md shadow-sm relative'>
            <div className='flex items-start gap-4 p-4'>
                <Avatar className='w-10 h-10 border'>
                    <AvatarImage src='/placeholder-user.jpg' />
                    <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className='flex-1'>
                    <div className='flex items-center justify-between'>
                        <div className='flex gap-2'>
                            <div className='font-medium'>Антон Пушкин</div>
                            <div className='font-medium'>(@Tomato1337)</div>
                            <div className='font-small text-blue-500'>
                                Telegram
                            </div>
                        </div>
                        <div className='text-xs text-muted-foreground'>
                            2 часа назад
                        </div>
                    </div>

                    <p className='text-muted-foreground'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Eum, culpa reiciendis harum illum eaque ut doloremque et
                        porro, totam sapiente numquam eos tenetur suscipit
                        quisquam vel voluptates a accusamus, sunt dicta fugiat.
                        Veritatis doloribus eligendi voluptate in fugiat quos
                        labore ad qui possimus tenetur tempore facere inventore,
                        itaque, non, nisi commodi suscipit. Impedit error
                        repellendus, sed blanditiis ipsa, asperiores nulla illo
                        minus omnis nesciunt earum voluptas ut quisquam? Error
                        dicta eos labore reprehenderit, saepe aspernatur
                        eligendi veritatis esse provident nihil, tempore eius
                        totam eum officia voluptatibus laborum ipsa. Quidem eius
                        sit nisi placeat porro, minima recusandae rem quod
                        soluta molestiae?
                    </p>
                </div>
            </div>
        </div>
    )
}
