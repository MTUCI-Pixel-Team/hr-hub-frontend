export interface IResponseAllCustomUsers {
    count: number | null
    next: string | null
    previous: string | null
    results: ICustomUser[]
}

export interface ICustomUser {
    id: number
    profession: string
    group_name: string
    created_at: string
    members: IMembers[]
}

export interface IMembers {
    id: number
    group: number
    user_name_from_message: string
    service_name: string
    chat_link: string
    created_at: string
    added: boolean
}

export interface IResponseAllCustomUserMessages {
    count: number | null
    next: string | null
    previous: string | null
    results: ICustomUserMessages[]
}

export interface ICustomUserMessages {
    id: number
    account_id: number
    from_username: string
    from_userphone: string
    text: string
    personal_chat_link: string
    received_at: string
    is_read: boolean
}
