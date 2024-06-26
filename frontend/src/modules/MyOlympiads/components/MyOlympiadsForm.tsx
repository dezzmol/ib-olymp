import { myOlympiadsAPI } from "@/modules/MyOlympiads/API/myOlympiadsAPI.ts"
import { useNavigate } from "react-router-dom"
import { Button, Card } from "antd"

const MyOlympiadsForm = () => {
    const { data: olympiads } = myOlympiadsAPI.useGetMyOlympiadsQuery()
    const currentDate = new Date()
    const navigate = useNavigate()

    return (
        <Card title={<h1>Мои соревнования</h1>}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>

                {olympiads && olympiads.map(olympiad =>

                    <Card key={olympiad.id} title={<h2>{olympiad.name}</h2>} style={{ width: "500px" }}>
                        <p>{olympiad.university}</p>
                        <p>Дата
                            начала: {new Date(olympiad.startDate).toDateString()} {new Date(olympiad.startDate).toLocaleTimeString("ru-RU")}</p>
                        <p>Дата конца: {new Date(olympiad.endDate).toDateString()}</p>
                        {currentDate > new Date(olympiad.startDate) && currentDate < new Date(olympiad.endDate) &&
                            <Button
                                className="rounded-[5px] bg-my-dark text-my-white p-2 mt-2 w-full"
                                onClick={() => navigate("/solve/olympiad/" + olympiad.id)}
                            >
                                Принять участие
                            </Button>
                        }
                    </Card>
                )}
            </div>

        </Card>
    )
}

export default MyOlympiadsForm