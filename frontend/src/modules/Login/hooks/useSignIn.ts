import { authAPI } from "@/modules/Login/API/authAPI.ts"
import { useNavigate } from "react-router-dom"
import { useAppDispatch } from "@/hooks/useTypedStore.ts"
import { setUser } from "@/store/slice/userSlice.ts"
import { login } from "@/store/slice/authSlice.ts"
import { SerializedError } from "@reduxjs/toolkit"
import { FetchBaseQueryError } from "@reduxjs/toolkit/query/react"
import { useGetUserMutation } from "@/modules/Profile/API/userAPI.ts"
import { useState } from "react"

type useSignIn = (
    validateFn: () => string,
    usernameValue: string,
    passwordValue: string,
) => [
    () => Promise<void>,
    boolean,
    string,
    () => void,
]

export const useSignIn: useSignIn = (validateFn, usernameValue, passwordValue) => {
    const [
        loginMut,
        { isError: isLoginError, error: loginError, reset: loginReset }
    ] = authAPI.useLoginMutation()
    const [getData] = useGetUserMutation()
    const [errorMessage, setErrorMessage] = useState<string>("")
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const signIn = async (): Promise<void> => {
        const error: string = validateFn()

        if (error) {
            return
        }

        const loginResult = await loginMut({ username: usernameValue, password: passwordValue })

        if ("error" in loginResult) {
            const err = loginResult.error as FetchBaseQueryError | SerializedError;
            if ("data" in err && err.data && typeof err.data === "object" && "message" in err.data) {
                setErrorMessage((err.data as { message: string }).message);
                console.log(errorMessage)
                return;
            }
            if ("message" in err) {
                setErrorMessage(err.message!);
                console.log(errorMessage)
                return;
            }

        }

        if ("data" in loginResult) {
            dispatch(login(loginResult.data!.accessToken))
        }
        await getAcc()
    }

    const getAcc = async () => {
        const result = await getData()

        if (result.error) {
            console.log(result.error)
            return
        }

        if ("data" in result) {
            dispatch(setUser(result.data!))
            navigate("/")
        }
    }
    return [signIn, isLoginError, errorMessage, loginReset]
}