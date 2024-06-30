import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { Api } from '@/shared/api'
import { IAuthForm } from '../models'

export const useCreateUser = () => {
    const navigate = useNavigate()

    const mutation = useMutation({
        mutationFn: (data: IAuthForm) => {
            return Api.post('user/create/', data)
        },
        onSuccess: () => {
            navigate('/auth/login')
        },
    })

    return mutation
}
