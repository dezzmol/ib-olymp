import { FC } from "react"

interface Props {
    username: string
    setUsername:  React.Dispatch<React.SetStateAction<string>>
    password: string
    setPassword:  React.Dispatch<React.SetStateAction<string>>
    signIn: () => Promise<void>
}

const SignInForm: FC<Props> = ({
    username,
    setUsername,
    password,
    setPassword,
    signIn
                               }) => {
    return (
        <div className={"flex flex-col gap-2"}>
            <h2
                className={"text-3xl text-my-dark font-bold"}
            >
                Войти в аккаунт
            </h2>
            <input
                className="p-2 text-2xl font-bold bg-transparent border-4 outline-none h-14 rounded-2xl border-my-dark text-my-dark placeholder:text-my-dark"
                value={username}
                placeholder={"Логин"}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                className="p-2 text-2xl font-bold bg-transparent border-4 outline-none h-14 rounded-2xl border-my-dark text-my-dark placeholder:text-my-dark"
                value={password}
                placeholder={"Пароль"}
                type={"password"}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button
                className={`w-full text-2xl font-bold h-14 rounded-2xl text-my-blue bg-my-dark active:scale-99`}
                onClick={signIn}
                type={"submit"}
            >
                Войти
            </button>
        </div>
    )
}

export default SignInForm