import { useAppSelector } from "@/hooks/useTypedStore.ts"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { olympAdminAPI } from "@/modules/OlympiadAdmin/API/olympAdminAPI.ts"
import DatePicker, { registerLocale } from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { ru } from "date-fns/locale/ru"
import { Button, Card, Input, Modal } from "antd"
import TextArea from "antd/es/input/TextArea"

registerLocale("ru", ru)

const OlympiadAdminForm = () => {
    const [modalVisible, setModalVisible] = useState<boolean>(false)
    const [olympiadName, setOlympiadName] = useState<string>("")
    const [description, setDescription] = useState<string>("")
    const [university, setUniversity] = useState<string>("")
    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())
    const { role } = useAppSelector(state => state.userReducer)
    const navigate = useNavigate()
    const [createOlymp] = olympAdminAPI.useCreateOlympiadMutation()
    const { data: olympiads, refetch: refetchOlympiads } = olympAdminAPI.useGetOlympiadsQuery()

    useEffect(() => {
        if (role === "ROLE_ADMIN" || role === "ROLE_OLYMPIAD_ADMIN") {
            return
        } else {
            navigate("/")
        }
    }, [])

    const changeModalVisible = () => {
        setModalVisible((prev) => !prev)
    }

    const handleSubmitCreating = async () => {
        if (startDate > endDate) {
            return
        }
        await createOlymp({
            name: olympiadName,
            description: description,
            university: university,
            startDate: startDate,
            endDate: endDate
        })
        await refetchOlympiads()
        setModalVisible(false)
    }

    const handleCancel = () => {
        setModalVisible(false)
    }

    return (
        <Card title={<h1 style={{ fontSize: "36px" }}>Управление соревнованиями</h1>} bordered={false}>
            <div>
                <Button
                    className="rounded-[5px] bg-my-dark text-my-white p-2"
                    onClick={changeModalVisible}
                >Создать соревнование
                </Button>
            </div>
            <h2>Запланированные соревнования</h2>
            <div style={{display: "flex", flexDirection: "column", gap: "5px"}}>
                {olympiads && olympiads.map(olympiad => (
                    <Card
                        key={olympiad.id}
                        onClick={() => navigate("/olympadmin/olympiads/" + olympiad.id)}
                        title={<h2>{olympiad.name}</h2>}
                        hoverable={true}
                    >
                        <p>{olympiad.description}</p>
                        <p>Дата начала: {new Date(olympiad.startDate).toDateString()} {new Date(olympiad.startDate).toLocaleTimeString("ru-RU")}</p>
                        <p>Дата конца: {new Date(olympiad.endDate).toDateString()} {new Date(olympiad.endDate).toLocaleTimeString("ru-RU")}</p>
                    </Card>
                ))}
            </div>
            <Modal open={modalVisible} onCancel={handleCancel} onOk={handleSubmitCreating} cancelText={"Отменить"}>
                <div style={{ display: "flex", flexDirection: "column", gap: "5px", justifyContent: "center" }}>
                    <h2>Создание соревнования</h2>
                    <Input
                        placeholder={"Название соревнования"}
                        value={olympiadName}
                        onChange={(e) => setOlympiadName(e.target.value)}
                    />
                    <TextArea
                        className="h-[300px]"
                        placeholder={"Описание соревнования"}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <Input
                        placeholder={"Университет организатор"}
                        value={university}
                        onChange={(e) => setUniversity(e.target.value)}
                    />
                    <h2>Дата начала</h2>
                    <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        locale="ru"
                        showTimeSelect
                    />
                    <h2>Дата окончания</h2>
                    <DatePicker
                        selected={endDate}
                        onChange={(date) => setEndDate(date)}
                        locale="ru"
                        showTimeSelect
                    />
                </div>
            </Modal>
        </Card>
    )
}

export default OlympiadAdminForm