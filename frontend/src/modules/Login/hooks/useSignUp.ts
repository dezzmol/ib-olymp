import { FetchBaseQueryError } from "@reduxjs/toolkit/query/react"
import { SerializedError } from "@reduxjs/toolkit"
import { authAPI } from "@/modules/Login/API/authAPI.ts"
import { useState } from "react"

type useSignUp = (
    validateFn: () => string,
    emailValue: string,
    usernameValue: string,
    nameValue: string,
    surnameValue: string,
    patronymicValue: string,
    passwordValue: string,
) => [
    () => Promise<void>,
    boolean,
    boolean,
    string,
    () => void,
]

export const useSignUp: useSignUp = (
    validateFn,
    emailValue,
    usernameValue,
    nameValue,
    surnameValue,
    patronymicValue,
    passwordValue,
) => {
    const [
        register,
        {
            isError: isRegistrationError,
            isSuccess: IsRegistrationSuccess,
            error: registrationError,
            reset: registrationReset
        }
    ] = authAPI.useRegisterMutation()
    const [errorMessage, setErrorMessage] = useState<string>("")

    function testInput(str: string): boolean {
        const englishLettersRegex = /^[A-Za-z]+$/;
        return englishLettersRegex.test(str);
    }

    const signUp = async (): Promise<void> => {
        const error: string = validateFn()
        console.log(1)
        // if (
        //     testInput(usernameValue) ||
        //     testInput(emailValue) ||
        //     testInput(passwordValue)
        // ) {
        //     return;
        // }
        console.log(123)
        if (error) {
            return
        }

        const result:
            | { data: void }
            | { error: FetchBaseQueryError | SerializedError } = await register(
            {
                email: emailValue,
                name: nameValue,
                password: passwordValue,
                username: usernameValue,
                surname: surnameValue,
                patronymic: patronymicValue
            }
        )

        if ("error" in result) {
            const err = result.error as FetchBaseQueryError | SerializedError
            if ("data" in err && err.data && typeof err.data === "object" && "message" in err.data) {
                setErrorMessage((err.data as { message: string }).message);
                return
            }
            if ("message" in err) {
                setErrorMessage(err.message!)
                console.log(errorMessage)
                return
            }
        }

        if ("data" in result) {
            console.log(result.data)
        }
    }

    return [
        signUp,
        isRegistrationError,
        IsRegistrationSuccess,
        errorMessage,
        registrationReset
    ]
}