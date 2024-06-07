import { baseAPI } from "@/API/baseAPI.ts"
import { User } from "../types"

const userAPI = baseAPI.injectEndpoints({
    endpoints: (build) => ({
        getUser: build.query<User, void>({
            query: () => ({
                url: "/auth/getdata",
                method: "GET"
            })
        })
    })
})

export const { useGetUserQuery } = userAPI