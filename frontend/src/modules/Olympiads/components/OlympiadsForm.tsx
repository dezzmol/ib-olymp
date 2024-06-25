import { olympiadsAPI } from "@/modules/Olympiads/API/olympiadsAPI.ts"
import { useNavigate } from "react-router-dom"
import { Card } from "antd"

const OlympiadsForm = () => {
    const { data: olympiads } = olympiadsAPI.useGetOlympiadsQuery()
    const navigate = useNavigate()

    return (
        <section style={{ display: "flex", flexWrap: "wrap", gap: "50px" }}>
            {olympiads && olympiads.map(olympiad => (
                <Card
                    key={olympiad.id}
                    onClick={() => navigate("/olympiads/" + olympiad.id)}
                    hoverable={true}
                    style={{ width: "500px" }}
                    title={<h2>{olympiad.name}</h2>}
                >
                    <p>{olympiad.university}</p>
                    <p>Дата начала: {new Date(olympiad.startDate).toDateString()}</p>
                    <p>Дата конца: {new Date(olympiad.endDate).toDateString()}</p>
                </Card>
            ))}
        </section>
    )
}

export default OlympiadsForm