import { useEffect, useState } from "react"
import { useSignIn } from "@/modules/Login/hooks/useSignIn.ts"
import { useSignUp } from "@/modules/Login/hooks/useSignUp.ts"
import { Card, Row } from "antd"
import Login from "@/modules/Login/components/Login.tsx"
import Registration from "@/modules/Login/components/Registration.tsx"

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
    const [haveAcc, setHaveAcc] = useState<boolean>(false)

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
        passwordValue
    )

    const [signUp, isRegistrationError, IsRegistrationSuccess, registrationError, registrationReset] = useSignUp(
        validateForm,
        emailValue,
        usernameValue,
        nameValue,
        surnameValue,
        patronymicValue,
        passwordValue
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
        <Card title={haveAcc ? <h1>Войти в аккаунт</h1> : <h1>Зарегистрироваться</h1>}>
            {!haveAcc ?
                <div style={{
                    textAlign: "center",
                    borderRadius: "5px",
                    background: "#FFFFFF",
                    padding: "10px 10px",
                    maxWidth: "800px"
                }}>
                    <Login
                        username={usernameValue}
                        setUsername={setUsernameValue}
                        password={passwordValue}
                        setPassword={setPasswordValue}
                        signIn={signIn}
                    />
                    <div onClick={() => setHaveAcc(!haveAcc)}>
                        Нет аккаунта? Зарегистрируйтесь
                    </div>
                </div>
                :
                <div style={{
                    textAlign: "center",
                    borderRadius: "5px",
                    background: "#FFFFFF",
                    padding: "10px 10px",
                    maxWidth: "800px"
                }}>
                    <Registration
                        username={usernameValue}
                        setUsername={setUsernameValue}
                        email={emailValue}
                        setEmail={setEmailValue}
                        surname={surnameValue}
                        setSurname={setSurnameValue}
                        name={nameValue}
                        setName={setNameValue}
                        patronymic={patronymicValue}
                        setPatronymic={setPatronymicValue}
                        password={passwordValue}
                        setPassword={setPasswordValue}
                        confirmPassword={confirmPasswordValue}
                        setConfirmPassword={setConfirmPasswordValue}
                        signUp={signUp}
                    />
                    <div onClick={() => setHaveAcc(!haveAcc)}>
                        Уже есть аккаунт? Войти
                    </div>
                </div>
            }

        </Card>
    )
}

export default LoginForm