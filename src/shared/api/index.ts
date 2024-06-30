import axios, { AxiosError } from 'axios'
import { API_URL } from '../config/const'
import { instance } from './api-auth.config'

export class Api {
    static API_URL = `${API_URL}/api/`

    static async get<T>(url: string): Promise<T> {
        try {
            const response = await axios.get<T>(`${this.API_URL}${url}`)
            return response.data
        } catch (error) {
            if (error instanceof AxiosError) {
                if (
                    error.response &&
                    typeof error.response.data === 'object' &&
                    error.response.data !== null
                ) {
                    const errorMessages = Object.values(error.response.data)
                        .flat()
                        .filter((value) => typeof value === 'string')

                    if (errorMessages.length > 0) {
                        throw new Error(errorMessages.join('. '))
                    }
                }

                throw new Error(error.message || 'An error occurred')
            }
            throw error
        }
    }

    static async post<T, R>(url: string, body: T): Promise<R> {
        try {
            const response = await axios.post<R>(`${this.API_URL}${url}`, body)
            return response.data
        } catch (error) {
            if (error instanceof AxiosError) {
                if (
                    error.response &&
                    typeof error.response.data === 'object' &&
                    error.response.data !== null
                ) {
                    const errorMessages = Object.values(error.response.data)
                        .flat()
                        .filter((value) => typeof value === 'string')

                    if (errorMessages.length > 0) {
                        throw new Error(errorMessages.join('. '))
                    }
                }

                throw new Error(error.message || 'An error occurred')
            }
            throw error
        }
    }

    static async put<T, R>(url: string, body: T): Promise<R> {
        try {
            const response = await axios.put<R>(`${this.API_URL}${url}`, body)
            return response.data
        } catch (error) {
            if (error instanceof AxiosError) {
                if (
                    error.response &&
                    typeof error.response.data === 'object' &&
                    error.response.data !== null
                ) {
                    const errorMessages = Object.values(error.response.data)
                        .flat()
                        .filter((value) => typeof value === 'string')

                    if (errorMessages.length > 0) {
                        throw new Error(errorMessages.join('. '))
                    }
                }

                throw new Error(error.message || 'An error occurred')
            }
            throw error
        }
    }

    static async delete<T>(url: string): Promise<T> {
        try {
            const response = await axios.delete<T>(`${this.API_URL}${url}`)
            return response.data
        } catch (error) {
            if (error instanceof AxiosError) {
                if (
                    error.response &&
                    typeof error.response.data === 'object' &&
                    error.response.data !== null
                ) {
                    const errorMessages = Object.values(error.response.data)
                        .flat()
                        .filter((value) => typeof value === 'string')

                    if (errorMessages.length > 0) {
                        throw new Error(errorMessages.join('. '))
                    }
                }

                throw new Error(error.message || 'An error occurred')
            }
            throw error
        }
    }

    static async patch<T, R>(url: string, body: T): Promise<R> {
        try {
            const response = await axios.patch<R>(`${this.API_URL}${url}`, body)
            return response.data
        } catch (error) {
            if (error instanceof AxiosError) {
                if (
                    error.response &&
                    typeof error.response.data === 'object' &&
                    error.response.data !== null
                ) {
                    const errorMessages = Object.values(error.response.data)
                        .flat()
                        .filter((value) => typeof value === 'string')

                    if (errorMessages.length > 0) {
                        throw new Error(errorMessages.join('. '))
                    }
                }

                throw new Error(error.message || 'An error occurred')
            }
            throw error
        }
    }

    static async getWithToken<T>(url: string): Promise<T> {
        try {
            const response = await instance.get<T>(`${this.API_URL}${url}`)
            return response.data
        } catch (error) {
            if (error instanceof AxiosError) {
                if (
                    error.response &&
                    typeof error.response.data === 'object' &&
                    error.response.data !== null
                ) {
                    const errorMessages = Object.values(error.response.data)
                        .flat()
                        .filter((value) => typeof value === 'string')

                    if (errorMessages.length > 0) {
                        throw new Error(errorMessages.join('. '))
                    }
                }

                throw new Error(error.message || 'An error occurred')
            }
            throw error
        }
    }

    static async postWithToken<T, R>(url: string, body: T): Promise<R> {
        try {
            const response = await instance.post<R>(
                `${this.API_URL}${url}`,
                body
            )
            return response.data
        } catch (error) {
            if (error instanceof AxiosError) {
                if (
                    error.response &&
                    typeof error.response.data === 'object' &&
                    error.response.data !== null
                ) {
                    const errorMessages = Object.values(error.response.data)
                        .flat()
                        .filter((value) => typeof value === 'string')

                    if (errorMessages.length > 0) {
                        throw new Error(errorMessages.join('. '))
                    }
                }

                throw new Error(error.message || 'An error occurred')
            }
            throw error
        }
    }

    static async putWithToken<T, R>(url: string, body: T): Promise<R> {
        try {
            const response = await instance.put<R>(
                `${this.API_URL}${url}`,
                body
            )
            return response.data
        } catch (error) {
            if (error instanceof AxiosError) {
                if (
                    error.response &&
                    typeof error.response.data === 'object' &&
                    error.response.data !== null
                ) {
                    const errorMessages = Object.values(error.response.data)
                        .flat()
                        .filter((value) => typeof value === 'string')

                    if (errorMessages.length > 0) {
                        throw new Error(errorMessages.join('. '))
                    }
                }

                throw new Error(error.message || 'An error occurred')
            }
            throw error
        }
    }

    static async deleteWithToken<T>(url: string): Promise<T> {
        try {
            const response = await instance.delete<T>(`${this.API_URL}${url}`)
            return response.data
        } catch (error) {
            if (error instanceof AxiosError) {
                if (
                    error.response &&
                    typeof error.response.data === 'object' &&
                    error.response.data !== null
                ) {
                    const errorMessages = Object.values(error.response.data)
                        .flat()
                        .filter((value) => typeof value === 'string')

                    if (errorMessages.length > 0) {
                        throw new Error(errorMessages.join('. '))
                    }
                }

                throw new Error(error.message || 'An error occurred')
            }
            throw error
        }
    }

    static async patchWithToken<T, R>(url: string, body: T): Promise<R> {
        try {
            const response = await instance.patch<R>(
                `${this.API_URL}${url}`,
                body
            )
            return response.data
        } catch (error) {
            if (error instanceof AxiosError) {
                if (
                    error.response &&
                    typeof error.response.data === 'object' &&
                    error.response.data !== null
                ) {
                    const errorMessages = Object.values(error.response.data)
                        .flat()
                        .filter((value) => typeof value === 'string')

                    if (errorMessages.length > 0) {
                        throw new Error(errorMessages.join('. '))
                    }
                }

                throw new Error(error.message || 'An error occurred')
            }
            throw error
        }
    }
}
