import { IStudent } from "@/modules/Profile/types"

export interface TeamDTO {
    id: number,
    name: string,
    students: IStudent[]
}