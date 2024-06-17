import { baseAPI } from "@/API/baseAPI.ts"
import { OlympiadAndApplications } from "@/modules/OlympiadIDAdminPage/types"

export const olympIdAdminAPI = baseAPI.injectEndpoints({
    endpoints: (build) => ({
        getOlympiadAndApplications: build.query<OlympiadAndApplications, number>({
            query: (id) => ({
                url: "/olympadmin/" + id + "/applications",
                method: "GET"
            })
        })
    })
})