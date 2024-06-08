import { baseAPI } from "@/API/baseAPI.ts"
import { User } from "../types"

const userAPI = baseAPI.injectEndpoints({
    endpoints: (build) => ({
        getUser: build.mutation<User, void>({
            query: () => ({
                url: "/auth/getdata",
                method: "POST"
            })
        })
    })
})

export const { useGetUserMutation } = userAPI