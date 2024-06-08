import { FC } from "react"

interface Props {
    email: string
    setEmail: React.Dispatch<React.SetStateAction<string>>
    username: string
    setUsername: React.Dispatch<React.SetStateAction<string>>
    name: string
    setName: React.Dispatch<React.SetStateAction<string>>
    surname: string
    setSurname: React.Dispatch<React.SetStateAction<string>>
    patronymic: string
    setPatronymic: React.Dispatch<React.SetStateAction<string>>
    password: string
    setPassword: React.Dispatch<React.SetStateAction<string>>
    confirmPassword: string
    setConfirmPassword: React.Dispatch<React.SetStateAction<string>>
    signUp: () => Promise<void>
}

const SignUpForm: FC<Props> = ({
                                   email,
                                   setEmail,
                                   username,
                                   setUsername,
                                   name,
                                   setName,
                                   surname,
                                   setSurname,
                                   patronymic,
                                   setPatronymic,
                                   password,
                                   setPassword,
                                   confirmPassword,
                                   setConfirmPassword,
                                   signUp
                               }) => {
    return (
        <div className={"flex flex-col gap-2"}>
            <h2
                className={"text-3xl text-my-dark font-bold"}
            >
                Зарегистироваться
            </h2>
            <input
                className="p-2 text-2xl font-bold bg-transparent border-4 outline-none h-14 rounded-2xl border-my-dark text-my-dark placeholder:text-my-dark"
                value={username}
                placeholder={"Логин"}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                className="p-2 text-2xl font-bold bg-transparent border-4 outline-none h-14 rounded-2xl border-my-dark text-my-dark placeholder:text-my-dark"
                value={email}
                placeholder={"Почта"}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                className="p-2 text-2xl font-bold bg-transparent border-4 outline-none h-14 rounded-2xl border-my-dark text-my-dark placeholder:text-my-dark"
                value={surname}
                placeholder={"Фамилия"}
                onChange={(e) => setSurname(e.target.value)}
            />
            <input
                className="p-2 text-2xl font-bold bg-transparent border-4 outline-none h-14 rounded-2xl border-my-dark text-my-dark placeholder:text-my-dark"
                value={name}
                placeholder={"Имя"}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                className="p-2 text-2xl font-bold bg-transparent border-4 outline-none h-14 rounded-2xl border-my-dark text-my-dark placeholder:text-my-dark"
                value={patronymic}
                placeholder={"Отчество"}
                onChange={(e) => setPatronymic(e.target.value)}
            />
            <input
                className="p-2 text-2xl font-bold bg-transparent border-4 outline-none h-14 rounded-2xl border-my-dark text-my-dark placeholder:text-my-dark"
                value={password}
                placeholder={"Пароль"}
                type={"password"}
                onChange={(e) => setPassword(e.target.value)}
            />
            <input
                className="p-2 text-2xl font-bold bg-transparent border-4 outline-none h-14 rounded-2xl border-my-dark text-my-dark placeholder:text-my-dark"
                value={confirmPassword}
                placeholder={"Подтвердите пароль"}
                type={"password"}
                onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button
                className={`w-full text-2xl font-bold h-14 rounded-2xl text-my-blue bg-my-dark active:scale-99`}
                onClick={signUp}
            >
                Зарегистрироваться
            </button>
        </div>
    )
}

export default SignUpForm