import { baseAPI } from "@/API/baseAPI.ts"
import { Olympiad } from "@/modules/OlympiadAdmin/types"

export const olympiadsAPI = baseAPI.injectEndpoints({
    endpoints: (build) => ({
        getOlympiads: build.query<Olympiad[], void>({
            query: () => ({
                url: "/olymp/",
                method: "GET"
            })
        })
    })
})