export interface IToken {
    tokenType: string,
    accessToken: string,
    expires_in: number
}

export interface AuthDTO {
    username: string,
    password: string
}