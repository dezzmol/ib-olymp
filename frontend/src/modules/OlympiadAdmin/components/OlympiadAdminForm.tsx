import { useAppSelector } from "@/hooks/useTypedStore.ts"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Modal } from "@/components/Modal"
import { olympAdminAPI } from "@/modules/OlympiadAdmin/API/olympAdminAPI.ts"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

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
    const {data: olympiads, refetch: refetchOlympiads} = olympAdminAPI.useGetOlympiadsQuery()

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
        startDate.setHours(0, 0, 0, 0)
        endDate.setHours(0, 0, 0, 0, 0)

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
        await refetchOlympiads
    }

    return (
        <section className="flex flex-col mt-1">
            <div>
                <button
                    className="rounded-[5px] bg-my-dark text-my-white p-2"
                    onClick={changeModalVisible}
                >Создать олимпиаду
                </button>
            </div>
            <h2>Запланированные олимпиады</h2>
            <div>
                {olympiads && olympiads.map(olympiad => (
                    <div className="p-2 m-2 bg-gray-200 rounded">
                        <h2>Название: {olympiad.name}</h2>
                        <p>Дата начала: {new Date(olympiad.startDate).toDateString()}</p>
                        <p>Дата конца: {new Date(olympiad.endDate).toDateString()}</p>
                    </div>
                ))}
            </div>
            <Modal visible={modalVisible} setVisible={setModalVisible}>
                <div className="flex flex-col gap-2">
                    <h2>Создание олимпиады</h2>
                    <input
                        placeholder={"Название олимпиады"}
                        value={olympiadName}
                        onChange={(e) => setOlympiadName(e.target.value)}
                    />
                    <textarea
                        className="h-[300px]"
                        placeholder={"Описание олимпиады"}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <input
                        placeholder={"Университет организатор"}
                        value={university}
                        onChange={(e) => setUniversity(e.target.value)}
                    />
                    <h2>Дата начала</h2>
                    <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
                    <h2>Дата окончания</h2>
                    <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} />
                    <button
                        onClick={handleSubmitCreating}
                        className="rounded-[5px] bg-my-dark text-my-white p-2"
                    >
                        Подтвердить
                    </button>
                </div>
            </Modal>
        </section>
    )
}

export default OlympiadAdminForm