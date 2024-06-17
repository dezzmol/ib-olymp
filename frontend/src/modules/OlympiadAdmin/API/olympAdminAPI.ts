import { baseAPI } from "@/API/baseAPI.ts"
import { CreateOlympiadDTO, Olympiad, OlympiadApplications } from "@/modules/OlympiadAdmin/types"

export const olympAdminAPI = baseAPI.injectEndpoints({
    endpoints: (build) => ({
        createOlympiad: build.mutation<Olympiad, CreateOlympiadDTO>({
            query: (body) => ({
                url: "/olympadmin/",
                method: "POST",
                body
            })
        }),
        getApplications: build.query<OlympiadApplications, number>({
            query: (id) => ({
                url: "/olympadmin/" + id + "/applications",
                method: "GET"
            })
        }),
        getOlympiads: build.query<Olympiad[], void>({
            query: () => ({
                url: "/olymp/",
                method: "GET"
            })
        })
    })
})