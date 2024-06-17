import { useAppSelector } from "@/hooks/useTypedStore.ts"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const OlympiadAdminForm = () => {
    const {role} = useAppSelector(state => state.userReducer)
    const navigate = useNavigate()

    useEffect(() => {
        if (role === "ROLE_ADMIN" || role === "ROLE_OLYMPIAD_ADMIN") {
           return
        } else {
            navigate("/")
        }
    }, [])

    return (
        <section className="flex flex-col mt-1">
            <div>
                <button className="rounded-[5px] bg-my-dark text-my-white p-2">Создать олимпиаду</button>
            </div>
            <h2>Запланированные олимпиады</h2>
        </section>
    )
}

export default OlympiadAdminForm