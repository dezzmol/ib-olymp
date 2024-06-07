import { BaseQueryFn, createApi, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from "@reduxjs/toolkit/query/react"
import { deleteUser } from "@/store/slice/userSlice.ts"
import { login, logout } from "@/store/slice/authSlice.ts"
import { BASE_API_URL } from "@/utils/consts.ts"

const baseQuery = fetchBaseQuery({
    baseUrl: BASE_API_URL,
    prepareHeaders: (headers) => {
        const token = localStorage.getItem("accessToken")
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
    },
});

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
    args,
    api,
    extraOptions
) => {
    let result = await baseQuery(args, api, extraOptions);

    if (result.error && result.error.data == "Invalid access token" && result.error.status === 401) {
        const refreshResult = await baseQuery('/auth/refresh', api, extraOptions);

        if (refreshResult.data) {
            api.dispatch(login(refreshResult.data as string));

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
})