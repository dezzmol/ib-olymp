export interface ITask {
    id: number
    title: string
    description: string
    category: ICategory
    isOpen: boolean
    complexity: string
    isDetailedAnswer: boolean
    attachments: IAttachmentForTask[]
}

export interface ICategory {
    id: number
    name: string
    description: string
}

export interface ICreateCategory {
    name: string
    description: string
    mark: number
    time: number
    extraPoints: number
}

export interface IAttachmentForTask {
    id: number
    name: string
    pathToFile: string
}

export interface ICreateTask {
    title: string
    description: string
    category_id: number
    isTaskForWhile: boolean
    isDetailedAnswer: boolean
    mark: number
    rightAnswer: string
    complexity: string
}

export type complexity = "Низкая" | "Средняя" | "Высокая"