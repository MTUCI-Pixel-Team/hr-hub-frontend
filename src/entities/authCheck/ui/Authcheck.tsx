import { ReactNode, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getRefreshToken } from '@/shared/config/storage'

export const AuthCheck = ({ children }: { children: ReactNode }) => {
    const token = getRefreshToken()
    const navigate = useNavigate()

    useEffect(() => {
        if (!token) {
            navigate('/auth/login')
        }
    }, [token])

    return <>{children}</>
}
