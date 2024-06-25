import { useParams } from "react-router-dom"
import { olympiadIdAPI } from "@/modules/OlympiadId/API/olympiadIdAPI.ts"
import { Button, Card } from "antd"

const OlympiadIdForm = () => {
    const { id } = useParams()
    const { data: olympiad } = olympiadIdAPI.useGetOlympiadByIdQuery(Number(id!))
    const [register, { error: registerError, isError }] = olympiadIdAPI.useRegisterOnOlympiadMutation()
    const handleSubmit = async () => {
        await register(Number(id!))
    }

    return (
        <Card title={<h1 style={{ fontSize: "36px" }}>Олимпиады</h1>} bordered={false}>
            {olympiad &&
                <div>
                    <h2 className="text-2xl">
                        {olympiad.name}
                    </h2>
                    <div>{olympiad.university}</div>
                    <p>
                        {olympiad.description}
                    </p>
                    <p>Дата начала: {new Date(olympiad.startDate).toDateString()}</p>
                    <p>Дата конца: {new Date(olympiad.endDate).toDateString()}</p>
                    <Button
                        onClick={handleSubmit}
                        type={"primary"}
                    >
                        Подать заявку на участие
                    </Button>
                    {isError &&
                        <div>Ошибка при регистрации команды</div>
                    }
                </div>
            }
        </Card>
    )
}

export default OlympiadIdForm