import { baseAPI } from "@/API/baseAPI.ts"
import { OlympiadAndApplications, Result } from "@/modules/OlympiadIDAdminPage/types"
import { IAdminOlympiad } from "@/modules/OlympiadAdmin/types"
import { TeamDTO } from "@/modules/Team/types"
import { ITask } from "@/modules/Admin/types"
import { AttachmentResponse } from "@/modules/Task/types"

export const olympIdAdminAPI = baseAPI.injectEndpoints({
    endpoints: (build) => ({
        getOlympiadAndApplications: build.query<OlympiadAndApplications, number>({
            query: (id) => ({
                url: "/olympadmin/" + id + "/applications",
                method: "GET"
            })
        }),
        getAdminOlympiad: build.query<IAdminOlympiad, number>({
            query: (id) => ({
                url: "/olympadmin/" + id,
                method: "GET"
            })
        }),
        getOlympiadTasks: build.query<ITask[], number>({
            query: (id) => ({
                url: "/olympadmin/" + id + "/tasks",
                method: "GET"
            })
        }),
        acceptTeam: build.mutation<string, { olympiad_id: number, team_id: number }>({
            query: (id) => ({
                url: "/olympadmin/" + id.olympiad_id + "/accept/" + id.team_id,
                method: "POST"
            })
        }),
        addTaskToOlympiad: build.mutation<string, { olympiad_id: number, task_id: number }>({
            query: ({ olympiad_id, task_id }) => ({
                url: "/olympadmin/" + olympiad_id + "/addtask/" + task_id,
                method: "POST"
            })
        }),
        getMembers: build.query<TeamDTO[], number>({
            query: (id) => ({
                url: "/olympadmin/" + id + "/members",
                method: "GET"
            })
        }),
        summarizeOlympiadResult: build.mutation<Result[], number>({
            query: (id) => ({
                url: `/olympadmin/${id}/summarize`,
                method: "POST"
            })
        }),
        getOlympiadResult: build.query<Result[], number>({
            query: (id) => ({
                url: `/olympadmin/${id}/summarize`,
                method: "GET"
            })
        }),
        getExcelSummarize: build.query<AttachmentResponse, { olympiadId: number, fileName: string }>({
            query: ({olympiadId, fileName}) => ({
                url: `/olympadmin/${olympiadId}/summarize/excel/${fileName}`,
                responseHandler: (response) => response.blob().then((data) => ({ data, fileName }))
            })
        })
    })
})