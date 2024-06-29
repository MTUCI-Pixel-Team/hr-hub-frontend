import axios, { AxiosError } from 'axios'
import { API_URL } from '../config/const'
import {
    getRefreshToken,
    getToken,
    removeTokens,
    setToken,
} from '../config/storage'

export const instance = axios.create({
    // к запросу будет прикрелп cookies
    withCredentials: true,
    // headers: {
    //     'Content-Type': 'multipart/form-data',
    // },
    baseURL: API_URL,
})

// создаем перехватчик запросов
// который к каждому запросу добавляет accessToken из localStorage
instance.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${getToken()}`
    return config
})

// создаем перехватчик ответов
// который в случае невалидного accessToken попытается его обновить
// и переотправить запрос с обновленным accessToken
instance.interceptors.response.use(
    // в случае валидного accessToken ничего не делаем:
    (config) => {
        return config
    },
    // в случае просроченного accessToken пытаемся его обновить:
    async (error) => {
        // предотвращаем зацикленный запрос, добавляя свойство _isRetry
        const originalRequest = { ...error.config }
        originalRequest._isRetry = true
        if (
            // проверим, что ошибка именно из-за невалидного accessToken
            error.response.status === 401 &&
            // проверим, что запрос не повторный
            error.config &&
            !error.config._isRetry
        ) {
            instance
                .post('/api/user/token/refresh/', {
                    refresh: getRefreshToken(),
                })
                .then((resp) => {
                    setToken(resp.data.access)
                    return instance.request(originalRequest)
                })
                .catch((error) => {
                    console.log(error)
                    if (error instanceof AxiosError) {
                        window.location.href = '/auth/login/'
                        removeTokens()
                    }
                })
        }
        // на случай, если возникла другая ошибка (не связанная с авторизацией)
        // пробросим эту ошибку
        throw error
    }
)
