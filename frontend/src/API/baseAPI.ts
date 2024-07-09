import {
    BaseQueryFn,
    createApi,
    FetchArgs,
    fetchBaseQuery,
    FetchBaseQueryError,
    FetchBaseQueryMeta
} from "@reduxjs/toolkit/query/react"
import { deleteUser } from "@/store/slice/userSlice.ts"
import { login, logout } from "@/store/slice/authSlice.ts"
import { BASE_API_URL } from "@/utils/consts.ts"
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import { QueryReturnValue } from "@reduxjs/toolkit/dist/query/baseQueryTypes"

const baseQuery = fetchBaseQuery({
    baseUrl: BASE_API_URL,
    credentials: "include",
    prepareHeaders: (headers) => {
        const token = localStorage.getItem("accessToken")
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
    },
});

interface IAuthResponse {
    tokenType: string
    accessToken: string
    expires: number
}

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
    args,
    api,
    extraOptions
) => {
    let result = await baseQuery(args, api, extraOptions);

    if (result.error && result.error.status === 403) {
        const refreshResult: QueryReturnValue<IAuthResponse, FetchBaseQueryError, FetchBaseQueryMeta> = await baseQuery('/auth/refresh', api, extraOptions);

        if (refreshResult.data && refreshResult.data.accessToken) {
            api.dispatch(login(refreshResult.data.accessToken));

            // retry the initial query
            result = await baseQuery(args, api, extraOptions);
        } else {
            api.dispatch(logout());
            api.dispatch(deleteUser());
        }
    }
    return result;
};

export const baseAPI = createApi({
    reducerPath: 'baseApi',
    baseQuery: baseQueryWithReauth,
    endpoints: () => ({}),
    tagTypes: ["olympiads", "tasks", "solutions", "answers", "task_answers", "all_task_answers", "result"]
})