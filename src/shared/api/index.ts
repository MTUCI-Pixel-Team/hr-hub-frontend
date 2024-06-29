import axios, { AxiosError } from 'axios'
import { API_URL } from '../config/const'

export class Api {
    static API_URL = `${API_URL}/api/`

    static async get<T>(url: string): Promise<T> {
        try {
            const response = await axios.get<T>(`${this.API_URL}${url}`)
            return response.data
        } catch (error) {
            if (error instanceof AxiosError) {
                throw new Error(error.response?.data)
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
                console.log(error)
                throw new Error(
                    error.response?.data.detail ||
                        error.response?.data ||
                        error.message
                )
            }
            throw error
        }
    }
}
