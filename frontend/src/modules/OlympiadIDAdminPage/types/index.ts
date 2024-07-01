import { Olympiad } from "@/modules/OlympiadAdmin/types"
import { TeamDTO } from "@/modules/Team/types"

export interface OlympiadAndApplications {
    olympiad: Olympiad
    teams: TeamDTO[]
}

export interface Result {
    id: number
    team: TeamDTO
    olympiad: Olympiad
    resultScore: number
    finalPlace: number
}