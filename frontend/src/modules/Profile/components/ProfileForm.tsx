import { useAppSelector } from "@/hooks/useTypedStore.ts"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

const ProfileForm = () => {
    const { isAuth } = useAppSelector((state) => state.authReducer)
    const { name, surname, patronymic, email, username } = useAppSelector((state) => state.userReducer)
    const navigate = useNavigate()

    useEffect(() => {
        if (!isAuth) {
            navigate("/")
        }
    }, [])

    return (
        <section className="flex gap-0.5 max-w-1150 flex-col">
            <div>
                Логин: {username}
            </div>
            <div>
                Имя: {name}
            </div>
            <div>
                Фамилия: {surname}
            </div>
            <div>
                Отчество: {patronymic}
            </div>
            <div>
                Электронная почта: {email}
            </div>
        </section>
    )
}

export default ProfileForm