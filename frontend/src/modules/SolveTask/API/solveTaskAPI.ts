import { baseAPI } from "@/API/baseAPI.ts"
import { ITask } from "@/modules/Admin/types"
import { AttachmentResponse, SolutionDTO } from "@/modules/Task/types"

export const solveTaskAPI = baseAPI.injectEndpoints({
    endpoints: (build) => ({
        checkIsTaskOpened: build.query<{ isTaskOpen: boolean, isAnswerUploaded: boolean }, { olympiad_id: number, task_id: number }>({
            query: ({ olympiad_id, task_id }) => ({
                url: "/olymp/" + olympiad_id + "/tasks/" + task_id + "/check",
                method: "GET"
            })
        }),
        openTask: build.mutation<string, { olympiad_id: number, task_id: number }>({
            query: ({ olympiad_id, task_id }) => ({
                url: "/olymp/" + olympiad_id + "/tasks/" + task_id + "/open",
                method: "POST"
            })
        }),
        getTask: build.mutation<ITask, { olympiad_id: number, task_id: number }>({
            query: ({ olympiad_id, task_id }) => ({
                url: "/olymp/" + olympiad_id + "/tasks/" + task_id,
                method: "GET"
            })
        }),
        getAttachment: build.query<AttachmentResponse, { olympId: number, taskId: number, fileName: string }>({
            query: ({ olympId, taskId, fileName }) => ({
                url: `/olymp/${olympId}/tasks/${taskId}/attachments/${fileName}`,
                responseHandler: (response) => response.blob().then((data) => ({ data, fileName }))
            })
        }),
        uploadSolution: build.mutation<string, { olympiad_id: number, task_id: number, solutionDTO: SolutionDTO }>({
            query: ({ olympiad_id, task_id, solutionDTO }) => ({
                url: `/olymp/${olympiad_id}/tasks/${task_id}/solution`,
                method: "POST",
                body: solutionDTO
            })
        }),
        uploadSolutionWithFile: build.mutation<string, { olympiad_id: number, task_id: number, file: File }>({
            query: ({ file, task_id, olympiad_id }) => {
                const formData = new FormData();
                formData.append('file', file);

                return {
                    url: `/olymp/${olympiad_id}/tasks/${task_id}/uploadSolution`,
                    method: 'POST',
                    body: formData,
                };
            },
        })
    })
})