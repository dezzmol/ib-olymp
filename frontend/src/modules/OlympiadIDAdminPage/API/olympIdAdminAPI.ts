import { baseAPI } from "@/API/baseAPI.ts"
import { OlympiadAndApplications } from "@/modules/OlympiadIDAdminPage/types"
import { ITask } from "@/modules/Admin/types"
import { IAdminOlympiad } from "@/modules/OlympiadAdmin/types"

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
        acceptTeam: build.mutation<string, {olympiad_id: number, team_id: number}>({
            query: (id) => ({
                url: "/olympadmin/" + id.olympiad_id + "/accept/" + id.team_id,
                method: "POST"
            })
        }),
        addTaskToOlympiad: build.mutation<string, {olympiad_id: number, task_id: number}>({
            query: ({olympiad_id, task_id}) => ({
                url: "/olympadmin/" + olympiad_id + "/addtask/" + task_id,
                method: "POST"
            })
        })
    })
})