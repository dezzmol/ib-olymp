import { authAPI } from "@/modules/Login/API/authAPI.ts"
import { useNavigate } from "react-router-dom"
import { useAppDispatch } from "@/hooks/useTypedStore.ts"
import { setUser } from "@/store/slice/userSlice.ts"
import { useGetUserQuery } from "@/modules/Profile/API/userAPI.ts"
import { login } from "@/store/slice/authSlice.ts"
import { SerializedError } from "@reduxjs/toolkit"
import { FetchBaseQueryError } from "@reduxjs/toolkit/query/react"

type useSignIn = (
    validateFn: () => string,
    emailValue: string,
    passwordValue: string,
) => [
    () => Promise<void>,
    boolean,
        FetchBaseQueryError | SerializedError | undefined,
    () => void,
]

export const useSignIn: useSignIn = (validateFn, username, password) => {
    const [
        loginMut,
        { isError: isLoginError, error: loginError, reset: loginReset }
    ] = authAPI.useLoginMutation()
    const getUserQuery = useGetUserQuery

    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const signIn = async (): Promise<void> => {
        const error: string = validateFn()

        if (error) {
            return
        }

        const loginResult = await loginMut({ username: username, password: password })

        if ("data" in loginResult) {
            dispatch(login(loginResult.data!.accessToken))
        }

        const userResult = getUserQuery()

        if ("data" in userResult) {
            dispatch(setUser(userResult.data!))
            navigate("/")
        }
    }

    return [signIn, isLoginError, loginError, loginReset]
}