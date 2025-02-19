import { baseAPI } from "@/API/baseAPI.ts"
import { IAttachmentForTask, ITask } from "@/modules/Admin/types"
import { AttachmentResponse } from "@/modules/Task/types"

export const taskAPI = baseAPI.injectEndpoints({
    endpoints: (build) => ({
        getTaskById: build.query<ITask, number>({
            query: (id) => ({
                url: "/olympadmin/tasks/" + id,
                method: "GET"
            })
        }),
        createAttachment: build.mutation<IAttachmentForTask, {file: File; taskId: number}>({
            query: ({ file, taskId }) => {
                const formData = new FormData();
                formData.append('file', file);

                return {
                    url: "/olympadmin/tasks/" + taskId + '/attachments',
                    method: 'POST',
                    body: formData,
                };
            },
        }),
        getAttachment: build.query<AttachmentResponse, { taskId: number, fileName: string }>({
            query: ({ taskId, fileName }) => ({
                url: `/olympadmin/tasks/${taskId}/attachments/${fileName}`,
                responseHandler: (response) => response.blob().then((data) => ({ data, fileName }))
            }),
        }),
    })
})