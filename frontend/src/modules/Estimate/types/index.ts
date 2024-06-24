import { ITask } from "@/modules/Admin/types"

export interface AnswerDTO {
    id: number
    startTime: Date
    endTime: Date
    task: ITask
    fileName: string
    isChecked: boolean
    ans: string
}

export interface RateSolutionDTO {
    isCreativeSolution: boolean
}