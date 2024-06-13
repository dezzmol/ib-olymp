export interface User {
    id: number | undefined
    email: string | null
    username: string | null
    name: string | null
    surname: string | null
    patronymic: string | null
    role: string | null
}

export interface IStudentRegistration {
    age: number
    phoneNumber: string
    university: string
    otherContactsData: string
}

export interface IStudent {
    id: number
    user: User
    age: number
    phoneNumber: string
    university: string
    isCaptain: boolean
    otherContactsData: string
}