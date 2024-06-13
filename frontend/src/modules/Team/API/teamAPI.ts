import { baseAPI } from "@/API/baseAPI.ts"
import { TeamDTO } from "@/modules/Team/types"

export const teamAPI = baseAPI.injectEndpoints({
    endpoints: (build) => ({
        register: build.mutation<TeamDTO, { name: string }>({
            query: (body) => ({
                url: "/student/team/",
                method: "POST",
                body
            })
        }),
        getTeam: build.query<TeamDTO, number>({
            query: (id) => ({
                url: "/student/team/" + id,
                method: "GET"
            })
        }),
        getTeamByStudent: build.query<TeamDTO, void>({
           query: () => ({
               url: "/student/team/",
               method: "GET"
           })
        }),
        generateLink: build.mutation<string, void>({
            query: () => ({
                url: "/student/team/generateLink",
                method: "POST"
            })
        }),
        removeStudentFromTheTeam: build.mutation<string, number>({
            query: (id) => ({
                url: "/student/team/" + id,
                method: "DELETE"
            })
        })
    })
})

export const {
    useRegisterMutation,
    useGetTeamQuery,
    useGetTeamByStudentQuery,
    useGenerateLinkMutation,
    useRemoveStudentFromTheTeamMutation
} = teamAPI