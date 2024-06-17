import { baseAPI } from "@/API/baseAPI.ts"
import { Olympiad } from "@/modules/OlympiadAdmin/types"

export const olympiadIdAPI = baseAPI.injectEndpoints({
    endpoints: (build) => ({
        getOlympiadById: build.query<Olympiad, number>({
            query: (id) => ({
                url: "/olymp/" + id,
                method: "GET"
            })
        }),
        registerOnOlympiad: build.mutation<string, number>({
            query: (id) => ({
                url: "/olymp/" + id + "/registration",
                method: "POST"
            })
        })
    })
})