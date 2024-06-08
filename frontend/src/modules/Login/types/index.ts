export interface IToken {
    tokenType: string,
    accessToken: string,
    expires_in: number
}

export interface AuthDTO {
    username: string,
    password: string
}

export interface RegisterDTO {
    email: string | null
    username: string | null
    name: string | null
    surname: string | null
    patronymic: string | null
    password: string | null
}