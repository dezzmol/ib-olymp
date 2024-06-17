import { Olympiad } from "@/modules/OlympiadAdmin/types"
import { TeamDTO } from "@/modules/Team/types"

export interface OlympiadAndApplications {
    olympiad: Olympiad
    teams: TeamDTO[]
}