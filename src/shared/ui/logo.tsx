import { FC, ImgHTMLAttributes } from 'react'

export const Logo: FC<ImgHTMLAttributes<HTMLImageElement>> = ({ ...props }) => {
    return <img {...props} src={'/logo.svg'} />
}
