import { FC } from "react"
import InputBlock from "@/modules/Login/components/InputBlock.tsx"

interface FormInputProps {
    emailValue: string
    nameValue: string
    passwordValue: string
    confirmPasswordValue: string
    setInputValue: (inputId: string, value: string) => void
    isLogin: boolean
}

const FormInput: FC<FormInputProps> = ({
                                           emailValue,
                                           nameValue,
                                           passwordValue,
                                           confirmPasswordValue,
                                           setInputValue,
                                           isLogin
                                       }) => {
    return (
        <div className="flex flex-col gap-4 ">
            <h2
                className={`text-3xl text-my-dark font-bold ${
                    isLogin ? "animate-slideDown" : "hidden"
                }`}
            >
                Вход
            </h2>

            <h2
                className={`text-3xl text-my-dark font-bold ${
                    isLogin ? "hidden" : "animate-append"
                }`}
            >
                Регистрация
            </h2>

            <InputBlock
                isCondition={isLogin}
                animations={["hidden", "animate-append"]}
                inputValue={nameValue}
                setInputValue={setInputValue}
                inputId={"name"}
                inputType={"text"}
            />
            <InputBlock
                isCondition={isLogin}
                animations={["animate-slideUp", "animate-slideDown"]}
                inputValue={emailValue}
                setInputValue={setInputValue}
                inputId={"email"}
                inputType={"email"}
            />
            <InputBlock
                isCondition={isLogin}
                animations={["animate-slideUp", "animate-slideDown"]}
                inputValue={passwordValue}
                setInputValue={setInputValue}
                inputId={"password"}
                inputType={"password"}
            />
            <InputBlock
                isCondition={isLogin}
                animations={["hidden", "animate-append"]}
                inputValue={confirmPasswordValue}
                setInputValue={setInputValue}
                inputId={"confirmPassword"}
                inputType={"password"}
            />
        </div>
    )
}

export default FormInput