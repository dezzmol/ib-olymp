import { baseAPI } from "@/API/baseAPI.ts"
import { Olympiad } from "@/modules/OlympiadAdmin/types"
import { ITask } from "@/modules/Admin/types"

export const myOlympiadsAPI = baseAPI.injectEndpoints({
    endpoints: (build) => ({
        getMyOlympiads: build.query<Olympiad[], void>({
            query: () => ({
                url: "/olymp/myolympiads",
                method: "GET"
            })
        }),
        getTasksByOlympiad: build.query<ITask[], number>({
            query: (olympiad_id) => ({
                url: "/olymp/" + olympiad_id + "/tasks",
                method: "GET"
            })
        })
    })
})