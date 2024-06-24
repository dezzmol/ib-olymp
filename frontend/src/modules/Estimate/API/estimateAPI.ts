import { baseAPI } from "@/API/baseAPI.ts"
import { AnswerDTO, RateSolutionDTO } from "@/modules/Estimate/types"
import { AttachmentResponse } from "@/modules/Task/types"

export const estimateAPI = baseAPI.injectEndpoints({
    endpoints: (build) => ({
        getOlympiadAnswers: build.query<AnswerDTO[], number>({
            query: (id) => ({
                url: `/estimate/olymp/${id}/solutions`,
                method: "GET"
            }),
            providesTags: result => ["answers"]
        }),
        getTaskAnswers: build.query<AnswerDTO[], { olympiad_id: number, task_id: number }>({
            query: ({ olympiad_id, task_id }) => ({
                url: `/estimate/olymp/${olympiad_id}/solutions/${task_id}`,
                method: "GET"
            }),
            providesTags: result => ["task_answers"]
        }),
        getSolution: build.query<AttachmentResponse, { olympId: number, taskId: number, fileName: string }>({
            query: ({ olympId, taskId, fileName }) => ({
                url: `/estimate/olymp/${olympId}/solution/${taskId}/attachments/${fileName}`,
                responseHandler: (response) => response.blob().then((data) => ({ data, fileName }))
            }),
            providesTags: result => ["solutions"]
        }),
        rateSolution: build.mutation<string, {
            olympiad_id: number,
            solution_id: number,
            rateSolutionDTO: RateSolutionDTO
        }>({
            query: ({ olympiad_id, solution_id, rateSolutionDTO }) => ({
                url: `/estimate/olymp/${olympiad_id}/solution/${solution_id}`,
                method: "POST",
                body: rateSolutionDTO
            }),
            invalidatesTags: ["solutions"]
        })
    })
})