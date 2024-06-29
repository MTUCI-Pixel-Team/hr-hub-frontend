import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { Api } from '@/shared/api'
import { setRefreshToken, setToken } from '@/shared/config/storage'
import { IAuthForm, IAuthFormRequest } from '../models'

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

export const useLoginUser = () => {
    const navigate = useNavigate()

    const mutation = useMutation({
        mutationFn: async (data: IAuthForm) => {
            const request = await Api.post<IAuthForm, IAuthFormRequest>(
                'user/token/',
                data
            )
            return request
        },
        onSuccess: (data: IAuthFormRequest) => {
            setToken(data.access)
            setRefreshToken(data.refresh)
            navigate('/')
        },
    })

    return mutation
}
