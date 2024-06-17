export interface ITask {
    id: number
    title: string
    description: string
    category: ICategory
    isOpen: boolean
    attachments: IAttachmentForTask[]
}

export interface ICategory {
    id: number
    name: string
    description: string
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
}