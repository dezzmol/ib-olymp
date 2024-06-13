import { baseAPI } from "@/API/baseAPI.ts"
import { IStudent, IStudentRegistration } from "@/modules/Profile/types"

export const studentAPI = baseAPI.injectEndpoints({
    endpoints: (build) => ({
        registration: build.mutation<string, IStudentRegistration>({
            query: (body) => ({
                url: "/student/",
                method: "POST",
                body
            })
        }),
        getStudent: build.query<IStudent, void>({
            query: () => ({
                url: "/student/",
                method: "GET"
            })
        }),
        joinTeam: build.query<string, string>({
            query: (inviteToken) => ({
                url: `/student/joinTeam/${inviteToken}`
            })
        })
    })
})

export const { useRegistrationMutation, useGetStudentQuery, useJoinTeamQuery } = studentAPI