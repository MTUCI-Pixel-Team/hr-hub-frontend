import { FC, ImgHTMLAttributes } from 'react'
import Img from '../assets/logo.svg'

export const Logo: FC<ImgHTMLAttributes<HTMLImageElement>> = ({ ...props }) => {
    return <img {...props} src={Img} />
}
