import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { User } from "@/modules/Profile"
import { AuthDTO, IToken } from "@/modules/Login"
import { BASE_API_URL } from "@/utils/consts.ts"

export const authAPI = createApi({
    reducerPath: "auth",
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_API_URL + "/auth",
        credentials: "include"
    }),
    endpoints: (build) => ({
        register: build.mutation<void, User>({
            query: (body) => ({
                url: "/sign-up",
                method: "POST",
                body
            })
        }),
        login: build.mutation<IToken, AuthDTO>({
            query: (body) => ({
                url: "/sign-in",
                method: "POST",
                body
            })
        }),
        logout: build.mutation<void, void>({
            query: () => ({
                url: "/logout",
                method: "POST",
            }),
        }),
    })
})