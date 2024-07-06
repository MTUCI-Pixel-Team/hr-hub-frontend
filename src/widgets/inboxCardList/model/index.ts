export interface IMessageResponse {
    count: number
    next: null | string
    previous: null | string
    results: IMessage[]
}

export interface IMessage {
    id: number
    from_username: string
    from_userphone: null | string
    text: string
    personal_chat_link: string
    received_at: string
    is_read: boolean
}
