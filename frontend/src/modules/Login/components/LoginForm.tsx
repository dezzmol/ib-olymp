import { useEffect, useState } from "react"
import { useSignIn } from "@/modules/Login/hooks/useSignIn.ts"
import SignInForm from "@/modules/Login/components/SignInForm.tsx"
import SignUpForm from "@/modules/Login/components/SignUpForm.tsx"
import { useSignUp } from "@/modules/Login/hooks/useSignUp.ts"

const LoginForm = () => {
    const [emailValue, setEmailValue] = useState<string>("")
    const [usernameValue, setUsernameValue] = useState<string>("")
    const [nameValue, setNameValue] = useState<string>("")
    const [surnameValue, setSurnameValue] = useState<string>("")
    const [patronymicValue, setPatronymicValue] = useState<string>("")
    const [passwordValue, setPasswordValue] = useState<string>("")
    const [confirmPasswordValue, setConfirmPasswordValue] = useState<string>("")
    const [isLogin, setIsLogin] = useState<boolean>(true)
    const [validationError, setValidationError] = useState<string>("")
    const [errorMessage, setErrorMessage] = useState<string>("")

    const validateForm = (): string => {
        let error: string = ""

        if (isLogin && (!usernameValue || !passwordValue)) {
            error = "Ошибка в поле"
        }
        if (
            !isLogin &&
            (
                !usernameValue ||
                !passwordValue ||
                !nameValue ||
                !surnameValue ||
                !patronymicValue ||
                !emailValue ||
                !confirmPasswordValue
            )
        ) {
            error = "Ошибка в поле"
        }
        if (!isLogin && passwordValue !== confirmPasswordValue) {
            error = "Ошибка в поле"
        }

        setValidationError(error)
        return error
    }

    const [signIn, isLoginError, loginError, loginReset] = useSignIn(
        validateForm,
        usernameValue,
        passwordValue,
    )

    const [signUp, isRegistrationError, IsRegistrationSuccess, registrationError, registrationReset] = useSignUp(
        validateForm,
        emailValue,
        usernameValue,
        nameValue,
        surnameValue,
        patronymicValue,
        passwordValue,
    )

    const clearInputs = (): void => {
        setEmailValue("")
        setNameValue("")
        setSurnameValue("")
        setPatronymicValue("")
        setUsernameValue("")
        setPasswordValue("")
        setConfirmPasswordValue("")
    }

    const handleToggleIsLogin = (): void => {
        clearInputs()
        setValidationError("")
        loginReset()
        registrationReset()
        setIsLogin((prev) => !isLogin)
    }

    useEffect(() => {
        setErrorMessage(loginError)
    }, [isLoginError, loginError])

    useEffect(() => {
        setErrorMessage(registrationError)
    }, [isRegistrationError, registrationError])

    return (
        <section className="w-605">
            <form
                className={`flex flex-col gap-4`}
                onSubmit={(e: React.FormEvent<HTMLFormElement>) =>
                    e.preventDefault()
                }
            >
                {isLogin ?
                    <SignInForm
                        signIn={signIn}
                        username={usernameValue}
                        setUsername={setUsernameValue}
                        password={passwordValue}
                        setPassword={setPasswordValue}
                    /> :
                    <SignUpForm
                        signUp={signUp}
                        email={emailValue}
                        setEmail={setEmailValue}
                        username={usernameValue}
                        setUsername={setUsernameValue}
                        name={nameValue}
                        setName={setNameValue}
                        surname={surnameValue}
                        setSurname={setSurnameValue}
                        patronymic={patronymicValue}
                        setPatronymic={setPatronymicValue}
                        password={passwordValue}
                        setPassword={setPasswordValue}
                        confirmPassword={confirmPasswordValue}
                        setConfirmPassword={setConfirmPasswordValue}
                    />
                }
                {isLoginError &&
                    <div>
                        <h2>Ошибка при входе</h2>
                        <p>
                            {errorMessage}
                        </p>
                    </div>
                }
                {isRegistrationError &&
                    <div>
                        <h2>Ошибка при регистрации</h2>
                        <p>
                            {errorMessage}
                        </p>
                    </div>
                }
                {isLogin ?
                    <button onClick={() => handleToggleIsLogin()}>Нет аккаунта? Зарегистрироваться</button> :
                    <button onClick={() => handleToggleIsLogin()}>Уже есть аккаунт? Войти</button>
                }
            </form>
        </section>
    )
}

export default LoginForm