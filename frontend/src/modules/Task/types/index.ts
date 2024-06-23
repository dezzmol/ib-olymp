export interface ICreateAttachment {
    name: string
    taskId: number
}

export interface AttachmentResponse {
    data: Blob;
    fileName: string;
}

export interface SolutionDTO {
    answer: string
}