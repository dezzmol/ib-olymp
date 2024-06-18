import { baseAPI } from "@/API/baseAPI.ts"
import { OlympiadAndApplications } from "@/modules/OlympiadIDAdminPage/types"

export const olympIdAdminAPI = baseAPI.injectEndpoints({
    endpoints: (build) => ({
        getOlympiadAndApplications: build.query<OlympiadAndApplications, number>({
            query: (id) => ({
                url: "/olympadmin/" + id + "/applications",
                method: "GET"
            })
        }),
        acceptTeam: build.mutation<string, {olympiad_id: number, team_id: number}>({
            query: (id) => ({
                url: "/olympadmin/" + id.olympiad_id + "/accept/" + id.team_id,
                method: "POST"
            })
        })
    })
})