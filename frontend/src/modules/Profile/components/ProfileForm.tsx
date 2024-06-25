import { useAppSelector } from "@/hooks/useTypedStore.ts"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { Card } from "antd"
import StudentForm from "@/modules/Profile/components/StudentForm.tsx"

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
        <Card title={<h1 style={{ fontSize: "36px" }}>Профиль</h1>} bordered={false}>
            <div style={{ fontSize: "26px"}}>
                {surname} {name} {patronymic}
            </div>
            <div>
                {email}
            </div>
            <StudentForm />
        </Card>
    )
}

export default ProfileForm