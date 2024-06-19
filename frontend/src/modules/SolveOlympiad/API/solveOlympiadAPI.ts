import { baseAPI } from "@/API/baseAPI.ts"
import { ITask } from "@/modules/Admin/types"

export const solveOlympiadAPI = baseAPI.injectEndpoints({
    endpoints: (build) => ({
        getOlympiadTasks: build.query<ITask[], number>({
            query: (id) => ({
                url: "/olymp/" + id + "/tasks",
                method: "GET"
            })
        })
    })
})