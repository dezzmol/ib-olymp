import { TeamDTO } from "@/modules/Team/types"
import { ITask } from "@/modules/Admin/types"

export interface CreateOlympiadDTO {
    name: string
    description: string
    university: string
    startDate: Date
    endDate: Date
}

export interface Olympiad {
    id: number
    name: string
    description: string
    university: string
    startDate: Date
    endDate: Date
}

export interface OlympiadApplications {
    olympiad: Olympiad,
    teams: TeamDTO[]
}

export interface IAdminOlympiad extends Olympiad {
    members: TeamDTO[]
    tasks: ITask[]
}